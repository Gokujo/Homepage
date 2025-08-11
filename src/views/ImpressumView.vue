<template>
  <div class="max-w-5xl px-3 sm:px-4 mx-auto lg:mx-0 lg:pl-8 xl:pl-16">
    <section class="bg-white/95 rounded-2xl p-6 mt-6 shadow">
      <h1 class="text-3xl font-bold mb-2">{{ $t('legal.imprint.title') }}</h1>
      <p class="text-sm text-gray-600 mb-6">{{ $t('legal.imprint.subtitle') }}</p>

      <div class="space-y-6 text-gray-800">
        <div>
          <h2 class="font-semibold">{{ $t('legal.imprint.providerTitle') }}</h2>
          <p>
            Maxim Harder<br>
            Bahnhofstr. 66<br>
            47589 Uedem
          </p>
        </div>

        <div>
          <h2 class="font-semibold">{{ $t('legal.imprint.contactTitle') }}</h2>
          <p>
            E‑Mail: <a class="text-blue-600 hover:underline" href="mailto:info@maxim-harder.de">info@maxim-harder.de</a>
          </p>
        </div>

        <div>
          <h2 class="font-semibold">{{ $t('legal.imprint.responsibleTitle') }}</h2>
          <p>
            Maxim Harder, Bahnhofstr. 66, 47589 Uedem
          </p>
        </div>

        <div>
          <h2 class="font-semibold">{{ $t('legal.imprint.liabilityContentTitle') }}</h2>
          <p>{{ $t('legal.imprint.liabilityContentText') }}</p>
        </div>

        <div>
          <h2 class="font-semibold">{{ $t('legal.imprint.liabilityLinksTitle') }}</h2>
          <p>{{ $t('legal.imprint.liabilityLinksText') }}</p>
        </div>

        <div>
          <h2 class="font-semibold">{{ $t('legal.imprint.copyrightTitle') }}</h2>
          <p>{{ $t('legal.imprint.copyrightText') }}</p>
        </div>

        <div class="text-sm text-gray-600">
          {{ $t('legal.lastUpdated') }} {{ updatedAt }}
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const updatedAt = ref(new Date().toLocaleDateString('de-DE'))

onMounted(() => {
  const { t } = useI18n()
  document.title = t('legal.imprint.title')
})
</script>


