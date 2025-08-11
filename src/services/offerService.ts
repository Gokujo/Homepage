// Сервисный слой (OOP): работа с офферами
import type { OfferItem } from '@/shared/types'

export interface OfferRepository {
  list(): Promise<OfferItem[]>
}

export class StaticOfferRepository implements OfferRepository {
  // В реальном проекте — загрузка с API; здесь — статический список
  async list(): Promise<OfferItem[]> {
    return [
      { id: 'lastenheft', name: 'Lasten-/Pflichtenheft', description: 'Basisanforderungen, grobes Konzept, ausformulierte Lösungen.', kind: 'flat', price: 450 },
      { id: 'htmlthemeframe', name: 'HTML-Schablone (Framework)', description: 'Umsetzung von Vorlage in HTML5/CSS3 mit Framework (Bootstrap, Fomantic …).', kind: 'flat', price: 900 },
      { id: 'htmltheme', name: 'HTML-Schablоне', description: 'Individuelle HTML5/CSS3-Umsetzung ohne Framework.', kind: 'flat', price: 1200 },
      { id: 'cmsplugin', name: 'CMS Erweiterung', description: 'Erweiterung/Plugin für CMS (DLE).', kind: 'hourly', price: 75, minHours: 8 },
      { id: 'custom_web', name: 'Eigene Webanwendung', description: 'Webanwendung in PHP, Python oder Java.', kind: 'hourly', price: 85, minHours: 16 },
      { id: 'custom_win', name: 'Eigene Anwendung', description: 'Desktop-Anwendung in C#, Python oder Java.', kind: 'hourly', price: 80, minHours: 16 },
      { id: 'admin', name: 'Administrierung', description: 'Pflege der Webseite, Hosting (mtl. Zusatzleistung).', kind: 'hourly', price: 60, minHours: 8 },
    ]
  }
}

export class OfferService {
  // Репозиторий внедряется через конструктор (DI) — легко заменить реализацию
  constructor(private readonly repository: OfferRepository) {}

  async getCatalog(): Promise<OfferItem[]> {
    const items = await this.repository.list()
    // Здесь можно применить бизнес‑валидации/сортировки
    return items
  }
}


