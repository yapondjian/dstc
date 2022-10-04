import React, { createContext, useContext, useEffect, useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { useProduct } from 'vtex.product-context'
import type { ProductContextState } from 'vtex.product-context/react/ProductTypes'

import type {
  IBuyTogetherStateItem,
  IVtexProductData,
} from './BuyTogether.interfaces'
import BuyTogetherItems from './BuyTogetherItems'
import BuyTogetherTotals from './BuyTogetherTotals'

const CSS_HANDLES = [
  'buyTogetherContainer',
  'buyTogetherLabel',
  'buyTogetherContainerTitle',
  'buyTogetherContainerWrapper',
]

function mappingItem(item: IVtexProductData): IBuyTogetherStateItem | null {
  if (!item.items.length) {
    return null
  }

  const [sku] = item.items
  const [seller] = sku.sellers
  const [image] = sku.images

  return {
    name: sku.name,
    image: image.imageUrl,
    selected: false,
    price: seller.commertialOffer.Price,
    selectedDefault: false,
    url: item.link,
    id: sku.itemId,
    seller: seller.sellerId,
  }
}

export interface IBuyTogetherContext {
  items: IBuyTogetherStateItem[]
}

export const BuyTogetherContext = createContext<IBuyTogetherContext>({
  items: [],
})

export default function BuyTogether() {
  const { handles } = useCssHandles(CSS_HANDLES)
  const product = useProduct() as ProductContextState
  const [buyTogetherItems, setbuyTogetherItems] = useState<
    IBuyTogetherStateItem[]
  >([])

  async function getBuyTogetherItems(id: string) {
    const itemsData = await fetch(
      `/api/catalog_system/pub/products/crossselling/showtogether/${id}`
    )

    const items = (await itemsData.json()) as IVtexProductData[]

    // eslint-disable-next-line vtex/prefer-early-return
    if (items.length) {
      const { selectedItem } = product

      const productsMapping = items.slice(0, 2).map(mappingItem).filter(Boolean)

      const itemsToBuy = [...(productsMapping as IBuyTogetherStateItem[])]

      if (productsMapping.length === 1) {
        itemsToBuy.push({
          id: selectedItem?.itemId as string,
          image: selectedItem?.images[0].imageUrl as string,
          name: selectedItem?.name as string,
          price: selectedItem?.sellers[0].commertialOffer.Price as number,
          selected: true,
          selectedDefault: true,
          seller: selectedItem?.sellers[0].sellerId as string,
          url: product.product?.link as string,
        })
      }

      setbuyTogetherItems(itemsToBuy)
    }
  }

  useEffect(() => {
    if (!product || !product.selectedItem) {
      return
    }

    getBuyTogetherItems(product.selectedItem?.itemId as string)
  }, [product])

  if (!buyTogetherItems.length) {
    return <div />
  }

  if (buyTogetherItems.length !== 2) {
    return <div />
  }

  return (
    <BuyTogetherContext.Provider
      value={{
        items: buyTogetherItems,
      }}
    >
      <div className={handles.buyTogetherContainer}>
        <h3 className={handles.buyTogetherContainerTitle}>Compre junto</h3>
        <div className={handles.buyTogetherContainerWrapper}>
          <BuyTogetherItems />
          <BuyTogetherTotals />
        </div>
      </div>
    </BuyTogetherContext.Provider>
  )
}

export const useBuyTogetherContext = () => {
  return useContext(BuyTogetherContext)
}
