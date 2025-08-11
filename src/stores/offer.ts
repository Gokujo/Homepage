// Pinia Store (CRUD по DRY) для корзины офферов
import { defineStore } from 'pinia'
import type { OfferItem, SelectedOfferItem } from '@/shared/types'
import { OfferService, StaticOfferRepository } from '@/services/offerService'

const service = new OfferService(new StaticOfferRepository())

type State = {
  catalog: OfferItem[]
  selected: Record<string, SelectedOfferItem>
}

export const useOfferStore = defineStore('offer', {
  state: (): State => ({ catalog: [], selected: {} }),
  getters: {
    selectedList: (s): SelectedOfferItem[] => Object.values(s.selected),
    totalNet: (s): number =>
      Object.values(s.selected).reduce((sum, sel) => {
        const item = s.catalog.find((i) => i.id === sel.itemId)
        if (!item) return sum
        return sum + (item.kind === 'flat' ? item.price : item.price * sel.qty)
      }, 0),
  },
  actions: {
    // C: добавить
    add(itemId: string, qty = 1) {
      const prev = this.selected[itemId]
      this.selected[itemId] = { itemId, qty: (prev?.qty || 0) + qty }
    },
    // R: загрузить каталог
    async loadCatalog() {
      this.catalog = await service.getCatalog()
    },
    // U: изменить количество
    updateQty(itemId: string, qty: number) {
      if (qty <= 0) return this.remove(itemId)
      const prev = this.selected[itemId]
      if (!prev) return
      this.selected[itemId] = { ...prev, qty }
    },
    // D: удалить
    remove(itemId: string) {
      const { [itemId]: _, ...rest } = this.selected
      this.selected = rest
    },
    clear() {
      this.selected = {}
    },
  },
})


