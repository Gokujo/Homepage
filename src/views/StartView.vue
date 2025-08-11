<template>
  <div class="max-w-5xl px-3 sm:px-4 mx-auto xl:mx-0 xl:pl-16 mt-6">
    <div
      class="bg-gradient-to-br from-blue-700 to-blue-600 text-white rounded-2xl p-6 shadow-lg"
      id="ki"
    >
      <h1 class="text-3xl font-bold text-center md:text-left">
        {{ profile.name }}
        <div class="text-white/80 text-base font-normal">{{ $t('start.heroRole') }}</div>
      </h1>
      <div class="foto">
        <img
          id="smallfoto"
          class="w-36 sm:w-44 md:w-56 rounded-xl border-4 border-white md:float-right md:ml-6 mx-auto aspect-square"
          src="/img/small_photo.jpg"
          :alt="$t('start.altProfile')"
        />
      </div>
      <dl class="personal_kurz">
        <dt>{{ $t('start.profile.email') }}</dt>
        <dd>{{ profile.email }}</dd>

        <dt>{{ $t('start.profile.location') }}</dt>
        <dd>{{ profile.plz }} {{ profile.stadt }}</dd>

        <dt class="mt-3">{{ $t('start.profile.availability') }}</dt>
        <dd class="mt-3">{{ $t('start.profile.availabilityValue') }}</dd>

        <dt class="mt-3">{{ $t('start.profile.languages') }}</dt>
        <dd class="mt-3">{{ $t('start.profile.languagesList') }}</dd>

        <dt>{{ $t('start.profile.technologies') }}</dt>
        <dd>{{ $t('start.profile.technologiesList') }}</dd>
      </dl>
      <div class="mt-4 flex flex-wrap gap-3">
        <RouterLink
          :to="{ name: 'kontakt', params: { locale: localeParam } }"
          class="bg-white text-blue-700 font-semibold px-4 py-2 rounded hover:bg-blue-50"
          >{{ $t('start.ctaContact') }}</RouterLink
        >
        <RouterLink
          :to="{ name: 'dienstleistung', params: { locale: localeParam } }"
          class="bg-blue-900/40 text-white px-4 py-2 rounded hover:bg-blue-900/60"
          >{{ $t('start.ctaServices') }}</RouterLink
        >
      </div>
    </div>

    <div class="bg-white/95 rounded-2xl p-6 mt-6 shadow" id="am">
      <h2 class="text-2xl font-semibold text-center md:text-left">
        {{ $t('start.about') }}
        <div class="text-gray-600 text-base font-normal">{{ $t('start.aboutSub') }}</div>
      </h2>
      <div class="space-y-3 text-left">
        <p class="text-gray-800">{{ $t('start.welcome') }}</p>
        <p
          class="text-gray-800"
          v-html="$t('start.ageLine', { age: getCurrentAge('18.10.1991') })"
        ></p>
        <p class="text-gray-800" v-html="($tm('start.paragraphs') as string[])[0]"></p>
        <p class="text-gray-800" v-html="($tm('start.paragraphs') as string[])[1]"></p>
        <p class="text-gray-800" v-html="($tm('start.paragraphs') as string[])[2]"></p>
        <p class="text-gray-800" v-html="($tm('start.paragraphs') as string[])[3]"></p>
      </div>
      <hr class="my-6" />
      <div class="mt-6 text-left">
        <p class="font-semibold mb-2">{{ $t('start.offerTitle') }}</p>
        <ul class="list-disc ml-6">
          <li v-for="(it, i) in $tm('start.offerList')" :key="i" v-html="it"></li>
        </ul>
      </div>
      <div class="mt-6 text-left">
        <p class="font-semibold mb-2">{{ $t('start.techTitle') }}</p>
        <ul class="list-disc ml-6">
          <li v-for="(it, i) in $tm('start.techList')" :key="i" v-html="it"></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
import { RouterLink } from 'vue-router'

const profile = reactive({
  name: 'Maxim Harder',
  email: 'info@maxim-harder.de',
  handy: 'Nur über Anfrage',
  strasse: 'Bahnhofstr.',
  hausnummer: '66',
  plz: '47589',
  stadt: 'Uedem',
  bday: '18.10.1991',
  bplace: 'Rudnyj (Kasachstan)',
  sub: 'Softwareentwickler (Web & Backend)',
})

function getCurrentAge(date: string): number {
  const d = date.split('.')
  if (d[2]) {
    const normalized = `${d[2]}.${d[1]}.${d[0]}`
    const birthDate = new Date(normalized)
    const now = new Date()
    const diffTime = now.getTime() - birthDate.getTime()
    const diffDays = diffTime / (1000 * 60 * 60 * 24)
    return Math.floor(diffDays / 365.25)
  }
  return 0
}

// Texte werden vollständig über i18n ($t/$tm) im Template gerendert

onMounted(() => {
  document.title = 'Softwareentwickler in NRW – Web & Backend | Maxim Harder'
})

const route = useRoute()
const localeParam = computed<string | undefined>(() =>
  route.params?.locale === 'ru' ? 'ru' : undefined,
)
</script>
