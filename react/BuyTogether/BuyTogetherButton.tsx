import type { VFC } from 'react'
import React, { useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { Button, withToast } from 'vtex.styleguide'
import { useOrderItems } from 'vtex.order-items/OrderItems'
import { usePixel } from 'vtex.pixel-manager'
import type { ProductContextState } from 'vtex.product-context/react/ProductTypes'
import { useProduct } from 'vtex.product-context'

import { useBuyTogetherContext } from './BuyTogether'

const CSS_HANDLES = ['buyTogetherTotalButton']

const BuyTogetherButton: VFC<{ showToast: any }> = ({ showToast }) => {
  const { handles } = useCssHandles(CSS_HANDLES)
  const { items } = useBuyTogetherContext()
  const [loading, setLoading] = useState(false)
  const { push } = usePixel()
  const product = useProduct() as ProductContextState

  const { addItems } = useOrderItems()

  async function addToCart() {
    try {
      setLoading(true)
      const skuItems = items.map((item, index) => ({
        id: Number(item.id),
        index,
        quantity: 1,
        seller: item.seller,
      }))

      skuItems.push({
        id: Number(product.selectedItem?.itemId),
        index: skuItems.length + 1,
        quantity: 1,
        seller: String(product.selectedItem?.sellers[0].sellerId),
      })

      await addItems(skuItems)
      push({
        event: 'addToCart',
        items: skuItems,
      })

      showToast({
        message: 'Produtos adicionados ao carrinho',
      })
    } catch (error) {
      showToast({
        message: 'Não foi possível adicionar os produtos no carrinho!',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={handles.buyTogetherTotalButton}>
      <Button onClick={() => addToCart()} isLoading={loading}>
        Comprar Junto
      </Button>
    </div>
  )
}

export default withToast(BuyTogetherButton)
