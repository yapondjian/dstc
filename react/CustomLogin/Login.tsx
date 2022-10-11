import React, { useState } from 'react'
import './CustomLogin.css'
import { useCssHandles } from 'vtex.css-handles'
import { Alert, Button, Input, withToast } from 'vtex.styleguide'
import axios from 'axios'

const CSS_HANDLES = [
  'customLoginContainer',
  'acessTokenContainer',
  'loginContent',
]

function Login({
  showToast,
  setApproved,
}: {
  showToast: (params: any) => void
  setApproved: (value: boolean) => void
}) {
  const { handles } = useCssHandles(CSS_HANDLES)
  const [isLoading, setLoading] = useState(false)
  const [login, setLogin] = useState({
    email: '',
    approved: false,
    called: false,
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value, name },
    } = event

    setLogin({
      ...login,
      [name]: value,
    })
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    event.stopPropagation()
    setLoading(true)

    try {
      const { data: approved } = await axios.get<Array<{ approved: boolean }>>(
        `/api/dataentities/CL/search?_fields=approved&_where=(email=${login.email} AND approved=true)`
      )

      if (!approved.length) {
        setLoading(false)

        return setLogin({
          ...login,
          approved: false,
          called: true,
        })
      }

      setApproved(true)
    } catch {
      setLoading(false)
      showToast({
        message: 'Houve um problema, tente novamente',
      })
    }
  }

  return (
    <section className={handles.customLoginContainer}>
      <h4>Já sou parceiro Qcompra</h4>
      <form onSubmit={handleSubmit}>
        <Input
          label="Insira seu e-mail abaixo: "
          placeholder=""
          name="email"
          onChange={handleChange}
          type="email"
          value={login.email}
          disabled={isLoading}
          require
          required
        />
        <Button isLoading={isLoading} type="submit">
          Acessar
        </Button>
      </form>
      {login.approved === false && login.called === true ? (
        <div style={{ marginTop: '1rem' }}>
          <Alert type="warning">Seu cadastro ainda não foi aprovado!</Alert>
        </div>
      ) : null}
    </section>
  )
}

export default withToast(Login)
