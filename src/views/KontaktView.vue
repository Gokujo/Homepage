<template>
  <div class="max-w-5xl px-3 sm:px-4 mx-auto xl:mx-0 xl:pl-16 mt-6">
    <section class="bg-white/90 rounded-lg p-6 mt-6">
      <h1 class="text-3xl font-bold">{{ $t('contact.title') }}</h1>
      <p class="text-gray-600 mt-2">{{ $t('contact.subtitle') }}</p>

      <form class="mt-6 space-y-4" @submit.prevent="submit">
        <div>
          <label class="block text-sm font-medium mb-1" for="name">{{ $t('contact.name') }}</label>
          <input
            id="name"
            v-model.trim="form.name"
            required
            class="w-full border rounded px-3 py-2"
            :placeholder="$t('contact.namePlaceholder')"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1" for="email">{{
            $t('contact.email')
          }}</label>
          <input
            id="email"
            type="email"
            v-model.trim="form.email"
            required
            class="w-full border rounded px-3 py-2"
            placeholder="name@example.com"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1" for="message">{{
            $t('contact.message')
          }}</label>
          <textarea
            id="message"
            v-model.trim="form.message"
            required
            rows="6"
            class="w-full border rounded px-3 py-2"
            :placeholder="$t('contact.messagePlaceholder')"
          ></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">{{ $t('contact.captchaTitle') }}</label>
          <div class="flex items-center gap-2">
            <span class="text-sm">{{ captcha.a }} + {{ captcha.b }} =</span>
            <input
              type="number"
              v-model.number="captcha.answer"
              required
              class="w-24 border rounded px-3 py-2"
              :aria-label="$t('contact.captchaAria')"
            />
            <button
              type="button"
              class="text-blue-600 hover:underline text-sm"
              @click="regenerateCaptcha"
            >
              {{ $t('contact.reload') }}
            </button>
          </div>
          <p v-if="captchaError" class="text-sm text-red-600 mt-1">
            {{ $t('contact.captchaError') }}
          </p>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">{{ $t('contact.turnstileTitle') }}</label>
          <div id="cf-turnstile" class="mt-1"></div>
          <div class="mt-1 flex items-center gap-2">
            <button
              type="button"
              class="text-blue-600 hover:underline text-sm"
              @click="resetTurnstile"
            >
              {{ $t('contact.reload') }}
            </button>
            <span v-if="turnstileError" class="text-sm text-red-600">{{
              $t('contact.turnstileError')
            }}</span>
          </div>
        </div>

        <div class="flex items-start gap-2">
          <input id="prices" type="checkbox" v-model="form.prices" required class="mt-1" />
          <label for="prices" class="text-sm">
            {{ $t('contact.pricesAgree.before') }}
            <RouterLink
              :to="{ name: 'dienstleistung', params: { locale: localeParam } }"
              class="text-blue-600 hover:underline"
              >{{ $t('contact.pricesAgree.link') }}</RouterLink
            >
            {{ $t('contact.pricesAgree.after') }}
          </label>
        </div>
        <div class="flex items-center gap-2">
          <input id="privacy" type="checkbox" v-model="form.privacy" required />
          <label for="privacy" class="text-sm">
            {{ $t('contact.privacyAgree.before') }}
            <RouterLink
              :to="{ name: 'datenschutz', params: { locale: localeParam } }"
              class="text-blue-600 hover:underline"
              >{{ $t('contact.privacyAgree.link') }}</RouterLink
            >
            {{ $t('contact.privacyAgree.after') }}
          </label>
        </div>
        <div class="pt-2">
          <button
            type="submit"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            :disabled="pending"
          >
            <span v-if="pending">{{ $t('contact.sending') }}</span>
            <span v-else>{{ $t('contact.send') }}</span>
          </button>
        </div>
      </form>

      <p v-if="success" class="mt-4 text-green-700">{{ $t('contact.success') }}</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { RouterLink } from 'vue-router'

const pending = ref<boolean>(false)
const success = ref<boolean>(false)
const form = ref<{
  name: string
  email: string
  message: string
  prices: boolean
  privacy: boolean
}>({ name: '', email: '', message: '', prices: false, privacy: false })
const captcha = reactive<{ a: number; b: number; answer: number | null }>({
  a: 0,
  b: 0,
  answer: null,
})
const captchaError = ref<boolean>(false)
const turnstileToken = ref<string>('')
const turnstileWidgetId = ref<any | null>(null)
const turnstileError = ref<boolean>(false)
const sitekey: string = import.meta.env.VITE_CF_TURNSTILE_SITEKEY || '1x00000000000000000000AA'
const { t } = useI18n()

declare global {
  interface Window {
    turnstile?: any
  }
}

function regenerateCaptcha() {
  captcha.a = Math.floor(Math.random() * 8) + 1
  captcha.b = Math.floor(Math.random() * 8) + 1
  captcha.answer = null
  captchaError.value = false
}

onMounted(() => {
  regenerateCaptcha()
  initTurnstile()
})

function submit() {
  if (!form.value.prices || !form.value.privacy) return
  const expected = Number(captcha.a) + Number(captcha.b)
  if (Number(captcha.answer) !== expected) {
    captchaError.value = true
    return
  }
  if (!turnstileToken.value) {
    turnstileError.value = true
    return
  }
  pending.value = true
  // Fallback: mailto-Übergabe, damit kein Server nötig ist
  const subject = encodeURIComponent(`${t('contact.mail.subject')} ${form.value.name}`)
  const yes = t('contact.mail.yes')
  const body = encodeURIComponent(
    `${t('contact.mail.name')}: ${form.value.name}\n` +
      `${t('contact.mail.email')}: ${form.value.email}\n` +
      `${t('contact.mail.pricesAccepted')}: ${yes}\n` +
      `${t('contact.mail.turnstileChecked')}: ${yes} \n\n` +
      `${t('contact.mail.message')}:\n${form.value.message}`,
  )
  const mailto = `mailto:info@maxim-harder.de?subject=${encodeURIComponent('[Webseitenanfrage]')}%20${subject}&body=${body}`
  success.value = true
  setTimeout(() => {
    window.location.href = mailto
    pending.value = false
  }, 300)
}

function initTurnstile() {
  const tryRender = () => {
    if (
      typeof window !== 'undefined' &&
      window.turnstile &&
      document.getElementById('cf-turnstile')
    ) {
      turnstileWidgetId.value = window.turnstile.render('#cf-turnstile', {
        sitekey,
        callback: (token) => {
          turnstileToken.value = token
          turnstileError.value = false
        },
        'error-callback': () => {
          turnstileToken.value = ''
          turnstileError.value = true
        },
      })
      clearInterval(timer)
    }
  }
  const timer = setInterval(tryRender, 150)
  setTimeout(() => clearInterval(timer), 6000)
}

function resetTurnstile() {
  if (typeof window !== 'undefined' && window.turnstile && turnstileWidgetId.value) {
    window.turnstile.reset(turnstileWidgetId.value)
    turnstileToken.value = ''
    turnstileError.value = false
  } else {
    initTurnstile()
  }
}

const route = useRoute()
const localeParam = computed(() => (route.params?.locale === 'ru' ? 'ru' : undefined))
</script>
