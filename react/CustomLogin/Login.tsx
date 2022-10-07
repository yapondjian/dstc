import React, { useState } from 'react'
import './CustomLogin.css'
import { useCssHandles } from 'vtex.css-handles'
import { Alert, Button, Input, withToast } from 'vtex.styleguide'
import axios from 'axios'
import { useMutation } from 'react-apollo'

import SEND_EMAIL_VERIFICATION from './graphql/sendEmailVerification.gql'
import ACCESS_TOKEN_VALIDATION from './graphql/accessKeySignIn.gql'

const CSS_HANDLES = ['customLoginContainer', 'acessTokenContainer']

function Login({ showToast }: { showToast: (params: any) => void }) {
  const { handles } = useCssHandles(CSS_HANDLES)
  const [isLoading, setLoading] = useState(false)
  const [sendEmailVerification] = useMutation(SEND_EMAIL_VERIFICATION)
  const [validate] = useMutation(ACCESS_TOKEN_VALIDATION)
  const [login, setLogin] = useState({
    email: '',
    approved: true,
    emailSent: false,
    token: '',
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
    setLogin({
      ...login,
      approved: true,
    })

    try {
      const { data: approved } = await axios.get<Array<{ approved: boolean }>>(
        `/api/dataentities/CL/search?_fields=approved&_where=(email=${login.email} AND approved=true)`
      )

      if (!approved.length) {
        setLoading(false)

        return setLogin({
          ...login,
          approved: false,
        })
      }

      await sendEmailVerification({
        variables: {
          email: login.email,
        },
      })

      setLogin({
        ...login,
        emailSent: true,
        approved: true,
      })
      setLoading(false)
    } catch {
      setLoading(false)
      showToast({
        message: 'Houve um problema, tente novamente',
      })
    }
  }

  const handleValidatetoken = async (event: React.FormEvent) => {
    event.preventDefault()
    event.stopPropagation()
    setLoading(true)
    try {
      await validate({
        variables: {
          email: login.email,
          code: login.token,
        },
      }).then(() => {
        setTimeout(() => {
          setLoading(false)
          window.location.href = '/'
        }, 3000)
      })
    } catch {
      setLoading(false)
      showToast({
        message:
          'Houve um problema ao tentar validar o token de acesso, tente novamente',
      })
    }
  }

  return (
    <section className={handles.customLoginContainer}>
      <h4>Já sou parceiro Qcompra</h4>
      {login.emailSent ? (
        <form onSubmit={handleValidatetoken}>
          <div className={handles.acessTokenContainer}>
            <Input
              label="Insira token abaixo: "
              placeholder=""
              name="token"
              onChange={handleChange}
              type="number"
              value={login.token}
              disabled={isLoading}
              require
              required
            />
          </div>
          <Button isLoading={isLoading} type="submit">
            Validar Token
          </Button>
        </form>
      ) : (
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
      )}
      {login.approved !== true ? (
        <div style={{ marginTop: '1rem' }}>
          <Alert type="warning">Seu cadastro ainda não foi aprovado!</Alert>
        </div>
      ) : null}
      {login.emailSent === true ? (
        <div style={{ marginTop: '1rem' }}>
          <Alert type="success">
            Enviamos o token de acesso para o email: {login.email}
          </Alert>
        </div>
      ) : null}
    </section>
  )
}

export default withToast(Login)
