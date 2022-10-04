import React, { useEffect, useMemo, useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { useProduct } from 'vtex.product-context'
import type { ProductContextState } from 'vtex.product-context/react/ProductTypes'
import { Alert } from 'vtex.styleguide'

import type { Installment, OrderForm } from '../typings/orderform'
import { useBuyTogetherContext } from './BuyTogether'
import BuyTogetherButton from './BuyTogetherButton'
import { toLocaleCurrecy } from './BuyTogetherItems'

const CSS_HANDLES = [
  'buyTogetherTotalsContainer',
  'buyTogetherTotal',
  'buyTogetherTotalButton',
  'buyTogetherTotalInstallments',
]

export interface ICheckoutSimulationItemParam {
  id: string
  quantity: number
  seller: string
}

export async function checkoutSimulation(
  items: ICheckoutSimulationItemParam[]
) {
  const data = await fetch(
    `/api/checkout/pub/orderForms/simulation?RnbBehavior=0&sc=1`,
    {
      body: JSON.stringify({
        items,
        country: 'BRA',
      }),
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  )

  const simulation = await data.json()

  return simulation
}

export const getInstallments = (installmentOptions: Installment[] = []) => {
  if (!installmentOptions.length) {
    return ''
  }

  const creditOption = installmentOptions.find(
    option => option.paymentGroupName === 'creditCardPaymentGroup'
  )

  if (!creditOption) {
    return ''
  }

  const installmentLastOption = creditOption.installments?.pop()

  if (installmentLastOption) {
    return `Por apenas <b>${
      installmentLastOption.count
    }x</b> de <b>${toLocaleCurrecy(installmentLastOption.value / 100)}</b>`
  }

  return ''
}

export default function BuyTogetherTotals() {
  const { handles } = useCssHandles(CSS_HANDLES)
  const { items } = useBuyTogetherContext()
  const [simulation, setSimulation] = useState<OrderForm>()
  const product = useProduct() as ProductContextState

  useEffect(() => {
    const finalItems = items.map(item => ({
      id: item.id,
      quantity: 1,
      seller: item.seller,
    }))

    finalItems.push({
      id: String(product.selectedItem?.itemId),
      quantity: 1,
      seller: String(product.selectedItem?.sellers[0].sellerId),
    })

    checkoutSimulation(finalItems).then(simulationData => {
      setSimulation(simulationData as OrderForm)
    })
  }, [items, product])

  const total = useMemo(() => {
    return (
      simulation?.totals.find(
        (totalItem: any) => totalItem.id.toLocaleLowerCase() === 'items'
      )?.value || 0
    )
  }, [simulation])

  if (!simulation) {
    return <div className={handles.buyTogetherTotalsContainer} />
  }

  return (
    <div className={handles.buyTogetherTotalsContainer}>
      <h5>Leve os {items.length + 1} produtos</h5>
      <div
        className={handles.buyTogetherTotalInstallments}
        dangerouslySetInnerHTML={{
          __html: getInstallments(simulation.paymentData.installmentOptions),
        }}
      />
      <div
        className={handles.buyTogetherTotal}
        style={{ marginTop: '0.25rem' }}
      >
        Valor total <span>{toLocaleCurrecy(total / 100)}</span>
      </div>
      <BuyTogetherButton />
      {simulation.messages.length ? (
        <Alert>
          <p>${simulation.messages.join(' ')}</p>
        </Alert>
      ) : null}
    </div>
  )
}
