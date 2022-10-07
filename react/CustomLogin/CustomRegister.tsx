import React, { useState } from 'react'
import './CustomLogin.css'
import { useCssHandles } from 'vtex.css-handles'
import { Button, Input, withToast } from 'vtex.styleguide'
import axios from 'axios'
import { useMutation } from 'react-apollo'

import CREATE_USER_GQL from './graphql/createDocument.gql'

const CSS_HANDLES = ['customRegisterWrapper']

interface RegisterState {
  firstName: string
  lastName: string
  email: string
  phone: string
  corporateDocument: string
}

export const cnpjMask = (value: string) => {
  return value
    .replace(/\D+/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1')
}

const maskPhone = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d{4})(\d)/, '$1-$2')
}

interface DocumentInput {
  key: string
  value: string
}

function CustomRegister({
  setSuccesRegister,
  showToast,
}: {
  setSuccesRegister: (value: boolean) => void
  showToast: (params: { message: string }) => void
}) {
  const [createUser] = useMutation<
    any,
    { acronym: string; document: { fields: DocumentInput[] } }
  >(CREATE_USER_GQL)

  const { handles } = useCssHandles(CSS_HANDLES)
  const [isLoading, setLoading] = useState(false)
  const [register, setRegister] = useState<RegisterState>({
    corporateDocument: '',
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value, name },
    } = event

    setRegister({
      ...register,
      [name]: value,
    })
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    event.stopPropagation()

    try {
      setLoading(true)

      const { data } = await axios.get<Array<{ id: string }>>(
        `/api/dataentities/CL/search?_where=email=${register.email}`
      )

      if (data.length) {
        return showToast({
          message: `Usuário: ${register.email} já está cadastrado!`,
        })
      }

      const { firstName } = register

      const userData: Record<string, string> = {
        ...register,
      }

      userData.firstName = firstName.includes(' ')
        ? firstName.split(' ')[0]
        : firstName
      userData.lastName = firstName.includes(' ')
        ? (firstName.split(' ').pop() as string)
        : ''

      await createUser({
        variables: {
          acronym: 'CL',
          document: {
            fields: Object.keys(userData).map(field => ({
              key: field,
              value: String(userData[field]),
            })),
          },
        },
      })

      setSuccesRegister(true)
    } catch (error) {
      setLoading(false)
      showToast({
        message: 'Não foi possível fazer o cadastro no momento',
      })
    }
  }

  return (
    <section className={handles.customRegisterWrapper}>
      <h4>Ainda não é parceiro?</h4>
      <p>Preencha o formulário e tenha vantagens exclusivas!</p>
      <form onSubmit={handleSubmit}>
        <Input
          label="Qual é o seu nome?"
          placeholder=""
          name="firstName"
          onChange={handleChange}
          type="text"
          value={register.firstName}
          disabled={isLoading}
        />
        <Input
          label="Qual é o seu E-mail?"
          placeholder=""
          name="email"
          onChange={handleChange}
          value={register.email}
          type="email"
          disabled={isLoading}
        />
        <Input
          label="Telefone"
          placeholder=""
          name="phone"
          onChange={handleChange}
          value={maskPhone(register.phone)}
          type="phone"
          disabled={isLoading}
        />
        <Input
          label="CNPJ"
          placeholder=""
          name="corporateDocument"
          type="phone"
          onChange={handleChange}
          value={cnpjMask(register.corporateDocument)}
          disabled={isLoading}
        />
        <Button isLoading={isLoading} type="submit">
          Registrar
        </Button>
      </form>
    </section>
  )
}

export default withToast(CustomRegister)
