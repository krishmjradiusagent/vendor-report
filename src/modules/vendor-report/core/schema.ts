export interface VendorTransaction {
  id: string
  transactionType: string
  representing: string
  address: string
  owner: string
  ownerAvatar?: string
  lender: string
  escrowCompany: string
  homeWarranty: string
  tcCompany: string
  titleCompany: string
  closingDate: string
}

export interface Agent {
  name: string
  email: string
  avatar: string
}

export interface SearchListing {
  type: 'Listing' | 'Search'
  title: string
  count: number
}

// Using class to ensure it's a value and a type
export class Client {
  id!: string
  name!: string
  avatar?: string
  email!: string
  phone!: string
  address!: string
  searchListing!: SearchListing
  agent!: Agent
  budget!: string
  purchasePrice?: number
  listedPrice?: number
  rentalAmount?: string
  propertiesViewed!: number
  propertiesShortlisted!: number
}

export const CLIENT_EXPORT_HEALTH_CHECK = true;
