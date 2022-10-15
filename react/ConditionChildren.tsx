import React from 'react'
import type { ReactElement } from 'react'

import { useB2BContext } from './B2BProfileProvider/B2BProfileProvider'

// use esse componente para validar se o cliente está aprovado
// sim -> vai mostrar o componente passado como prop (children)
// nao  -> vai esconder o elemento children

export default function ConditionChildren({
  children,
}: {
  children: ReactElement
}) {
  const { approved } = useB2BContext()

  if (!approved) {
    return <div />
  }

  return children
}
