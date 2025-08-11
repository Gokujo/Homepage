<template>
  <div class="max-w-5xl px-3 sm:px-4 mx-auto xl:mx-0 xl:pl-16 mt-6">
    <section class="bg-white/95 rounded-2xl p-6 mt-6 shadow">
      <h1 class="text-3xl font-bold mb-2">{{ $t('legal.privacy.title') }}</h1>
      <p class="text-sm text-gray-600 mb-6">{{ $t('legal.privacy.subtitle') }}</p>

      <div class="space-y-6 text-gray-800">
        <div>
          <h2 class="font-semibold">{{ $t('legal.privacy.controllerTitle') }}</h2>
          <p>
            Maxim Harder<br />
            Bahnhofstr. 66, 47589 Uedem<br />
            E‑Mail:
            <a class="text-blue-600 hover:underline" href="mailto:info@maxim-harder.de"
              >info@maxim-harder.de</a
            >
          </p>
        </div>

        <div>
          <h2 class="font-semibold">{{ $t('legal.privacy.serverLogsTitle') }}</h2>
          <p>{{ $t('legal.privacy.serverLogsText') }}</p>
        </div>

        <div>
          <h2 class="font-semibold">{{ $t('legal.privacy.cookiesTitle') }}</h2>
          <p v-html="$t('legal.privacy.cookiesText')"></p>
          <p class="mt-2" v-html="$t('legal.privacy.turnstileCookiesText')"></p>
        </div>

        <div>
          <h2 class="font-semibold">{{ $t('legal.privacy.contactFormTitle') }}</h2>
          <p v-html="$t('legal.privacy.contactFormText')"></p>
          <p class="mt-2" v-html="$t('legal.privacy.contactFormMailto')"></p>
        </div>

        <div>
          <h2 class="font-semibold">{{ $t('legal.privacy.turnstileTitle') }}</h2>
          <p v-html="$t('legal.privacy.turnstileText')"></p>
        </div>

        <div>
          <h2 class="font-semibold">{{ $t('legal.privacy.rightsTitle') }}</h2>
          <p>{{ $t('legal.privacy.rightsText') }}</p>
        </div>

        <div>
          <h2 class="font-semibold">{{ $t('legal.privacy.hostingTitle') }}</h2>
          <p>{{ $t('legal.privacy.hostingText') }}</p>
        </div>

        <div class="text-sm text-gray-600">{{ $t('legal.lastUpdated') }} {{ updatedAt }}</div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const updatedAt = ref(new Date().toLocaleDateString('de-DE'))

onMounted(() => {
  const { t } = useI18n()
  document.title = t('legal.privacy.title')
})
</script>
