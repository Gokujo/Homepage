import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { i18n } from '@/i18n'
import { applySeoMeta } from '@/shared/seo'

const StartView = () => import('@/views/StartView.vue')
const LebenslaufView = () => import('@/views/LebenslaufView.vue')
const DienstleistungView = () => import('@/views/DienstleistungView.vue')
const ImpressumView = () => import('@/views/ImpressumView.vue')
const DatenschutzView = () => import('@/views/DatenschutzView.vue')
const KontaktView = () => import('@/views/KontaktView.vue')

const routes: RouteRecordRaw[] = [
  { path: '/:locale(ru)?', name: 'start', component: StartView, meta: { title: 'Softwareentwickler in NRW – Web & Backend | Maxim Harder', description: 'Moderne Webentwicklung, performante Backends und individuelle Software. Angebot in 24h – unverbindlich anfragen.' } },
  { path: '/:locale(ru)?/lebenslauf', name: 'lebenslauf', component: LebenslaufView, meta: { title: 'Lebenslauf – Erfahrung & Ausbildung | Maxim Harder', description: 'Berufliche Stationen, Projekte und Ausbildung von Maxim Harder.' } },
  { path: '/:locale(ru)?/dienstleistung', name: 'dienstleistung', component: DienstleistungView, meta: { title: 'Dienstleistungen & Preise – Web, Backend, Apps | Maxim Harder', description: 'Übersicht zu Leistungen, Preisen und Berechnungsgrundlagen. Transparent und fair.' } },
  { path: '/:locale(ru)?/impressum', name: 'impressum', component: ImpressumView, meta: { title: 'Impressum | Maxim Harder', description: 'Anbieterkennzeichnung nach § 5 TMG.' } },
  { path: '/:locale(ru)?/datenschutz', name: 'datenschutz', component: DatenschutzView, meta: { title: 'Datenschutzerklärung | Maxim Harder', description: 'Informationen zum Datenschutz nach DSGVO.' } },
  { path: '/:locale(ru)?/kontakt', name: 'kontakt', component: KontaktView, meta: { title: 'Kontakt – Unverbindlich anfragen | Maxim Harder', description: 'Erhalten Sie innerhalb von 24 Stunden ein unverbindliches Angebot.' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0 }
  },
})

router.beforeEach((to, _from, next) => {
  const hasLocale = typeof to.params.locale === 'string'
  try {
    if (hasLocale) {
      localStorage.setItem('locale', String(to.params.locale))
    }
  } catch {}
  if (!hasLocale) {
    const stored = (typeof window !== 'undefined' && localStorage.getItem('locale')) || ''
    const nav = (navigator.language || '').toLowerCase()
    const preferred = stored || (nav.startsWith('ru') ? 'ru' : 'de')
    if (preferred !== 'de') {
      const path = to.fullPath === '/' ? '/ru' : `/ru${to.fullPath}`
      return next(path)
    }
  }
  return next()
})

router.afterEach((to) => {
  const defaultTitle = 'Maxim Harder – Softwareentwicklung: Web, Backend, Apps'
  const defaultDesc =
    'Webentwicklung, performante Backends und individuelle Lösungen. Angebot in 24h – unverbindlich anfragen.'
  applySeoMeta({ to, i18n, defaultTitle, defaultDesc })
})

export default router


