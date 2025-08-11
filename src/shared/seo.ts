import type { RouteLocationNormalizedLoaded } from 'vue-router'
import type { I18n, Composer } from 'vue-i18n'

type ApplySeoMetaParams = {
  to: RouteLocationNormalizedLoaded
  i18n: I18n
  defaultTitle: string
  defaultDesc: string
}

// Обновляет мета‑теги SEO и переключает локаль
export function applySeoMeta({ to, i18n, defaultTitle, defaultDesc }: ApplySeoMetaParams) {
  let title = (to.meta?.title as string) || defaultTitle
  try {
    const maybeLocale = to.params?.locale
    // Vue 3 i18n: locale может быть строкой или реактивом — обработаем оба случая
    const g: any = i18n.global as unknown as Composer | any
    const newLocale = maybeLocale === 'ru' ? 'ru' : 'de'
    if (typeof g.locale === 'string') g.locale = newLocale
    else if (g.locale && 'value' in g.locale) g.locale.value = newLocale
    const locale: string = typeof g.locale === 'string' ? g.locale : String(g.locale?.value || 'de')
    if (to.name === 'start' && g.te && g.te('start.title', locale)) {
      title = String(g.t('start.title'))
    }
    const html = document.documentElement
    if (html) html.lang = locale || 'de'
  } catch {}
  const description = (to.meta?.description as string) || defaultDesc

  if (title) document.title = title
  let descTag = document.querySelector('meta[name="description"]')
  if (!descTag) {
    descTag = document.createElement('meta')
    descTag.setAttribute('name', 'description')
    document.head.appendChild(descTag)
  }
  descTag.setAttribute('content', description)

  let canonical = document.querySelector('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.setAttribute('rel', 'canonical')
    document.head.appendChild(canonical)
  }
  const base = 'https://maxim-harder.de'
  const { pathname, search } = window.location
  canonical.setAttribute('href', `${base}${pathname}${search || ''}`)

  const setOg = (property: string, content?: string) => {
    if (!content) return
    let el = document.querySelector(`meta[property="${property}"]`)
    if (!el) {
      el = document.createElement('meta')
      el.setAttribute('property', property)
      document.head.appendChild(el)
    }
    el.setAttribute('content', content)
  }
  setOg('og:title', title)
  setOg('og:description', description)
  setOg('og:url', `${base}${pathname}${search || ''}`)
}


