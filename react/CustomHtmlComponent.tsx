import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import type { CssHandlesTypes } from 'vtex.css-handles'

const CSS_HANDLES = [
  'container',
  'wrapper',
] as const

type Props = {
  text?: string
  htmlId?: string
  classes?: CssHandlesTypes.CustomClasses<typeof CSS_HANDLES>
}

function CustomHtmlComponent({
  text = '',
  htmlId,
  classes,
}: Props) {
  
  const { handles } = useCssHandles(CSS_HANDLES, {
    classes,
  })

  return (
    <div
      id={htmlId}
      className={`${ handles.container}`}
    >
      <div
        className={handles.wrapper}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </div>
  )
}

CustomHtmlComponent.schema = {
  title: 'Custom HTML Editor',
  description: 'Adicione seu componente html aqui',
  type: 'object',
  properties: {
    text: {
      title: 'HTML',
      description: 'Adicione o HTML desejado',
      type: 'string',
      default: null,
    },
  }
}

export default CustomHtmlComponent