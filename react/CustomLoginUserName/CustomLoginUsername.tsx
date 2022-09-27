import React, { useEffect } from 'react'
import { useQuery } from 'react-apollo'
import { ExtensionPoint } from 'vtex.render-runtime'

import GET_PROFILE from './graphql/profile.gql'

interface Profile {
  email: string
  lastName: string
  firstName: string
}

const getProfileName = (profile: Profile) => {
  if (profile?.firstName) {
    return profile.firstName
  }

  return profile?.email
}

export default function CustomLoginUsername() {
  const { data, loading, error } = useQuery<{ profile: Profile }>(GET_PROFILE, {
    ssr: false,
  })

  useEffect(() => {
    if (!data?.profile) return

    const loginLabel = document.querySelector(
      '.vtex-menu-2-x-styledLinkContent--header-dropdown-menu-login'
    )

    if (loginLabel) {
      loginLabel.innerHTML = `Olá ${getProfileName(data.profile).slice(
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
  }, [data])

  if (loading || error || !data?.profile) {
    return <ExtensionPoint id="menu" />
  }

  return <ExtensionPoint id="menu" />
}
