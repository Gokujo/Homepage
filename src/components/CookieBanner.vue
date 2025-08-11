<template>
  <transition name="fade">
    <div v-if="visible" class="fixed left-0 right-0 bottom-20 sm:bottom-24 z-40">
      <div class="max-w-5xl mx-auto px-3 sm:px-4">
        <div class="bg-white/95 backdrop-blur border shadow-lg rounded-xl p-4">
          <div class="flex flex-col sm:flex-row sm:items-center gap-3">
            <div class="text-sm text-gray-800">
              {{ $t('cookie.text') }}
              <RouterLink to="/datenschutz" class="text-blue-600 hover:underline">{{ $t('cookie.more') }}</RouterLink>.
            </div>
            <div class="flex items-center gap-2 sm:ml-auto">
              <RouterLink to="/datenschutz" class="px-3 py-1.5 rounded border text-sm hover:bg-gray-50">{{ $t('cookie.more') }}</RouterLink>
              <button @click="accept" class="px-3 py-1.5 rounded bg-blue-600 text-white text-sm hover:bg-blue-700">{{ $t('cookie.ok') }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

const STORAGE_KEY = 'cookieConsentAccepted'
const visible = ref(false)

function accept() {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ v: 1, at: new Date().toISOString() }))
    }
  } catch {}
  visible.value = false
}

onMounted(() => {
  try {
    const raw = (typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY)) || null
    visible.value = !raw
    // remember locale selection for i18n (optional enhancement)
          try {
        if (typeof window !== 'undefined') {
          const path = window.location.pathname || '/'
          if (path.startsWith('/ru')) localStorage.setItem('locale', 'ru')
          else if (!localStorage.getItem('locale')) localStorage.setItem('locale', 'de')
        }
      } catch {}
  } catch {
    visible.value = true
  }
})
</script>

<style>
.fade-enter-active, .fade-leave-active { transition: opacity .2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>


