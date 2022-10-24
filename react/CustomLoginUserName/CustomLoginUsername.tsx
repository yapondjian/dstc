import React, { useEffect, useMemo } from 'react'
import { ExtensionPoint } from 'vtex.render-runtime'
import { useRenderSession } from 'vtex.session-client'

export default function CustomLoginUsername({
  children,
}: {
  children: React.ReactElement
}) {
  const { session, loading, error } = useRenderSession() as any

  useEffect(() => {
    if (session?.namespaces?.profile?.isAuthenticated?.value !== 'true') return

    setTimeout(() => {
      const loginLabel = document.querySelector(
        '.vtex-menu-2-x-styledLinkContent--header-dropdown-menu-login'
      )

      if (loginLabel) {
        loginLabel.innerHTML = `Olá ${session?.namespaces?.profile?.firstName?.value.slice(
          0,
          15
        )}...`
      }
    }, 1000)
  }, [session])

  const isLogged = useMemo(() => {
    if (session?.namespaces?.profile?.isAuthenticated?.value !== 'true') {
      return false
    }

    return true
  }, [session])

  if (loading || error) {
    return <ExtensionPoint id="menu" />
  }

  if (isLogged) {
    return children
  }

  return <ExtensionPoint id="menu" />
}
