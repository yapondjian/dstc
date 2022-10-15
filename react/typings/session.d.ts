export interface Id {
  value: string
  keepAlive: boolean
}

export interface AccountName {
  value: string
}

export interface Account {
  id: Id
  accountName: AccountName
}

export interface Channel {
  value: string
}

export interface CountryCode {
  value: string
}

export interface CultureInfo {
  value: string
}

export interface CurrencyCode {
  value: string
}

export interface CurrencySymbol {
  value: string
}

export interface AdminCultureInfo {
  value: string
}

export interface Store {
  channel: Channel
  countryCode: CountryCode
  cultureInfo: CultureInfo
  currencyCode: CurrencyCode
  currencySymbol: CurrencySymbol
  admin_cultureInfo: AdminCultureInfo
}

export interface StoreUserId {
  value: string
}

export interface StoreUserEmail {
  value: string
}

export interface Authentication {
  storeUserId: StoreUserId
  storeUserEmail: StoreUserEmail
}

export interface IsAuthenticated {
  value: string
}

export interface Id2 {
  value: string
}

export interface Email {
  value: string
}

export interface FirstName {
  value: string
}

export interface Profile {
  isAuthenticated: IsAuthenticated
  id: Id2
  email: Email
  firstName: FirstName
}

export interface Namespaces {
  account: Account
  store: Store
  public: Public
  authentication: Authentication
  profile: Profile
}

export interface Session {
  id: string
  namespaces: Namespaces
}
