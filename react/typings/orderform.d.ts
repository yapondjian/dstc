export interface PriceTag {
  name: string
  value: number
  rawValue: number
  isPercentual: boolean
  identifier?: any
}

export interface SellingPrice {
  value: number
  quantity: number
}

export interface PriceDefinition {
  calculatedSellingPrice: number
  total: number
  sellingPrices: SellingPrice[]
}

export interface Item {
  id: string
  requestIndex: number
  quantity: number
  seller: string
  sellerChain: string[]
  tax: number
  priceValidUntil: Date
  price: number
  listPrice: number
  rewardValue: number
  sellingPrice: number
  offerings: any[]
  priceTags: PriceTag[]
  measurementUnit: string
  unitMultiplier: number
  parentItemIndex?: any
  parentAssemblyBinding?: any
  availability: string
  catalogProvider: string
  priceDefinition: PriceDefinition
}

export interface RateAndBenefitsIdentifier {
  id: string
  name: string
  featured: boolean
  description?: any
  matchedParameters: MatchedParameters
  additionalInfo?: any
}

export interface RatesAndBenefitsData {
  rateAndBenefitsIdentifiers: RateAndBenefitsIdentifier[]
  teaser: any[]
}

export interface InstallmentItem {
  count: number
  total: number
  value: number
}

export interface Installment {
  bin: string
  installments: InstallmentItem[]
  paymentName: string
  paymentSystem: string
  value: number
  paymentGroupName: string
}

export interface PaymentData {
  installmentOptions: Installment[]
  paymentSystems: any[]
  payments: any[]
  giftCards: any[]
  giftCardMessages: any[]
  availableAccounts: any[]
  availableTokens: any[]
  availableAssociations: AvailableAssociations
}

export interface DeliveryChannel {
  id: string
}

export interface LogisticsInfo {
  itemIndex: number
  addressId?: any
  selectedSla?: any
  selectedDeliveryChannel?: any
  quantity: number
  shipsTo: string[]
  slas: any[]
  deliveryChannels: DeliveryChannel[]
}

export interface ItemPurchaseCondition {
  id: string
  seller: string
  sellerChain: string[]
  slas: any[]
  price: number
  listPrice: number
}

export interface PurchaseConditions {
  itemPurchaseConditions: ItemPurchaseCondition[]
}

export interface Total {
  id: string
  name: string
  value: number
}

export interface OrderForm {
  items: Item[]
  ratesAndBenefitsData: RatesAndBenefitsData
  paymentData: PaymentData
  selectableGifts: any[]
  marketingData?: any
  postalCode?: any
  country: string
  logisticsInfo: LogisticsInfo[]
  messages: any[]
  purchaseConditions: PurchaseConditions
  pickupPoints: any[]
  subscriptionData?: any
  totals: Total[]
  itemMetadata?: any
}
