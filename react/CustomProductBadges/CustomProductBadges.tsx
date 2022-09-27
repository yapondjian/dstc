import React, { useMemo } from 'react'
import { ProductSummaryContext } from 'vtex.product-summary-context'
import { useCssHandles, applyModifiers } from 'vtex.css-handles'

import './CustomProductBadges.css'

const CSS_HANDLES = ['customProductBadgesWrapper', 'customProductBadgesItem']

export default function CustomProductBadges() {
  const { product } = ProductSummaryContext.useProductSummary()
  const { handles } = useCssHandles(CSS_HANDLES)

  const badges = useMemo(() => {
    return product.productClusters.map(item => (
      <span
        key={item.name}
        className={applyModifiers(
          handles.customProductBadgesItem,
          item.name
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
        )}
      >
        {item.name}
      </span>
    ))
  }, [handles.customProductBadgesItem, product.productClusters])

  return <div className={handles.customProductBadgesWrapper}>{badges}</div>
}
