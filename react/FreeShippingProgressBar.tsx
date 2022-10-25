import React, { Fragment, useMemo } from 'react'
import { applyModifiers, useCssHandles } from 'vtex.css-handles'
import { Progress } from 'vtex.styleguide'
import { OrderForm } from 'vtex.order-manager'

import { toLocaleCurrecy } from './BuyTogether/BuyTogetherItems'

interface Totalizers {
  id: string
  value: number
}

const CSS_HANDLES = [
  'freeShippingProgressbarWrapper',
  'freeShippingProgressbarWrapperText',
]

const FreeShippingProgressBar: StorefrontFC<{
  totalForFreeShipping: number
}> = ({ totalForFreeShipping }) => {
  const storefrontValue = Number(totalForFreeShipping ?? '299.90')

  const { handles } = useCssHandles(CSS_HANDLES)
  const { orderForm } = OrderForm.useOrderForm() as {
    orderForm: { totalizers: Totalizers[] }
  }

  const total = useMemo(() => {
    const totalCartItems = orderForm.totalizers.find(
      item => item.id.toLowerCase() === 'items'
    )

    if (!totalCartItems) {
      return 0
    }

    return totalCartItems.value / 100
  }, [orderForm])

  const finalValue = total > storefrontValue ? 0 : storefrontValue - total

  const progressBarPercent = (100 * total) / storefrontValue

  return (
    <div
      className={applyModifiers(
        handles.freeShippingProgressbarWrapper,
        finalValue === 0 ? 'active' : 'inactive'
      )}
    >
      <span className={handles.freeShippingProgressbarWrapperText}>
        {finalValue === 0 ? (
          <Fragment>
            <b>
              Frete Grátis <br />
              Foi liberado para sua compra!
            </b>
          </Fragment>
        ) : (
          <Fragment>
            Faltam <b>{toLocaleCurrecy(finalValue)}</b> para você atingir <br />{' '}
            o <b>Frete Grátis</b>
          </Fragment>
        )}
      </span>
      <Progress type="line" percent={progressBarPercent.toFixed(2)} />
    </div>
  )
}

FreeShippingProgressBar.schema = {
  title: 'Barra de frete gratis',
  description: 'Define o valor para barra de frete gratis',
  type: 'object',
  properties: {
    totalForFreeShipping: {
      default: 299.9,
      title: 'Valor para frete gratis',
      type: 'number',
    },
  },
}

export default FreeShippingProgressBar
