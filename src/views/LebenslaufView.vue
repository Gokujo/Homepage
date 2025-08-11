<template>
  <div class="max-w-5xl px-3 sm:px-4 mx-auto lg:mx-0 lg:pl-8 xl:pl-16" id="werdegang">
    <section class="bg-white/95 rounded-2xl p-6 mt-6 shadow" id="praktika">
      <span class="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded">{{
        $t('cv.praktikaBadge')
      }}</span>
      <h2 class="text-2xl font-semibold mt-2">{{ $t('cv.praktikaTitle') }}</h2>
      <small class="text-gray-600">{{ $t('cv.praktikaSub') }}</small>
      <div class="mt-1 text-sm text-gray-500">
        {{ $t('cv.totalExperience', devExperienceWithLabels) }}
      </div>
      <div class="mt-4 space-y-4">
        <div
          class="flex gap-3 sm:gap-4 items-start"
          v-for="(platz, idx) in praktikaParagraphs"
          :key="idx"
        >
          <div
            class="hidden sm:flex w-10 h-10 rounded-full bg-gray-200 items-center justify-center text-xl"
          >
            🏢
          </div>
          <div>
            <div class="font-semibold leading-tight">{{ platz.unternehmen }}</div>
            <div class="text-xs sm:text-sm text-gray-600">
              {{ platz.datum }}
              <span
                v-if="formatDuration(platz.datum)"
                class="ml-2 inline-block px-2 py-0.5 rounded-full"
                :class="
                  isOngoing(platz.datum)
                    ? 'bg-green-200 text-green-800'
                    : 'bg-gray-200 text-gray-700'
                "
              >
                {{ formatDuration(platz.datum) }}
              </span>
            </div>
            <p class="mt-1">{{ platz.beschreibung }}</p>
            <div class="mt-2 flex gap-2 flex-wrap">
              <span
                class="text-xs bg-gray-200 px-2 py-1 rounded"
                v-for="(arb, k) in platz.arbeit"
                :key="k"
                >{{ arb.text }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <section
      class="bg-gradient-to-br from-blue-700 to-blue-600 text-white rounded-2xl p-6 mt-6 shadow"
      id="ausbildung"
    >
      <span class="inline-block bg-red-500 text-white text-xs px-2 py-1 rounded">{{
        $t('cv.ausbildungBadge')
      }}</span>
      <h2 class="text-2xl font-semibold mt-2">{{ $t('cv.ausbildungTitle') }}</h2>
      <small class="text-blue-100">{{ $t('cv.ausbildungSub') }}</small>
      <div class="mt-4 space-y-4">
        <div
          class="flex gap-3 sm:gap-4 items-start"
          v-for="(platz, idx) in ausbildungParagraphs"
          :key="idx"
        >
          <div
            class="hidden sm:flex w-10 h-10 rounded-full bg-blue-600 items-center justify-center text-xl"
          >
            🎓
          </div>
          <div>
            <div class="font-semibold">{{ platz.unternehmen }}</div>
            <div class="text-xs sm:text-sm text-blue-100">{{ platz.datum }}</div>
            <p class="mt-1">{{ platz.beschreibung }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-white/95 rounded-2xl p-6 mt-6 shadow" id="schule">
      <span class="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded">{{
        $t('cv.schuleBadge')
      }}</span>
      <h2 class="text-2xl font-semibold mt-2">{{ $t('cv.schuleTitle') }}</h2>
      <small class="text-gray-600">{{ $t('cv.schuleSub') }}</small>
      <div class="mt-4 space-y-4">
        <div
          class="flex gap-3 sm:gap-4 items-start"
          v-for="(platz, idx) in schuleParagraphs"
          :key="idx"
        >
          <div
            class="hidden sm:flex w-10 h-10 rounded-full bg-gray-200 items-center justify-center text-xl"
          >
            🏫
          </div>
          <div>
            <div class="font-semibold">{{ platz.unternehmen }}</div>
            <div class="text-xs sm:text-sm text-gray-600">{{ platz.datum }}</div>
            <p class="mt-1">{{ platz.beschreibung }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'

interface ArbeitItem {
  text: string
}
interface PraktikaItem {
  datum: string
  unternehmen: string
  beschreibung: string
  arbeit: ArbeitItem[]
}
interface SimpleItem {
  datum: string
  unternehmen: string
  beschreibung: string
}

const { tm } = useI18n()
const praktikaParagraphs = computed<PraktikaItem[]>(() => {
  const items = tm('cv.praktikaItems') as Array<{
    datum: string
    beschreibung: string
    arbeit?: string[]
  }>
  const companies = [
    'Bruckmann Steuerungstechnik GmbH',
    'Weltraumkommando der Bundeswehr',
    'Joint Analytical Systems GmbH',
    'antony Systemhaus GmbH',
    'TÜV Nord Bildung GmbH & Co. KG BZ Kamp-Lintfort',
    'Amazon Fullfilment GmbH',
    'MG Systems GmbH',
    'MG Systems GmbH',
    'MG Systems GmbH',
    'Rechtsanwaltskanzlei Oberdorfer & Truhm',
    'Satchkov Immobilien',
    'Setassistenz bei Dreharbeiten von „Demon in Me“',
    'mScb - Markus Schubert',
  ]
  return items.map((it, idx) => ({
    datum: it.datum,
    unternehmen: companies[idx],
    beschreibung: it.beschreibung,
    arbeit: (it.arbeit || []).map((t) => ({ text: t })),
  }))
})

const ausbildungParagraphs = computed<SimpleItem[]>(() => {
  const items = tm('cv.ausbildungItems') as Array<{ datum: string; beschreibung: string }>
  const companies = [
    'Joint Analytical Systems GmbH',
    'BSZ e.o. plauen',
    'Mediadesign Hochschule Berlin',
  ]
  return items.map((it, idx) => ({
    datum: it.datum,
    unternehmen: companies[idx],
    beschreibung: it.beschreibung,
  }))
})

const schuleParagraphs = computed<SimpleItem[]>(() => {
  const items = tm('cv.schuleItems') as Array<{ datum: string; beschreibung: string }>
  const companies = [
    'FH Iserlohn',
    'Berufskollege für Technik Moers',
    'Dr.-Chr.-Hufeland-Mittelschule',
    'Lessing-Gymnasium',
    'Grundschule Am Wartberg',
    'Gymnasium Nr. 5',
  ]
  return items.map((it, idx) => ({
    datum: it.datum,
    unternehmen: companies[idx],
    beschreibung: it.beschreibung,
  }))
})

function parseDateToken(token: string, hintYear?: number): Date {
  const parts = token.split('.')
  const now = new Date()
  let day = 1,
    month = 0,
    year = now.getFullYear()
  const cleaned = parts.filter(Boolean)
  if (cleaned.length === 3) {
    // dd.mm.yyyy
    day = Number(cleaned[0]) || 1
    month = (Number(cleaned[1]) || 1) - 1
    year = Number(cleaned[2]) || hintYear || now.getFullYear()
  } else if (cleaned.length === 2) {
    const a = cleaned[0],
      b = cleaned[1]
    if (String(b).length === 4) {
      // mm.yyyy
      month = (Number(a) || 1) - 1
      year = Number(b) || hintYear || now.getFullYear()
    } else {
      // dd.mm (year from hint)
      day = Number(a) || 1
      month = (Number(b) || 1) - 1
      year = hintYear || now.getFullYear()
    }
  } else if (cleaned.length === 1) {
    // yyyy or mm
    const num = Number(cleaned[0])
    if (num >= 1000) {
      year = num
      month = 0
      day = 1
    } else {
      month = (num || 1) - 1
      year = hintYear || now.getFullYear()
    }
  }
  return new Date(year, month, day)
}

function enumerateMonths(rangeStr: string): string[] {
  // Examples: '04.2025-', '10.2021-03.2025', '01.06.-03.07.2015', '01.07.-31.07.2014', '10.2011'
  const now = new Date()
  const raw = String(rangeStr).trim()
  const parts = raw.split('-')
  const startStr = (parts[0] || '').trim()
  const endStr = (parts[1] || '').trim()

  // Single-token cases
  if (parts.length === 1) {
    // MM.YYYY → exactly that month
    const mmYyyy = /^([01]?\d)\.(\d{4})$/
    const yyyy = /^(\d{4})$/
    const m = startStr.match(mmYyyy)
    if (m) {
      const month = String(Number(m[1])).padStart(2, '0')
      const year = m[2]
      return [`${year}-${month}`]
    }
    const y = startStr.match(yyyy)
    if (y) {
      const year = y[1]
      const out = []
      for (let i = 1; i <= 12; i++) out.push(`${year}-${String(i).padStart(2, '0')}`)
      return out
    }
    // Fallback: try parse and return its month
    const d = parseDateToken(startStr)
    return [`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`]
  }

  const endDate = endStr ? parseDateToken(endStr) : now
  const startDate = parseDateToken(startStr, endDate.getFullYear())
  // If less than 28 days, no months counted
  const ms = endDate - startDate
  const days = ms / (1000 * 60 * 60 * 24)
  if (days < 28) return []
  const keys = []
  let y = startDate.getFullYear()
  let m = startDate.getMonth()
  const endY = endDate.getFullYear()
  const endM = endDate.getMonth()
  while (y < endY || (y === endY && m <= endM)) {
    keys.push(`${y}-${String(m + 1).padStart(2, '0')}`)
    m += 1
    if (m >= 12) {
      m = 0
      y += 1
    }
  }
  return keys
}

function isOngoing(rangeStr: string): boolean {
  const parts = String(rangeStr).split('-')
  return parts.length === 2 && (!parts[1] || parts[1].trim() === '')
}

function formatDuration(rangeStr: string): string {
  const months = enumerateMonths(rangeStr).length
  if (!months) return ''
  const years = Math.floor(months / 12)
  const rest = months % 12
  const locale = (typeof document !== 'undefined' ? document.documentElement.lang : 'de') || 'de'
  const yLabel = locale.startsWith('ru') ? ruPluralYears(years) : dePluralYears(years)
  const mLabel = locale.startsWith('ru') ? ruPluralMonths(rest) : dePluralMonths(rest)
  if (years && rest) return `${years} ${yLabel}, ${rest} ${mLabel}`
  if (years) return `${years} ${yLabel}`
  return `${rest} ${mLabel}`
}

const totalExperience = computed<{ years: number; months: number }>(() => {
  const monthSet = new Set()
  for (const it of praktikaParagraphs.value) {
    for (const key of enumerateMonths(it.datum)) monthSet.add(key)
  }
  const months = monthSet.size
  const years = Math.floor(months / 12)
  const restMonths = months % 12
  // Cap by age (approximate): use birth date from StartView profile
  try {
    const birth = new Date(1991, 9, 18) // 18.10.1991 (month is 0-based)
    const now = new Date()
    const ageMonths =
      (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth())
    if (months > ageMonths) {
      const y = Math.floor(ageMonths / 12)
      const m = ageMonths % 12
      return { years: y, months: m }
    }
  } catch {}
  return { years, months: restMonths }
})

// Development-only total based on explicit ranges from the user
const developmentRanges: string[] = [
  '20.06.-24.06.2016',
  '09.2017-09.2021',
  '10.2021-03.2025',
  '04.2025-',
  '01.07.-31.07.2014',
  '05.-06.2013',
  '05.2009',
]

const totalDevExperience = computed<{ years: number; months: number }>(() => {
  const monthSet = new Set()
  for (const r of developmentRanges) {
    for (const key of enumerateMonths(r)) monthSet.add(key)
  }
  const months = monthSet.size
  const years = Math.floor(months / 12)
  const restMonths = months % 12
  return { years, months: restMonths }
})

function dePluralYears(n: number) {
  return n === 1 ? 'Jahr' : 'Jahre'
}
function dePluralMonths(n: number) {
  return n === 1 ? 'Monat' : 'Monate'
}
function ruPluralYears(n: number) {
  const mod10 = n % 10,
    mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return 'год'
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'года'
  return 'лет'
}
function ruPluralMonths(n: number) {
  const mod10 = n % 10,
    mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return 'месяц'
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'месяца'
  return 'месяцев'
}

type LabeledExperience = { years: number; months: number; yearsLabel: string; monthsLabel: string }
const experienceWithLabelsBase = (years: number, months: number): LabeledExperience => {
  const locale = (typeof document !== 'undefined' ? document.documentElement.lang : 'de') || 'de'
  if (locale.startsWith('ru')) {
    return { years, months, yearsLabel: ruPluralYears(years), monthsLabel: ruPluralMonths(months) }
  }
  return { years, months, yearsLabel: dePluralYears(years), monthsLabel: dePluralMonths(months) }
}

const experienceWithLabels = computed<LabeledExperience>(() => {
  const { years, months } = totalExperience.value
  return experienceWithLabelsBase(years, months)
})

const devExperienceWithLabels = computed<LabeledExperience>(() => {
  const { years, months } = totalDevExperience.value
  return experienceWithLabelsBase(years, months)
})

onMounted(() => {
  document.title = 'Mein Werdegang'
})
</script>
