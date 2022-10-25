import React, { useMemo } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { useProduct } from 'vtex.product-context'
import type { ProductContextState } from 'vtex.product-context/react/ProductTypes'

import './pdpBenefits.css'

// adicionar aqui as promocoes permitidas
const ALLOWED_BENEFITS = ['desconto progressivo']

const CSS_HANDLES = ['pdpBenefitsWrapper']

// exemplo de como a promocao deve estar cadastrada no admin: https://qcompra.myvtex.com/admin/rnb/#/benefit/f03736fa-92c8-4127-923c-e39d066a7297
export default function PdpBenefits() {
  const { selectedItem } = useProduct() as ProductContextState
  const { handles } = useCssHandles(CSS_HANDLES)

  const benefitText: string | undefined = useMemo(() => {
    if (selectedItem?.sellers.length) {
      const {
        sellers: [{ commertialOffer }],
      } = selectedItem

      if (commertialOffer?.discountHighlights.length) {
        const benefit = commertialOffer.discountHighlights.find(promotion => {
          if (!promotion.name.includes('|')) {
            return false
          }

          const [benefitType] = promotion.name.split('|') ?? ['', '']

          if (ALLOWED_BENEFITS.includes(benefitType.toLowerCase().trimEnd())) {
            return true
          }

          return false
        })

        if (benefit) {
          return benefit.name.split(' | ').pop()
        }
      }
    }

    return undefined
  }, [selectedItem])

  if (!benefitText) {
    return <div />
  }

  return <div className={handles.pdpBenefitsWrapper}>{benefitText}</div>
}
