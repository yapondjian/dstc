import './CustomLogin.css'
import React, { useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { ExtensionPoint } from 'vtex.render-runtime'

import CustomRegister from './CustomRegister'
import Login from './Login'

const CSS_HANDLES = [
  'customLoginWrapper',
  'loginContent',
  'loginContentBackButton',
]

export default function CustomLogin() {
  const { handles } = useCssHandles(CSS_HANDLES)
  const [successRegister, setSuccesRegister] = useState(false)
  const [approved, setApproved] = useState(false)

  if (successRegister) {
    return <ExtensionPoint id="flex-layout.row" />
  }

  if (approved) {
    return (
      <div className={handles.loginContent}>
        <ExtensionPoint id="login-content" />
      </div>
    )
  }

  return (
    <div className={handles.customLoginWrapper}>
      <Login setApproved={setApproved} />
      <CustomRegister setSuccesRegister={setSuccesRegister} />
    </div>
  )
}
