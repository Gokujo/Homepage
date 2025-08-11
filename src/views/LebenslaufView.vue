<template>
  <div id="werdegang" class="max-w-5xl px-3 sm:px-4 mx-auto xl:mx-0 xl:pl-16 mt-6">
    <section id="praktika" class="bg-white/95 rounded-2xl p-6 mt-6 shadow">
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
          v-for="(platz, idx) in praktikaItems"
          :key="idx"
          :class="!platz.relevant ? 'text-gray-500' : ''"
          class="flex gap-3 sm:gap-4 items-start"
        >
          <div
            class="hidden sm:flex w-10 h-10 rounded-full bg-gray-200 items-center justify-center text-xl aspect-square"
          >
            🏢
          </div>
          <div :class="!platz.relevant ? 'italic' : ''">
            <div class="font-semibold leading-tight">{{ platz.company }}</div>
            <div class="text-xs sm:text-sm text-gray-600">
              {{ formatDateRange(platz.from, platz.to) }}
              <span
                :class="
                  isOngoing(platz.from, platz.to)
                    ? 'bg-green-200 text-green-800'
                    : 'bg-gray-200 text-gray-700'
                "
                class="ml-2 inline-block px-2 py-0.5 rounded-full"
              >
                {{ formatDuration(platz.from, platz.to) }}
              </span>
            </div>
            <p class="mt-1">{{ platz.description }}</p>
            <div v-if="platz.jobTasks.length > 0" class="mt-2 flex gap-2 flex-nowrap">
              <span
                v-for="(spec, k) in platz.specs"
                :key="k"
                class="text-xs bg-gray-200 px-2 py-1 rounded"
              >
                {{ spec.name }}
              </span>
            </div>
            <div v-if="platz.jobTasks.length > 0" class="mt-2 flex gap-2 flex-wrap">
              <span
                v-for="(task, k) in platz.jobTasks"
                :key="k"
                class="text-xs bg-blue-200 px-2 py-1 rounded break-all"
              >
                {{ task.name }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section
      id="ausbildung"
      class="bg-gradient-to-br from-blue-700 to-blue-600 text-white rounded-2xl p-6 mt-6 shadow"
    >
      <span class="inline-block bg-red-500 text-white text-xs px-2 py-1 rounded">
        {{ $t('cv.ausbildungBadge') }}
      </span>
      <h2 class="text-2xl font-semibold mt-2">{{ $t('cv.ausbildungTitle') }}</h2>
      <small class="text-blue-100">{{ $t('cv.ausbildungSub') }}</small>
      <div class="mt-4 space-y-4">
        <div
          v-for="(platz, idx) in ausbildungItems"
          :key="idx"
          class="flex gap-3 sm:gap-4 items-start"
        >
          <div
            class="hidden sm:flex w-10 h-10 rounded-full bg-blue-600 items-center justify-center text-xl aspect-square"
          >
            🎓
          </div>
          <div>
            <div class="font-semibold">{{ platz.company }}</div>
            <div class="text-xs sm:text-sm text-blue-100">
              {{ formatDateRange(platz.from, platz.to) }}
            </div>
            <p class="mt-1">{{ platz.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section id="schule" class="bg-white/95 rounded-2xl p-6 mt-6 shadow">
      <span class="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded">
        {{ $t('cv.schuleBadge') }}
      </span>
      <h2 class="text-2xl font-semibold mt-2">{{ $t('cv.schuleTitle') }}</h2>
      <small class="text-gray-600">{{ $t('cv.schuleSub') }}</small>
      <div class="mt-4 space-y-4">
        <div v-for="(platz, idx) in schuleItems" :key="idx" class="flex gap-3 sm:gap-4 items-start">
          <div
            class="hidden sm:flex w-10 h-10 rounded-full bg-gray-200 items-center justify-center text-xl aspect-square"
          >
            🏫
          </div>
          <div>
            <div class="font-semibold">{{ platz.company }}</div>
            <div class="text-xs sm:text-sm text-gray-600">
              {{ formatDateRange(platz.from, platz.to) }}
            </div>
            <p class="mt-1">{{ platz.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import type { EducationItem, PraktikaItem } from '../shared/types'

const { tm } = useI18n()

// Get items directly from i18n with proper typing
const praktikaItems = computed<PraktikaItem[]>(() => {
  return tm('cv.praktikaItems') as PraktikaItem[]
})

const ausbildungItems = computed<EducationItem[]>(() => {
  return tm('cv.ausbildungItems') as EducationItem[]
})

const schuleItems = computed<EducationItem[]>(() => {
  return tm('cv.schuleItems') as EducationItem[]
})

// Helper function to format date range
function formatDateRange(from: string, to: string | null): string {
  if (!to) {
    return `${from}-`;
  }

  if (from === to) {
    return from;
  }

  const fromDate = parseDate(from);
  const toDate = parseDate(to);

  if (fromDate && toDate){
    if (fromDate.getFullYear() === toDate.getFullYear()) {
      const fromMonth = ('0' + (fromDate.getMonth() + 1)).slice(-2);
      const toMonth = ('0' + (toDate.getMonth() + 1)).slice(-2);
      return `${fromMonth}-${toMonth}.${fromDate.getFullYear()}`;
    }
  }

  return `${from}-${to}`
}

// Helper function to check if position is ongoing
function isOngoing(from: string, to: string | null): boolean {
  return !to
}

// Helper function to format duration
function formatDuration(from: string, to: string | null): string {
  const sameMonth = from === to;
  let fromDate = parseDate(from);
  let toDate = to ? parseDate(to) : new Date();

  if (!fromDate || !toDate) return ''

  if (sameMonth) {
    fromDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), 1);
    toDate = new Date(toDate.getFullYear(), toDate.getMonth() + 1, 1);
  }

  const months =
    (toDate.getFullYear() - fromDate.getFullYear()) * 12 + (toDate.getMonth() - fromDate.getMonth())

  if (months < 1) return ''

  const years = Math.floor(months / 12)
  const restMonths = months % 12

  const locale = (typeof document !== 'undefined' ? document.documentElement.lang : 'de') || 'de'
  const yLabel = locale.startsWith('ru') ? ruPluralYears(years) : dePluralYears(years)
  const mLabel = locale.startsWith('ru') ? ruPluralMonths(restMonths) : dePluralMonths(restMonths)

  if (years && restMonths) return `${years} ${yLabel}, ${restMonths} ${mLabel}`
  if (years) return `${years} ${yLabel}`
  return `${restMonths} ${mLabel}`
}

// Parse date from various formats
function parseDate(dateStr: string, dateDay: number = 1): Date | null {
  const parts = dateStr.split('.')

  if (parts.length === 2) {
    // MM.YYYY format
    const month = parseInt(parts[0], 10) - 1
    const year = parseInt(parts[1], 10)
    if (!isNaN(month) && !isNaN(year)) {
      return new Date(year, month, dateDay)
    }
  } else if (parts.length === 1) {
    // YYYY format
    const year = parseInt(parts[0], 10)
    if (!isNaN(year)) {
      return new Date(year, 0, dateDay)
    }
  }
  return null
}

// Calculate total development experience
const totalDevExperience = computed(() => {
  let totalMonths = 0

  for (const item of praktikaItems.value) {
    if (item.relevant) {
      const fromDate = parseDate(item.from)
      const toDate = item.to ? parseDate(item.to) : new Date()

      if (fromDate && toDate) {
        const months =
          (toDate.getFullYear() - fromDate.getFullYear()) * 12 +
          (toDate.getMonth() - fromDate.getMonth())
        totalMonths += Math.max(0, months)
      }
    }
  }

  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12

  return { years, months }
})

const devExperienceWithLabels = computed(() => {
  const { years, months } = totalDevExperience.value
  const locale = (typeof document !== 'undefined' ? document.documentElement.lang : 'de') || 'de'

  if (locale.startsWith('ru')) {
    return {
      years,
      months,
      yearsLabel: ruPluralYears(years),
      monthsLabel: ruPluralMonths(months),
    }
  }

  return {
    years,
    months,
    yearsLabel: dePluralYears(years),
    monthsLabel: dePluralMonths(months),
  }
})

// Pluralization helpers
function dePluralYears(n: number) {
  return n === 1 ? 'Jahr' : 'Jahre'
}

function dePluralMonths(n: number) {
  return n === 1 ? 'Monat' : 'Monate'
}

function ruPluralYears(n: number) {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return 'год'
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'года'
  return 'лет'
}

function ruPluralMonths(n: number) {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return 'месяц'
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'месяца'
  return 'месяцев'
}

onMounted(() => {
  document.title = 'Mein Werdegang'
})
</script>
