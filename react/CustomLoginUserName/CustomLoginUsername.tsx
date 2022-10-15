import React, { useEffect } from 'react'
import { ExtensionPoint } from 'vtex.render-runtime'
import { useRenderSession } from 'vtex.session-client'

export default function CustomLoginUsername() {
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

      const loginButton = document.querySelector(
        '.vtex-store-link-0-x-link--login-entrar'
      )

      if (loginButton) {
        loginButton.remove()
      }

      const loginSignIn = document.querySelector(
        '.vtex-rich-text-0-x-container--login-entrar'
      )

      if (loginSignIn) {
        loginSignIn.remove()
      }
    }, 1000)
  }, [session])

  if (loading || error) {
    return <ExtensionPoint id="menu" />
  }

  return <ExtensionPoint id="menu" />
}
