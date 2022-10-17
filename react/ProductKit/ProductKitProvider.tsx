import React, { createContext, useContext, useMemo } from 'react'
import { useQuery } from 'react-apollo'
import { ExtensionPoint } from 'vtex.render-runtime'
import { useProduct } from 'vtex.product-context'
import type { ProductContextState } from 'vtex.product-context/react/ProductTypes'

import GET_PRODUCT_KIT from './graphql/getProductKit.gql'
import type { KitItem, ProductKit } from '../typings/product-kit'

const ProductKitContext = createContext<{ items: KitItem[] }>({ items: [] })

export default function ProductKitProvider({
  children,
}: {
  children: React.ReactElement
}) {
  const {
    product: { linkText },
    product,
    selectedItem,
  } = useProduct() as ProductContextState & { product: { linkText: string } }

  const { data, loading } = useQuery<ProductKit, { slug: string }>(
    GET_PRODUCT_KIT,
    {
      variables: {
        slug: linkText,
      },
      skip: !linkText,
    }
  )

  const itemsKit = useMemo(() => {
    const items: KitItem[] = [
      {
        product: product as any,
        sku: selectedItem as any,
      },
    ]

    if (data?.product.items.length) {
      if (data?.product.items.some(item => item.kitItems.length)) {
        const itemsBySku = data?.product.items.find(
          item => item.kitItems.length
        )

        if (itemsBySku) {
          itemsBySku.kitItems.forEach(item => {
            items.push(item)
          })
        }
      }
    }

    return items
  }, [data, product, selectedItem])

  if (loading) {
    return <div />
  }

  if (itemsKit.length === 1) {
    return <ExtensionPoint id="flex-layout.col" />
  }

  return (
    <ProductKitContext.Provider value={{ items: itemsKit }}>
      {children}
    </ProductKitContext.Provider>
  )
}

export const useProductKitContext = () => {
  const context = useContext(ProductKitContext)

  if (!context) {
    throw new Error(
      'nao se pode usar o context: useProductKitContext fora de um ProductKitContext'
    )
  }

  return context
}
