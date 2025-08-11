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

export interface PraktikaSubItems {
  name: string
}

export interface EducationItem {
  /**
   * Unternehmen / Schule / Einrichtung / ...
   */
  company: string
  /**
   * Datum von
   */
  from: string
  /**
   * Datum bis (leer = heute)
   */
  to: string | null
  /**
   * Beschäftigt als... / Abschluss / ...
   */
  description: string | null
}

export interface PraktikaItem extends EducationItem {

  /**
   * Verwendete Technologien
   */
  specs: PraktikaSubItems[]
  /**
   * Aufgaben
   */
  jobTasks: PraktikaSubItems[]
  relevant: boolean
}


