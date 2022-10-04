import React, { Fragment } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { Link } from 'vtex.render-runtime'

import { useBuyTogetherContext } from './BuyTogether'

import './BuyTogether.css'

const CSS_HANDLES = [
  'buyTogetherItems',
  'buyTogetherItem',
  'buyTogetherItemUrl',
  'buyTogetherItemImage',
  'buyTogetherItemPrice',
  'buyTogetherItemsScroll',
  'buyTogetherItemChechBox',
  'buyTogetherItemName',
  'buyTogetherItemNameLabelPlus',
]

export const toLocaleCurrecy = (price: number) =>
  price.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  })

export default function BuyTogetherItemsMain() {
  const { handles } = useCssHandles(CSS_HANDLES)
  const { items } = useBuyTogetherContext()

  return (
    <div className={handles.buyTogetherItems}>
      {items.map((item, index) => (
        <Fragment key={`${item.name}-${index}`}>
          <div className={handles.buyTogetherItem}>
            <Link
              to={item.url}
              key={item.name}
              className={handles.buyTogetherItemUrl}
            >
              <img
                width={250}
                height={250}
                className={handles.buyTogetherItemImage}
                src={item.image}
                alt={item.name}
              />
              <h4 className={handles.buyTogetherItemName}>
                <span>{item.name}</span>
              </h4>
            </Link>
          </div>
          <span className={handles.buyTogetherItemNameLabelPlus}>
            {index + 1 === items.length ? '=' : '+'}
          </span>
        </Fragment>
      ))}
    </div>
  )
}
