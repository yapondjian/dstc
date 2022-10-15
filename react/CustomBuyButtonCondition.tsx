import React from 'react'
import { ExtensionPoint, useRuntime } from 'vtex.render-runtime'

import { useB2BContext } from './B2BProfileProvider/B2BProfileProvider'

export default function CustomBuyButtonCondition({
  summary,
}: {
  summary: boolean
}) {
  const { approved } = useB2BContext()
  const { navigate } = useRuntime()

  if (!approved && summary) {
    return (
      <div
        className="vtex-product-summary-2-x-buyButtonContainer vtex-product-summary-2-x-buyButtonContainer--default vtex-product-summary-2-x-buyButtonContainer--search pv3 w-100 db"
        data-testid="product-summary__buy-button-container"
      >
        <div className="vtex-product-summary-2-x-buyButton vtex-product-summary-2-x-buyButton--default vtex-product-summary-2-x-buyButton--search center mw-100">
          <button
            onClick={e => {
              e.preventDefault()
              e.stopPropagation()
              navigate({ to: '/login' })
            }}
            tabIndex={0}
            className="vtex-button bw1 ba fw5 v-mid relative pa0 lh-solid br2 min-h-regular t-action bg-action-primary b--action-primary c-on-action-primary hover-bg-action-primary hover-b--action-primary hover-c-on-action-primary pointer w-100 "
            type="button"
          >
            <div
              className="vtex-button__label flex items-center justify-center h-100 ph6 w-100 border-box "
              style={{ paddingTop: '0.25em', paddingBottom: '0.32em' }}
            >
              <span className="vtex-product-summary-2-x-buyButtonText vtex-product-summary-2-x-buyButtonText--default vtex-product-summary-2-x-buyButtonText--search">
                Adicionar ao carrinho
              </span>
            </div>
          </button>
        </div>
      </div>
    )
  }

  if (!approved) {
    return (
      <button
        onClick={e => {
          e.preventDefault()
          e.stopPropagation()
          navigate({ to: '/login' })
        }}
        className="vtex-button bw1 ba fw5 v-mid relative pa0 lh-solid br2 min-h-regular t-action bg-action-primary b--action-primary c-on-action-primary hover-bg-action-primary hover-b--action-primary hover-c-on-action-primary pointer w-100 "
        type="button"
      >
        <div
          className="vtex-button__label flex items-center justify-center h-100 ph6 w-100 border-box "
          style={{
            paddingTop: '0.25em',
            paddingBottom: '0.32em',
          }}
        >
          <div className="vtex-add-to-cart-button-0-x-buttonDataContainer vtex-add-to-cart-button-0-x-buttonDataContainer--quickview flex justify-center">
            <span className="vtex-add-to-cart-button-0-x-buttonText vtex-add-to-cart-button-0-x-buttonText--quickview">
              Comprar
            </span>
          </div>
        </div>
      </button>
    )
  }

  if (summary) {
    return <ExtensionPoint id="product-summary-buy-button" />
  }

  return <ExtensionPoint id="add-to-cart-button" />
}
