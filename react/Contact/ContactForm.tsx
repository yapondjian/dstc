import React, { useState } from 'react'
import { useMutation } from 'react-apollo'
import { useCssHandles } from 'vtex.css-handles'
import { Input, Dropdown, Textarea, Button, withToast } from 'vtex.styleguide'

import './ContactForm.css'

import CREATE_DOCUMENT from './graphql/createDocument.gql'

const CSS_HANDLES = [
  'contactFormWrapper',
  'contactFormWrapperInputsTwo',
  'contactFormWrapperInputsTree',
]

const CUSTOMER_DROPDOWN = [
  {
    value: 'sim',
    label: 'Sim',
  },
  {
    value: 'nao',
    label: 'Não',
  },
]

const SUBJECT_OPTIONS = [
  {
    value: 'Melhorias',
    label: 'Melhorias',
  },
  {
    value: 'Sugestões',
    label: 'Sugestões',
  },
  {
    value: 'Criticas',
    label: 'Criticas',
  },
]

interface DocumentInput {
  fields: [
    {
      key: string
      value: string
    }
  ]
}

function ContactForm({ showToast }: { showToast: (params: any) => void }) {
  const { handles } = useCssHandles(CSS_HANDLES)
  const [loading, setLoading] = useState(false)
  const [send] = useMutation<any, { acronym: string; document: DocumentInput }>(
    CREATE_DOCUMENT
  )

  const [form, setForm] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    subject: '',
    isCustomer: '',
    state: '',
    city: '',
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value, name },
    } = event

    setForm({
      ...form,
      [name]: value,
    })
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    event.stopPropagation()

    try {
      setLoading(true)

      const data: any = Object.keys(form).map(field => {
        if (field === 'isCustomer') {
          if (form[field] === 'nao') {
            return {
              key: field,
              value: 'false',
            }
          }

          return {
            key: field,
            value: 'true',
          }
        }

        return {
          key: field,
          value: (form as any)[field],
        }
      })

      await send({
        variables: {
          acronym: 'CT',
          document: {
            fields: data,
          },
        },
      }).then(() => {
        showToast({
          message: 'Formulário foi enviado com sucesso!',
        })
        setLoading(false)
        setForm({
          name: '',
          lastName: '',
          email: '',
          phone: '',
          message: '',
          subject: '',
          isCustomer: '',
          state: '',
          city: '',
        })
      })
    } catch (error) {
      window.console.log(error)
      setLoading(false)
      showToast({
        message: 'Não foi possível enviar o formulário no momento!',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className={handles.contactFormWrapper}>
      <h2>Formuário de Contato</h2>
      <div className={handles.contactFormWrapperInputsTwo}>
        <Input
          required
          type="text"
          name="name"
          placeholder="Nome"
          onChange={handleChange}
          disabled={loading}
          value={form.name}
        />
        <Input
          required
          type="text"
          name="lastName"
          placeholder="Sobrenome"
          onChange={handleChange}
          disabled={loading}
          value={form.lastName}
        />
      </div>
      <div className={handles.contactFormWrapperInputsTwo}>
        <Input
          required
          type="email"
          name="email"
          placeholder="E-mail"
          onChange={handleChange}
          disabled={loading}
          value={form.email}
        />
        <Input
          required
          type="phone"
          name="phone"
          placeholder="Celular"
          onChange={handleChange}
          disabled={loading}
          value={form.phone}
        />
      </div>
      <div className={handles.contactFormWrapperInputsTree}>
        <Input
          required
          type="text"
          name="state"
          placeholder="Estado"
          onChange={handleChange}
          disabled={loading}
          value={form.state}
        />
        <Input
          required
          type="text"
          name="city"
          placeholder="Cidade"
          onChange={handleChange}
          disabled={loading}
          value={form.city}
        />
        <Dropdown
          required
          options={CUSTOMER_DROPDOWN}
          onChange={handleChange}
          type="text"
          name="isCustomer"
          placeholder="Já é cliente?"
          value={form.isCustomer}
        />
      </div>
      <div className={handles.contactFormWrapperInputsTwo}>
        <Dropdown
          required
          type="text"
          name="subject"
          placeholder="Assunto"
          options={SUBJECT_OPTIONS}
          value={form.subject}
          onChange={handleChange}
        />
      </div>
      <div className={handles.contactFormWrapperInputsTwo}>
        <Textarea
          label="Mensagem"
          name="message"
          onChange={handleChange}
          required
          value={form.message}
          width="100%"
        />
      </div>
      <Button isLoading={loading} type="submit">
        Enviar
      </Button>
    </form>
  )
}

export default withToast(ContactForm)
