export interface Product2 {
  brand: string
  categoryId: string
  description: string
  link: string
  linkText: string
  productId: string
  productName: string
  productReference: string
  jsonSpecifications?: any
}

export interface Installment {
  Value: number
  InterestRate: number
  TotalValuePlusInterestRate: number
  NumberOfInstallments: number
  PaymentSystemName: string
  PaymentSystemGroupName: string
  Name: string
}

export interface CommertialOffer {
  Installments: Installment[]
  Price: number
  ListPrice: number
  spotPrice: number
  PriceWithoutDiscount: number
  AvailableQuantity: number
}

export interface Seller {
  sellerId: string
  commertialOffer: CommertialOffer
}

export interface Image {
  imageUrl: string
}

export interface Sku {
  itemId: string
  name: string
  nameComplete: string
  complementName: string
  sellers: Seller[]
  ean: string
  measurementUnit: string
  unitMultiplier: number
  estimatedDateArrival?: any
  images: Image[]
  variations: any[]
}

export interface KitItem {
  product: Product2
  sku: Sku
}

export interface Item {
  kitItems: KitItem[]
}

export interface Product {
  items: Item[]
}

export interface ProductKit {
  product: Product
}
