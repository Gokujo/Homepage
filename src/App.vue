<template>
  <div class="min-h-screen flex flex-col">
    <nav class="bg-white/90 backdrop-blur border-b border-gray-200 sticky top-0 z-10">
      <div class="max-w-5xl mx-auto px-3 sm:px-4" id="main-nav">
        <div class="flex items-center h-14 justify-between md:justify-center">
          <RouterLink
            :to="{ name: 'start', params: { locale: localeParam } }"
            class="px-3 py-2 rounded hover:bg-gray-100"
            :class="{ 'font-semibold text-blue-600': $route.name === 'start' }"
            >{{ $t('nav.home') }}</RouterLink
          >

          <button
            class="md:hidden p-2 rounded hover:bg-gray-100"
            aria-label="Menü öffnen"
            @click="isNavOpen = !isNavOpen"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>

          <div class="hidden md:flex items-center gap-4">
            <div
              id="cv-menu"
              class="relative"
              @mouseenter="showCvDropdown"
              @mouseleave="scheduleHideCvDropdown"
            >
              <div class="flex items-center">
                <RouterLink
                  :to="{ name: 'lebenslauf', params: { locale: localeParam } }"
                  class="px-3 py-2 rounded hover:bg-gray-100"
                  :class="{ 'font-semibold text-blue-600': $route.name === 'lebenslauf' }"
                  >{{ $t('nav.cv') }}</RouterLink
                >
              </div>
              <div
                class="absolute right-0 z-20 bg-white shadow rounded mt-1 w-48"
                v-show="isCvHoverOpen"
                @mouseenter="cancelHideCvDropdown"
                @mouseleave="scheduleHideCvDropdown"
              >
                <RouterLink
                  class="block px-3 py-2 hover:bg-gray-100"
                  :to="{ name: 'lebenslauf', params: { locale: localeParam }, hash: '#praktika' }"
                  >{{ $t('labels.praktika') }}</RouterLink
                >
                <RouterLink
                  class="block px-3 py-2 hover:bg-gray-100"
                  :to="{ name: 'lebenslauf', params: { locale: localeParam }, hash: '#ausbildung' }"
                  >{{ $t('labels.ausbildung') }}</RouterLink
                >
                <RouterLink
                  class="block px-3 py-2 hover:bg-gray-100"
                  :to="{ name: 'lebenslauf', params: { locale: localeParam }, hash: '#schule' }"
                  >{{ $t('labels.schule') }}</RouterLink
                >
              </div>
            </div>

            <RouterLink
              :to="{ name: 'dienstleistung', params: { locale: localeParam } }"
              class="px-3 py-2 rounded hover:bg-gray-100"
              :class="{ 'font-semibold text-blue-600': $route.name === 'dienstleistung' }"
              >{{ $t('nav.services') }}</RouterLink
            >
            <RouterLink
              :to="{ name: 'kontakt', params: { locale: localeParam } }"
              class="px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
              {{ $t('nav.contact') }}
            </RouterLink>

            <RouterLink
              :to="{ name: 'impressum', params: { locale: localeParam } }"
              class="px-3 py-2 rounded hover:bg-gray-100"
              :class="{ 'font-semibold text-blue-600': $route.name === 'impressum' }"
              >
              {{ $t('nav.imprint') }}
            </RouterLink>

            <RouterLink
              :to="{ name: 'datenschutz', params: { locale: localeParam } }"
              class="px-3 py-2 rounded hover:bg-gray-100"
              :class="{ 'font-semibold text-blue-600': $route.name === 'datenschutz' }"
              >
              {{ $t('nav.privacy') }}
            </RouterLink>
            <div class="h-6 w-px bg-gray-200"></div>
            <div
              id="lang-menu"
              class="relative"
              @mouseenter="openLang = true"
              @mouseleave="openLang = false"
            >
              <button class="px-3 py-2 rounded hover:bg-gray-100 flex items-center gap-2">
                <span class="text-xl">🌐</span>
                <span class="text-sm">{{ currentLocale.toUpperCase() }}</span>
              </button>
              <div
                v-show="openLang"
                class="absolute right-0 top-full bg-white border shadow rounded w-36 z-30"
                @mouseenter="openLang = true"
                @mouseleave="openLang = false"
              >
                <RouterLink
                  :to="buildLocaleTo('de')"
                  class="flex items-center gap-2 px-3 py-2 hover:bg-gray-50"
                  @click="persistLocale('de')"
                >
                  <span>🇩🇪</span>
                  <span>Deutsch</span>
                </RouterLink>
                <RouterLink
                  :to="buildLocaleTo('ru')"
                  class="flex items-center gap-2 px-3 py-2 hover:bg-gray-50"
                  @click="persistLocale('ru')"
                >
                  <span>🇷🇺</span>
                  <span>Русский</span>
                </RouterLink>
              </div>
            </div>
          </div>
        </div>

        <div v-if="isNavOpen" class="md:hidden border-t border-gray-200 py-2 space-y-1">
          <RouterLink
            :to="{ name: 'start', params: { locale: localeParam } }"
            class="block px-3 py-2 rounded hover:bg-gray-100"
            :class="{ 'font-semibold text-blue-600': $route.name === 'start' }"
            @click="isNavOpen = false"
            >{{ $t('nav.home') }}</RouterLink
          >

          <div class="px-1">
            <RouterLink
              :to="{ name: 'lebenslauf', params: { locale: localeParam } }"
              class="block px-2 py-2 rounded hover:bg-gray-100"
              :class="{ 'font-semibold text-blue-600': $route.name === 'lebenslauf' }"
              @click="isNavOpen = false"
              >{{ $t('nav.cv') }}</RouterLink
            >
            <div class="pl-4 space-y-1">
              <RouterLink
                class="block px-2 py-1 rounded hover:bg-gray-100"
                :to="{ name: 'lebenslauf', params: { locale: localeParam }, hash: '#praktika' }"
                @click="isNavOpen = false"
                >{{ $t('labels.praktika') }}</RouterLink
              >
              <RouterLink
                class="block px-2 py-1 rounded hover:bg-gray-100"
                :to="{ name: 'lebenslauf', params: { locale: localeParam }, hash: '#ausbildung' }"
                @click="isNavOpen = false"
                >{{ $t('labels.ausbildung') }}</RouterLink
              >
              <RouterLink
                class="block px-2 py-1 rounded hover:bg-gray-100"
                :to="{ name: 'lebenslauf', params: { locale: localeParam }, hash: '#schule' }"
                @click="isNavOpen = false"
                >{{ $t('labels.schule') }}</RouterLink
              >
            </div>
          </div>

          <RouterLink
            :to="{ name: 'dienstleistung', params: { locale: localeParam } }"
            class="block px-3 py-2 rounded hover:bg-gray-100"
            :class="{ 'font-semibold text-blue-600': $route.name === 'dienstleistung' }"
            @click="isNavOpen = false"
            >{{ $t('nav.services') }}</RouterLink
          >

          <RouterLink
            :to="{ name: 'kontakt', params: { locale: localeParam } }"
            class="block px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            @click="isNavOpen = false"
            >{{ $t('nav.contact') }}</RouterLink
          >

          <RouterLink
            :to="{ name: 'impressum', params: { locale: localeParam } }"
            class="block px-3 py-2 rounded hover:bg-gray-100"
            :class="{ 'font-semibold text-blue-600': $route.name === 'impressum' }"
            @click="isNavOpen = false"
            >{{ $t('nav.imprint') }}</RouterLink
          >

          <RouterLink
            :to="{ name: 'datenschutz', params: { locale: localeParam } }"
            class="block px-3 py-2 rounded hover:bg-gray-100"
            :class="{ 'font-semibold text-blue-600': $route.name === 'datenschutz' }"
            @click="isNavOpen = false"
            >{{ $t('nav.privacy') }}</RouterLink
          >
          <div class="px-1">
            <div class="border rounded">
              <RouterLink
                :to="buildLocaleTo('de')"
                class="block px-2 py-2 hover:bg-gray-100"
                @click="persistLocale('de'), isNavOpen = false">
                🇩🇪 Deutsch
              </RouterLink>
              <RouterLink
                :to="buildLocaleTo('ru')"
                class="block px-2 py-2 hover:bg-gray-100"
                @click="persistLocale('ru'), isNavOpen = false">
                🇷🇺 Русский
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <main class="flex-1 pb-32 sm:pb-28">
      <RouterView />
    </main>

    <footer
      class="fixed bottom-0 inset-x-0 px-3 py-3 sm:py-4 text-center text-sm text-gray-600 bg-white/90 backdrop-blur border-t z-10"
    >
      <nav class="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
        <RouterLink
          :to="{ name: 'impressum', params: { locale: localeParam } }"
          class="hover:text-blue-600"
          >{{ $t('footer.imprint') }}</RouterLink
        >
        <RouterLink
          :to="{ name: 'datenschutz', params: { locale: localeParam } }"
          class="hover:text-blue-600"
                      >{{ $t('footer.privacyLink') }}</RouterLink
        >
        <a href="https://github.com/Gokujo" class="hover:text-blue-600" target="_blank">{{
          $t('footer.github')
        }}</a>
        <a href="https://devcraft.club" class="hover:text-blue-600" target="_blank">{{
          $t('footer.devcraft')
        }}</a>
        <a
          href="https://www.xing.com/profile/Maxim_Harder/"
          class="hover:text-blue-600"
          target="_blank"
          >{{ $t('footer.xing') }}</a
        >
        <a href="/sitemap.xml" rel="sitemap" class="hover:text-blue-600">{{
          $t('footer.sitemap')
        }}</a>
      </nav>
      <div class="mt-2 text-xs text-gray-400">© {{ year() }} Maxim Harder</div>
    </footer>

    <div class="totop fixed bottom-2 right-2 sm:bottom-4 sm:right-4 z-20">
      <button
        class="flex items-center gap-1.5 bg-blue-600/90 text-white rounded-full px-2.5 py-1.5 shadow hover:bg-blue-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-3.5 h-3.5"
        >
          <path
            fill-rule="evenodd"
            d="M12 5a.75.75 0 0 1 .53.22l5.25 5.25a.75.75 0 1 1-1.06 1.06L12.75 7.56V19.5a.75.75 0 0 1-1.5 0V7.56L7.28 11.53a.75.75 0 1 1-1.06-1.06l5.25-5.25A.75.75 0 0 1 12 5Z"
            clip-rule="evenodd"
          />
        </svg>
        <span class="hidden md:inline text-sm">{{ $t('footer.toTop') }}</span>
      </button>
    </div>
    <CookieBanner />
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { i18n } from '@/i18n'
import CookieBanner from './components/CookieBanner.vue'

const isCvOpen = ref(false)
const isCvHoverOpen = ref(false)
let cvHideTimer: ReturnType<typeof setTimeout> | null = null
const year = () => {
  const start_year = 2025
  const current_year = new Date().getFullYear()

  return start_year === current_year ? current_year : `${start_year}-${current_year}`
}
const isNavOpen = ref(false)
const openLang = ref(false)
const currentLocale = computed(() => {
  const g = i18n.global
  const loc = typeof g.locale === 'string' ? g.locale : g.locale?.value
  return (loc as string) || 'de'
})
const localeParam = computed(() => (currentLocale.value === 'ru' ? 'ru' : undefined))

function persistLocale(loc: string) {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', loc)
    }
  } catch {}
}
const route = useRoute()
function buildLocaleTo(target: string) {
  const name = route.name || 'start'
  const params = { ...route.params }
  if (target === 'ru') params.locale = 'ru'
  else delete params.locale
  return { name, params, query: route.query, hash: route.hash }
}

const handleOutsideClick = (e: MouseEvent) => {
  const menu = document.getElementById('cv-menu')
  const target = e.target as Node | null
  if (menu && target && !menu.contains(target)) {
    isCvOpen.value = false
  }
}

onMounted(() => {
  const totop = document.querySelector('.totop') as HTMLElement | null
  const handleScroll = () => {
    const scroller = document.documentElement.scrollTop
    if (totop) totop.style.display = scroller >= 40 ? 'block' : 'none'
  }
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', handleScroll)
  }
  handleScroll()
      totop?.addEventListener('click', () => {
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    })
  document.addEventListener('click', handleOutsideClick)
  // html lang теперь управляется роутером через applySeoMeta()
  // keep language menu open when moving mouse between button and panel
  const langMenu = document.getElementById('lang-menu')
  if (langMenu) {
    langMenu.addEventListener('mouseenter', () => {
      openLang.value = true
    })
    langMenu.addEventListener('mouseleave', () => {
      openLang.value = false
    })
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleOutsideClick)
})

function showCvDropdown() {
  if (cvHideTimer) clearTimeout(cvHideTimer)
  isCvHoverOpen.value = true
}
function scheduleHideCvDropdown() {
  if (cvHideTimer) clearTimeout(cvHideTimer)
  cvHideTimer = setTimeout(() => {
    isCvHoverOpen.value = false
  }, 120)
}
function cancelHideCvDropdown() {
  if (cvHideTimer) clearTimeout(cvHideTimer)
}
</script>
