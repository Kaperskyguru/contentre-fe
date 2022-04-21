<template>
  <div
    :id="`${uid}-container`"
    ref="container"
    v-click-outside="() => (showPicker = false)"
    class="grid relative grid-flow-row min-h-[2.0625rem] text-left md:z-10"
    :class="[$attrs.class, { 'has-focus': isFocused, 'is-disabled': disabled }]"
  >
    <div
      v-if="!!label"
      class="flex items-center"
      :class="[
        {
          'text-darksilver': !isFocused & !error,
          'text-red-500': !!error
        },
        labelClass
      ]"
    >
      <label :for="uid" class="shrink" @click="openPicker">
        {{ label }}
      </label>

      <Tooltip
        v-if="error"
        :label="error"
        :trigger="['hover', 'click', 'focus']"
        position="right"
      >
        <div
          tabindex="0"
          class="
            ml-1
            w-3
            h-3
            rounded-full
            outline-none
            ring-0
            focus:ring-2
            ring-red-500 ring-opacity-50 ring-offset-1
            transition-all
            cursor-help
          "
        >
          <IconAlertCircle
            width="12"
            height="12"
            class="object-contain w-3 h-3 fill-current"
            :aria-label="error"
          />
        </div>
      </Tooltip>
    </div>

    <div
      class="
        group
        flex
        overflow-hidden
        order-2
        items-center
        bg-white
        rounded
        border
        transition-all
      "
      :class="[
        containerClass,
        {
          'mt-1': !!label,
          'border-red-500': !disabled && !!error,
          'border-silver hover:bg-white hover:border-btn-green focus-within:border-btn-green focus-within:bg-white':
            !disabled && !error,
          'border-silver bg-warngray bg-opacity-10': !!disabled
        }
      ]"
    >
      <div
        class="
          flex flex-1
          items-center
          py-1
          pr-1
          pl-3
          min-w-0
          h-full
          min-h-[2.0625rem]
          text-black
          truncate
          border-none
          outline-none
          select-none
        "
        :class="[
          pickerClass,
          {
            'cursor-pointer': !disabled,
            'text-silver': placeholder && !localeDate
          }
        ]"
        @click="openPicker"
      >
        {{ placeholder && !localeDate ? placeholder : localeDate }}
      </div>

      <Tooltip
        v-if="localeDate && clearable && !disabled"
        :label="'Clear'"
        :trigger="['hover', 'focus']"
      >
        <button
          type="button"
          class="
            group
            flex
            relative
            flex-none
            justify-center
            items-center
            mx-1
            w-7
            h-[1.6875rem]
            rounded
            outline-none
            focus:outline-none focus:ring-2
          "
          @click.prevent="onClear('clear')"
        >
          <img
            src="~/assets/icons/close.svg"
            alt="Icon: Clear"
            width="12"
            height="12"
            class="
              object-contain
              absolute
              mt-px
              w-3
              h-3
              opacity-40
              group-hover:opacity-100
              transition-all
            "
          />
        </button>
      </Tooltip>

      <!-- Use Button from here -->
      <div
        v-else
        class="
          flex
          relative
          flex-none
          justify-center
          items-center
          mx-1
          w-7
          h-[1.6875rem]
          text-darksilver
        "
        :class="{ 'cursor-pointer group-hover:text-black': !disabled }"
        @click="openPicker"
      >
        <IconCalendar
          width="18"
          height="18"
          class="mt-px w-5 h-5 transition-colors fill-current"
        />
      </div>
    </div>

    <transition
      enter-active-class="transition-all duration-200 origin-top transition-gpu"
      leave-active-class="transition-all duration-100 origin-top transition-gpu"
      leave-to-class="opacity-0"
      enter-class="scale-y-0 opacity-0"
    >
      <div
        v-if="showPicker"
        ref="pickerElement"
        class="
          flex
          absolute
          z-10
          flex-col
          px-2
          pt-4
          pb-2
          space-y-3
          w-full
          max-w-5xl
          bg-white
          rounded
          border border-silver
          shadow-lg
        "
        :class="[label ? 'mt-16' : 'mt-10']"
      >
        <div
          v-if="!fullCalendar || changingMonthOrYear"
          class="inline-flex items-center mx-auto space-x-2"
        >
          <button
            :aria-label="'Previous year'"
            type="button"
            appearance="tertiary"
            size="small"
            @click.prevent="year -= 1"
          >
            <IconArrowDown class="-ml-0.5 w-3 h-3 rotate-90" />
          </button>

          <span class="text-sm">{{ year }}</span>

          <button
            :aria-label="'Next year'"
            type="button"
            appearance="tertiary"
            size="small"
            @click.prevent="year += 1"
          >
            <IconArrowDown class="ml-0.5 w-3 h-3 -rotate-90" />
          </button>
        </div>

        <div
          v-if="!fullCalendar || changingMonthOrYear"
          class="grid grid-cols-4 gap-px"
        >
          <button
            v-for="(monthName, index) in monthsNameList"
            :key="monthName"
            type="button"
            appearance="secondary"
            class="px-1 h-10 text-xs border-none"
            :active="isSelectedMonth(index)"
            :disabled="disabledMonth[index]"
            @click.prevent="!disabledMonth[index] ? selectDate(index) : null"
          >
            {{ monthName }}
          </button>
        </div>

        <div
          v-if="fullCalendar && !changingMonthOrYear"
          class="inline-flex items-center mx-auto space-x-2"
        >
          <button
            :aria-label="'Previous year'"
            type="button"
            appearance="tertiary"
            size="small"
            @click.prevent="handleMonthChange(`PREV`)"
          >
            <IconArrowDown class="-ml-0.5 w-3 h-3 rotate-90" />
          </button>

          <button
            type="button"
            appearance="secondary"
            size="large"
            @click.prevent="changingMonthOrYear = true"
          >
            <span class="text-sm">{{
              `${monthsNameList[month]} ${year}`
            }}</span>
          </button>

          <button
            :aria-label="'Next year'"
            type="button"
            appearance="tertiary"
            size="small"
            @click.prevent="handleMonthChange(`NEXT`)"
          >
            <IconArrowDown class="ml-0.5 w-3 h-3 -rotate-90" />
          </button>
        </div>

        <div
          v-if="fullCalendar && !changingMonthOrYear"
          class="grid grid-cols-7"
        >
          <button
            v-for="(dateObj, index) in daysList"
            :key="index"
            type="button"
            size="large"
            appearance="secondary"
            class="px-1 h-10 text-black border-none"
            :class="[
              {
                'opacity-50': !dateObj.currentMonth,
                'font-bold': isSelectedDate(dateObj.day)
              }
            ]"
            :active="isSelectedDate(dateObj.day)"
            :disabled="
              max ? new Date(year, dateObj.month, dateObj.day) >= max : false
            "
            @click.prevent="!disabledMonth[index] ? selectDate(dateObj) : null"
          >
            {{ dateObj.day }}
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside'
// import Button from '~/components/atoms/Button.vue'
import Tooltip from '~/components/atoms/Tooltip.vue'

export default {
  name: 'DateField',

  directives: {
    clickOutside: vClickOutside.directive
  },

  components: {
    // Button,
    Tooltip,
    IconAlertCircle: () => import('~/assets/icons/alert-circle.svg?inline'),
    IconArrowDown: () => import('~/assets/icons/arrow-down.svg?inline'),
    IconCalendar: () => import('~/assets/icons/calendar.svg?inline')
  },

  inheritAttrs: false,

  model: {
    prop: 'modelValue',
    event: 'update:modelValue'
  },

  props: {
    containerClass: {
      default: '',
      type: String
    },

    pickerClass: {
      default: '',
      type: String
    },

    disabled: {
      default: false,
      type: Boolean
    },

    error: {
      default: null,
      type: [String, Boolean]
    },

    id: {
      default: '',
      type: String
    },

    label: {
      default: '',
      type: String
    },

    labelClass: {
      default: '',
      type: String
    },

    lastDay: {
      default: false,
      type: Boolean
    },

    max: {
      default: null,
      type: Date
    },

    min: {
      default: null,
      type: Date
    },

    modelValue: {
      default: '',
      type: String
    },

    placeholder: {
      default: '',
      type: String
    },

    clearable: {
      default: true,
      type: Boolean
    },

    dateFormat: {
      default: 'monthYearLong',
      type: String
    },

    fullCalendar: {
      default: false,
      type: Boolean
    },

    ignoreTimezone: {
      default: true,
      type: Boolean
    }
  },

  emits: ['update:modelValue'],

  data: () => ({
    pickerElement: null,
    isFocused: false,
    showPicker: false,
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    day: new Date().getDate(),
    changingMonthOrYear: false
  }),

  computed: {
    uid() {
      return this.$utils.uidGenerator(this.id)
    },

    monthsNameList() {
      const date = new Date()
      date.setDate(1)
      return [...new Array(12)].map((_element, index) => {
        date.setMonth(index)
        return this.$d(date, 'monthShort')
      })
    },

    daysList() {
      const firstDayCurrentMonth = new Date(this.year, this.month, 1)
      const lastDayCurrentMonth = new Date(this.year, this.month + 1, 0)

      const amountOfDaysCurrentMonth = lastDayCurrentMonth.getDate()
      const amountOfDaysPreviousMonth = new Date(
        this.year,
        this.month,
        0
      ).getDate()

      const lastDaysPreviousMonth = [
        ...new Array(firstDayCurrentMonth.getDay())
      ]
        .map((_element, index) => {
          return {
            day: amountOfDaysPreviousMonth - index,
            month: this.month - 1,
            currentMonth: false
          }
        })
        .reverse()

      const amountOfDaysAfterCurrentMonth = 6 - lastDayCurrentMonth.getDay()

      const firstDaysNextMonth = [
        ...new Array(amountOfDaysAfterCurrentMonth)
      ].map((_element, index) => {
        return { day: index + 1, month: this.month + 1, currentMonth: false }
      })

      const currentMonthDays = [...new Array(amountOfDaysCurrentMonth)].map(
        (_element, index) => {
          return { day: index + 1, month: this.month, currentMonth: true }
        }
      )

      return [
        ...lastDaysPreviousMonth,
        ...currentMonthDays,
        ...firstDaysNextMonth
      ]
    },

    localeDate() {
      if (this.modelValue) {
        const date = new Date(this.modelValue)
        date.setMinutes(date.getMinutes() + date.getTimezoneOffset())
        return this.$d(date, !this.fullCalendar ? this.dateFormat : 'dateShort')
      }
      return ''
    },

    disabledMonth() {
      const date = new Date(`${this.year}-${this.month + 1}-01T00:00:00`)
      date.setDate(1)
      return this.monthsNameList.map((_element, index) => {
        date.setMonth(index)
        return this.isDisabledMonth(date)
      })
    }
  },

  methods: {
    selectDate(value) {
      let date
      if (!this.fullCalendar || this.changingMonthOrYear) {
        date = this.lastDay
          ? new Date(this.year, value + 1, 0)
          : new Date(this.year, value, 1)

        if (this.changingMonthOrYear) this.month = value
      } else {
        date = new Date(this.year, value.month, value.day)
      }

      if (this.ignoreTimezone) {
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
      }

      this.showPicker = this.changingMonthOrYear
      if (this.fullCalendar && this.changingMonthOrYear) {
        this.changingMonthOrYear = false
        return
      }
      this.changingMonthOrYear = false
      this.$emit('update:modelValue', date.toISOString())
    },

    handleMonthChange(operation) {
      if (operation === 'PREV') {
        if (this.month === 0) {
          this.month = 11
          this.year -= 1
        } else {
          this.month -= 1
        }
      } else if (operation === 'NEXT') {
        if (this.month === 11) {
          this.month = 0
          this.year += 1
        } else {
          this.month += 1
        }
      }
    },

    async openPicker() {
      if (this.disabled) return

      if (this.modelValue) {
        const date = new Date(this.modelValue)
        this.year = date.getFullYear()
        this.month = date.getMonth()
      }

      this.showPicker = true

      await this.$nextTick()
      this.isFocused = true
    },

    isSelectedMonth(index) {
      if (index !== this.month) return
      const date = new Date(this.modelValue)
      return date.getFullYear() === this.year
    },

    isSelectedDate(day) {
      if (!this.modelValue) return
      return (
        new Date(this.year, this.month, day).toISOString() ===
        new Date(this.modelValue).toISOString()
      )
    },

    isDisabledMonth(date) {
      if (this.min !== null && this.max !== null) {
        return (
          this.min.getTime() > date.getTime() ||
          this.max.getTime() < date.getTime()
        )
      }

      if (this.min !== null) {
        return this.min.getTime() > date.getTime()
      }

      if (this.max !== null) {
        return this.max.getTime() < date.getTime()
      }
    },

    onClear() {
      this.showPicker = false
      this.$emit('update:modelValue', null)
    }
  }
}
</script>