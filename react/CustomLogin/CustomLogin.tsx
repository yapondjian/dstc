import './CustomLogin.css'
import React, { useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { ExtensionPoint } from 'vtex.render-runtime'

import CustomRegister from './CustomRegister'
import Login from './Login'

const CSS_HANDLES = ['customLoginWrapper']

export default function CustomLogin() {
  const { handles } = useCssHandles(CSS_HANDLES)
  const [successRegister, setSuccesRegister] = useState(false)

  if (successRegister) {
    return <ExtensionPoint id="flex-layout.row" />
  }

  return (
    <div className={handles.customLoginWrapper}>
      <Login />
      <CustomRegister setSuccesRegister={setSuccesRegister} />
    </div>
  )
}
