import React, { createContext, useContext, useMemo } from 'react'
import { useQuery } from 'react-apollo'
import { useRenderSession } from 'vtex.session-client'
import { Spinner } from 'vtex.styleguide'

import type { Session } from '../typings/session'
import GET_CLIENT_APPROVED_BY_EMAIL from './graphql/getApproved.gql'

interface IB2BProfileProviderContext {
  email: string | null | undefined
  approved: boolean
}

export interface Field {
  value: string
  key: string
}

export interface Document {
  fields: Field[]
}

export interface DocumentsResponse {
  documents: Document[]
}

const B2BProfileProviderContext =
  createContext<IB2BProfileProviderContext | null>(null)

export default function B2BProfileProvider({
  children,
}: {
  children: React.ReactElement
}) {
  const { loading, session } = useRenderSession() as {
    loading: boolean
    session: Session | undefined
  }

  const email = useMemo(() => {
    if (session?.namespaces?.profile?.isAuthenticated?.value === 'true') {
      return session.namespaces.profile.email.value
    }

    return null
  }, [session])

  const { data, loading: profileLoading } = useQuery<
    DocumentsResponse,
    { where: string }
  >(GET_CLIENT_APPROVED_BY_EMAIL, {
    variables: {
      where: `email=${email} AND approved=true`,
    },
    skip: !email,
  })

  if (loading || profileLoading) {
    // adicionar loadder
    return (
      <div
        className="vtex_b2b-loader"
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Spinner color="#FF601F" size={50} />
      </div>
    )
  }

  const approved = (data?.documents ?? []).length > 0

  return (
    <B2BProfileProviderContext.Provider
      value={{
        approved,
        email,
      }}
    >
      {children}
    </B2BProfileProviderContext.Provider>
  )
}

// use essa funcao para verificar se o cliente está aprovado em outros componentes da loja.
export const useB2BContext = () => {
  const context = useContext(B2BProfileProviderContext)

  if (!context) {
    throw new Error(
      'useB2BContext só pode ser usado dentro de um B2BProfileProviderContext'
    )
  }

  return context
}
