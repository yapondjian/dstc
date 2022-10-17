import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

import './ProductKit.css'
import ProductKitProvider, { useProductKitContext } from './ProductKitProvider'
import { ProductKit } from '../typings/product-kit'
import ProductKitItem from './ProductKitItem'

const CSS_HANDLES = ['productKitWrapper']

function ProductKit() {
  const { handles } = useCssHandles(CSS_HANDLES)
  const { items } = useProductKitContext()

  const itemsWrappers = items.map(item => (
    <ProductKitItem key={item.product.productName} sku={item} />
  ))

  return <div className={handles.productKitWrapper}>{itemsWrappers}</div>
}

export default function ProductKitWithContext() {
  return (
    <ProductKitProvider>
      <ProductKit />
    </ProductKitProvider>
  )
}
