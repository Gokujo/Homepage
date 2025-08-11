// Доменные типы для CRUD
export type OfferKind = 'hourly' | 'flat'

export interface OfferItem {
  id: string
  name: string
  description: string
  kind: OfferKind
  minHours?: number
  price: number
}

export interface SelectedOfferItem {
  itemId: string
  qty: number
}


