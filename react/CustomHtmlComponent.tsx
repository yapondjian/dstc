import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = [
  'container',
  'wrapper',
] as const


interface PropsBanner {
  subtext: string
  sublink: string
}

interface Banners {
  text: string
  html: string
  subtitles: PropsBanner[]
}

interface PropsHTMLCustom {
  titles: Banners[]
}


const CustomHtmlComponent = ({ titles }:PropsHTMLCustom) => {
  
  const { handles } = useCssHandles(CSS_HANDLES)


  

  return (
    <div className={handles.wrapper}>

      {titles?.map((title, index) => (
        <div key={index} className={handles.wrapper} dangerouslySetInnerHTML={{ __html: title.html }}></div>
      ))}

    </div>
  )
}

CustomHtmlComponent.schema = {
  title: 'Custom HTML Editor',
  description: 'Adicione seu componente html aqui',
  type: 'object',
  properties: {
    titles: {
      type: 'array',
      title: 'Banners',
      items: {
        title: 'Banner Item',
        type: 'object',
        properties: {
          __editorItemTitle: {
            title: 'Nome do Ítem',
            type: 'string',
          },
          text: {
            title: 'Titulo',
            type: 'string',
          },
          html: {
            title: 'Html',
            type: 'string',
          },
        }
      },
    },
  },

}

export default CustomHtmlComponent