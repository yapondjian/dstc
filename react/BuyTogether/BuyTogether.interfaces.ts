export interface ClusterHighlights {}

export interface ProductClusters {
  137: string
}

export interface SearchableClusters {}

export interface ReferenceId {
  Key: string
  Value: string
}

export interface Image {
  imageId: string
  imageLabel: string
  imageTag: string
  imageUrl: string
  imageText: string
  imageLastModified: Date
}

export interface DeliverySlaSample {
  DeliverySlaPerTypes: any[]
  Region?: any
}

export interface PaymentOptions {
  installmentOptions: any[]
  paymentSystems: any[]
  payments: any[]
  giftCards: any[]
  giftCardMessages: any[]
  availableAccounts: any[]
  availableTokens: any[]
}

export interface CommertialOffer {
  Installments: any[]
  GiftSkuIds: any[]
  Teasers: any[]
  BuyTogether: string[]
  ItemMetadataAttachment: any[]
  Price: number
  ListPrice: number
  PriceWithoutDiscount: number
  RewardValue: number
  PriceValidUntil: Date
  AvailableQuantity: number
  IsAvailable: boolean
  Tax: number
  DeliverySlaSamples: DeliverySlaSample[]
  GetInfoErrorMessage?: any
  CacheVersionUsedToCallCheckout: string
  PaymentOptions: PaymentOptions
}

export interface Seller {
  sellerId: string
  sellerName: string
  addToCartLink: string
  sellerDefault: boolean
  commertialOffer: CommertialOffer
}

export interface Item {
  itemId: string
  name: string
  nameComplete: string
  complementName: string
  ean: string
  referenceId: ReferenceId[]
  measurementUnit: string
  unitMultiplier: number
  modalType?: any
  isKit: boolean
  images: Image[]
  farby: string[]
  variations: string[]
  sellers: Seller[]
  Videos: any[]
  estimatedDateArrival?: any
}

export interface Field {
  id: number
  name: string
  isActive: boolean
  position: number
  type: string
}

export interface Value {
  id: string
  name: string
  position: number
}

export interface SkuSpecification {
  field: Field
  values: Value[]
}

export interface IVtexProductData {
  productId: string
  productName: string
  brand: string
  brandId: number
  brandImageUrl?: any
  linkText: string
  productReference: string
  productReferenceCode?: any
  categoryId: string
  productTitle: string
  metaTagDescription: string
  releaseDate: Date
  clusterHighlights: ClusterHighlights
  productClusters: ProductClusters
  searchableClusters: SearchableClusters
  categories: string[]
  categoriesIds: string[]
  link: string
  allSpecifications: string[]
  allSpecificationsGroups: string[]
  description: string
  items: Item[]
  skuSpecifications: SkuSpecification[]
}

export interface IBuyTogetherStateItem {
  name: string
  image: string
  price: number
  selected: boolean
  selectedDefault: boolean
  url: string
  id: string
  seller: string
}
