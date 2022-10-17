import React, { Fragment, useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { Link } from 'vtex.render-runtime'
import { Button } from 'vtex.styleguide'
import { usePixel } from 'vtex.pixel-manager'
import { useOrderItems } from 'vtex.order-items/OrderItems'
import { useRuntime } from 'vtex.render-runtime/react/components/RenderContext'

import { toLocaleCurrecy } from '../BuyTogether/BuyTogetherItems'
// eslint-disable-next-line import/order
import type { Installment, KitItem } from '../typings/product-kit'

import './ProductKit.css'
import { useB2BContext } from '../B2BProfileProvider/B2BProfileProvider'

const CSS_HANDLES = [
  'productKitItem',
  'productKitItemDetails',
  'productKitItemImage',
  'productKitItemDetailsPriceList',
  'productKitItemDetailsPrices',
  'productKitItemDetailsInstallments',
  'productKitItemDetailsPriceSpot',
  'productKitItemDetailsButton',
]

const getInstallments = (installments: Installment[]) => {
  if (!installments.length) {
    return ''
  }

  const lastInstallment = installments.sort(
    (a, b) => a.NumberOfInstallments - b.NumberOfInstallments
  )

  if (!lastInstallment.length) {
    return ''
  }

  const { NumberOfInstallments, Value } = lastInstallment.pop() as Installment

  return (
    <Fragment>
      <b>{NumberOfInstallments}x</b>
      de <b>{toLocaleCurrecy(Value)}</b>
      sem juros
    </Fragment>
  )
}

export default function ProductKitItem({ sku }: { sku: KitItem }) {
  const { handles } = useCssHandles(CSS_HANDLES)
  const [isLoading, setLoading] = useState<boolean>(false)
  const { addItems } = useOrderItems()
  const { push } = usePixel()
  const { approved } = useB2BContext()
  const { navigate } = useRuntime()

  const addToCart = async () => {
    setLoading(true)
    if (!approved) {
      return navigate({ to: '/login' })
    }

    const items = [
      {
        id: Number(sku.sku.itemId),
        index: 0,
        quantity: 1,
        seller: String(sku.sku.sellers[0].sellerId),
      },
    ]

    await addItems(items)

    push({
      event: 'addToCart',
      items,
    })

    return setLoading(false)
  }

  return (
    <section className={handles.productKitItem}>
      <div className={handles.productKitItemImage}>
        <Link to={`/${sku.product.linkText}/p`}>
          <img
            width={140}
            height={140}
            src={sku.sku.images[0].imageUrl}
            alt={sku.product.productName}
          />
        </Link>
      </div>
      <div className={handles.productKitItemDetails}>
        <h3>{sku.product.productName}</h3>
        {approved ? (
          <Fragment>
            <div className={handles.productKitItemDetailsPrices}>
              <span className={handles.productKitItemDetailsPriceList}>
                {sku.sku.sellers[0].commertialOffer.ListPrice !==
                sku.sku.sellers[0].commertialOffer.Price
                  ? toLocaleCurrecy(
                      sku.sku.sellers[0].commertialOffer.ListPrice
                    )
                  : null}
              </span>
              <span className={handles.productKitItemDetailsPriceSpot}>
                <b>
                  {toLocaleCurrecy(sku.sku.sellers[0].commertialOffer.Price)}
                </b>{' '}
                à vista
              </span>
              <span className={handles.productKitItemDetailsInstallments}>
                {getInstallments(
                  sku.sku.sellers[0].commertialOffer.Installments
                )}
              </span>
            </div>
          </Fragment>
        ) : null}
        <div className={handles.productKitItemDetailsButton}>
          <Button onClick={addToCart} isLoading={isLoading}>
            Comprar
          </Button>
        </div>
      </div>
    </section>
  )
}
