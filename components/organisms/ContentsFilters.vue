<template>
  <FloatingPanel v-model="showFloatingPanel">
    <template #header>
      <strong>Filter options</strong>
    </template>

    <Form @submit="onSubmitFilters">
      <div v-if="!remove.includes('client')" class="mb-6">
        <ClientsAutocomplete
          v-model="$v.fieldClients.$model"
          :allow-creation="false"
          :fake-input="true"
          :should-update="false"
          :items="clients"
          :options="{
            fakeInput: true,
            isGrid: true
          }"
          :show-border="true"
          :placeholder="'Client'"
          :label="'Client'"
          @update:value="onUpdateFilterValue"
        />
      </div>

      <div v-if="!remove.includes('category')" class="mb-6">
        <CategoriesAutocomplete
          v-model="$v.fieldCategories.$model"
          :allow-creation="false"
          :items="categories"
          :fake-input="true"
          :should-update="false"
          :options="{
            fakeInput: true,
            isGrid: true
          }"
          :show-border="true"
          :placeholder="'Category'"
          :label="'Category'"
          @update:value="onUpdateFilterValue"
        />
      </div>

      <div v-if="!remove.includes('topic')" class="mb-6">
        <CategoriesAutocomplete
          v-model="$v.fieldTopics.$model"
          :allow-creation="false"
          :fake-input="true"
          :items="topics"
          :should-update="false"
          :options="{
            fakeInput: true,
            isGrid: true
          }"
          :show-border="true"
          :placeholder="'Topics'"
          :label="'Topics'"
          @update:value="onUpdateFilterValue"
        />
      </div>
      <div v-if="!remove.includes('tag')" class="mb-6">
        <TagsAutocomplete
          v-model="$v.fieldTags.$model"
          :allow-creation="false"
          :should-update="false"
          :all="false"
          :items="tags"
          :fake-input="true"
          :options="{
            fakeInput: true,
            isGrid: true
          }"
          :show-border="true"
          :placeholder="'Tags'"
          :label="'Tags'"
          @update:value="onUpdateFilterValue"
        />
      </div>

      <div v-if="showSortBy" class="mb-6">
        <DropdownField
          placeholder="Sort by"
          label="Sort by"
          @update:value="onFilterChange"
        >
          <option
            v-for="(column, i) in filterColumns"
            :key="i"
            :value="column.key"
          >
            {{ column.name }}
          </option>
        </DropdownField>
      </div>

      <div v-if="!remove.includes('amount')" class="flex mb-6 space-x-4">
        <NumberField
          v-model="$v.fieldFromAmount.$model"
          lazy
          empty-undefined
          :clearable="!!$v.fieldFromAmount.$model"
          class="flex-1"
          :label="'Min amount'"
          :error="getValidationMessage($v.fieldFromAmount)"
          @lazy:change="$v.fieldFromAmount.$model = $event"
        />

        <NumberField
          v-model="$v.fieldToAmount.$model"
          lazy
          empty-undefined
          :clearable="!!$v.fieldToAmount.$model"
          class="flex-1"
          :label="'Max amount'"
          :error="getValidationMessage($v.fieldToAmount)"
          @lazy:change="$v.fieldToAmount.$model = $event"
        />
      </div>

      <div v-if="!remove.includes('date')" class="flex mb-6 space-x-4">
        <DateField
          v-model="$v.fieldFromDate.$model"
          class="flex-1"
          :max="fieldToDate ? new Date(fieldToDate) : new Date()"
          :label="'Starting date'"
          :error="getValidationMessage($v.fieldFromDate)"
        />

        <DateField
          v-model="$v.fieldToDate.$model"
          class="flex-1"
          from="right"
          :min="fieldFromDate ? new Date(fieldFromDate) : null"
          :max="new Date()"
          :label="'Ending date'"
          :error="getValidationMessage($v.fieldToDate)"
        />
      </div>

      <div
        class="
          flex flex-col
          pt-2
          mb-6
          space-y-4 space-x-0
          md:flex-row md:space-y-0 md:space-x-4
        "
      >
        <Button
          appearance="secondary"
          type="reset"
          class="flex-1"
          @click.prevent="onClickResetButton"
        >
          {{ 'Clear' }}
        </Button>

        <Button type="submit" class="flex-1" @click.prevent="onClickSubmit">
          {{ 'Confirm' }}
        </Button>
      </div>
    </Form>
  </FloatingPanel>
</template>

<script>
import NumberField from '../atoms/NumberField.vue'
import { maxValue, minValue } from '~/plugins/validators'

export default {
  name: 'ContentsFilters',
  components: { NumberField },

  model: {
    prop: 'value',
    event: 'update:value'
  },

  props: {
    consents: {
      default: () => [],
      type: Array
    },

    currencies: {
      default: () => [],
      type: Array
    },

    uncategorized: {
      type: Boolean,
      default: false
    },

    value: {
      type: Boolean,
      default: false
    },

    bank: {
      type: Boolean,
      default: true
    },

    clients: {
      type: [Array, Object],
      default: null
    },

    categories: {
      type: [Array, Object],
      default: null
    },

    remove: {
      type: Array,
      default: () => []
    },

    topics: {
      type: [Array, Object],
      default: null
    },
    tags: {
      type: [Array, Object],
      default: null
    },

    showSortBy: {
      type: Boolean,
      default: true
    },

    activeConsent: {
      type: Object,
      default: null
    },

    filterColumns: {
      type: Array,
      default: () => []
    }
  },

  emits: ['update:value', 'close-panel'],

  data: () => ({
    sortBy: '',
    fieldTopics: null,
    fieldCategories: null,
    fieldTags: null,
    fieldClients: '',
    // fieldCurrencies: null,
    fieldFromAmount: null,
    fieldToAmount: null,
    fieldFromDate: null,
    fieldToDate: null,
    filterKeys: [
      'fieldTopics',
      'fieldCategories',
      'fieldFromAmount',
      'fieldToAmount',
      'fieldFromDate',
      'fieldToDate',
      'fieldTags',
      'fieldClients'
    ]

    //   'fieldCurrencies',
  }),

  // apollo: {},

  validations() {
    return {
      fieldCategories: {},
      fieldTopics: {},
      fieldTags: {},
      fieldClients: {},
      fieldCurrencies: {},
      fieldFromAmount: {
        maxValue: maxValue(this.fieldToAmount ? this.fieldToAmount : Infinity)
      },
      fieldToAmount: {
        minValue: minValue(
          this.fieldFromAmount ? this.fieldFromAmount : -Infinity
        )
      },
      fieldFromDate: {},
      fieldToDate: {}
    }
  },

  computed: {
    showFloatingPanel: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('update:value', value)
      }
    },

    tabItems() {
      return [
        { text: 'All' },
        {
          text: 'Uncategorized',
          notifications: this.accounts.uncategorized,
          disabled: this.fieldCategories !== null
        }
      ]
    }
  },

  watch: {
    showFloatingPanel(show) {
      if (show) {
        // this.loadTransactionFilters()
      }
    }
  },

  methods: {
    onUpdateFilterValue() {
      //   this.$forceUpdate()
    },

    getModifiedData(data) {
      return {
        categories: !data.fieldCategories
          ? []
          : data.fieldCategories?.name
          ? [data.fieldCategories?.name]
          : data.fieldCategories
          ? [data.fieldCategories]
          : [],
        topics: data.fieldTopics ? [data.fieldTopics] : [],
        clients: !data.fieldClients
          ? []
          : data.fieldClients?.name
          ? [data.fieldClients?.name]
          : data.fieldClients
          ? [data.fieldClients]
          : [],
        tags: data.fieldTags ? [data.fieldTags] : [],
        // currencies: data.fieldCurrencies ? [data.fieldCurrencies] : [],
        fromAmount:
          isNaN(data.fieldFromAmount) ||
          data.fieldFromAmount === null ||
          data.fieldFromAmount === ''
            ? //   || (data.fieldCurrencies || []).length === 0
              null
            : Number(data.fieldFromAmount),
        toAmount:
          isNaN(data.fieldToAmount) ||
          data.fieldToAmount === null ||
          data.fieldToAmount === ''
            ? //   || (data.fieldCurrencies || []).length === 0
              null
            : Number(data.fieldToAmount),
        fromDate: data.fieldFromDate,
        toDate: data.fieldToDate,
        sortBy: this.sortBy ?? undefined
      }
    },

    saveTransactionFilters() {
      const data = this.filterKeys.reduce(
        (data, key) => ({
          ...data,
          [key]: key === '' || this.$v[key]?.$model
        }),
        {}
      )

      const input = this.getModifiedData(data)

      this.$emit('close-panel', input)
    },

    async onSubmitFilters() {
      if (await this.isValidationInvalid()) return

      this.saveTransactionFilters()

      this.showFloatingPanel = false
    },

    onFilterChange(e) {
      this.sortBy = e
    },

    onClickResetButton() {
      this.$v.$reset()

      this.filterKeys.forEach((key) => {
        this.$set(this, key, null)
      })
      const input = this.getModifiedData(this.filterKeys)
      this.$emit('close-panel', input)
      this.showFloatingPanel = false
    },

    async onClickSubmit() {
      const { uncategorized, ...query } = this.$route.query

      await this.$router.push({
        query
      })

      this.onSubmitFilters()
    }
  }
}
</script>
