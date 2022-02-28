
<template>
  <div
    ref="infiniteScrollContainer"
    v-infinite-scroll="onLoadMoreData"
    class="overflow-auto w-full h-full max-h-full text-sm"
    infinite-scroll-distance="300"
    :infinite-scroll-disabled="disableInfiniteScroll"
  >
    <table
      class="w-full min-w-full table-fixed"
      :class="{ hidden: noDataToShow }"
    >
      <thead
        v-if="checked && isMobileLayout && showHeader"
        class="text-left bg-white"
        :class="{
          'hidden lg:table-header-group': !isMobileLayout,
          'table-header-group': isMobileLayout
        }"
      >
        <tr class="bg-white">
          <th
            v-if="checked && !hideCheckAll"
            class="p-0 m-0 w-20 text-base font-medium tracking-wider"
            :class="[
              {
                'sticky top-0': stickyHeader,
                'lg:h-12': !isMobileLayout,
                'h-12': isMobileLayout
              }
            ]"
          >
            <div class="py-4 pr-4 bg-white border-b border-gray-200">
              <CheckField
                :label="'Check all'"
                :disabled="
                  allowedItems.length === 0 ||
                  groupedItems.length !== allowedItems.length
                "
                :checked="
                  checkModel.length === allowedItems.length &&
                  !loading &&
                  allowedItems.length !== 0
                "
                @changed="
                  checkModel.length === allowedItems.length
                    ? (checkModel = [])
                    : (checkModel = allowedItems.map((elem) => elem.id))
                "
              >
                <strong> {{ 'Check all' }} ({{ groupedItems.length }}) </strong>
              </CheckField>
            </div>
          </th>
        </tr>
      </thead>
      <thead
        class="text-left bg-white"
        :class="{
          'hidden lg:table-header-group': isMobileLayout,
          'table-header-group': !isMobileLayout
        }"
      >
        <tr class="bg-white">
          <th
            v-if="checked"
            class="p-0 m-0 w-20"
            :class="[
              {
                'sticky top-0': stickyHeader,
                'lg:h-12': isMobileLayout,
                'h-12': !isMobileLayout
              }
            ]"
          >
            <div
              class="py-3.5 pr-4 text-center bg-white border-b border-gray-200"
            >
              <CheckField
                :class="[hideCheckAll ? '!opacity-0' : '']"
                :checked="
                  checkModel.length === allowedItems.length &&
                  !loading &&
                  allowedItems.length !== 0
                "
                :disabled="
                  allowedItems.length === 0 ||
                  groupedItems.length !== allowedItems.length ||
                  hideCheckAll
                "
                @changed="
                  checkModel.length === allowedItems.length
                    ? (checkModel = [])
                    : (checkModel = allowedItems.map((elem) => elem.id))
                "
              />
            </div>
          </th>
          <th
            v-for="(column, columnIndex) of columnsFiltered"
            :key="`th-${columnIndex}`"
            class="pb-0.5 text-base font-medium tracking-wider"
            :class="[
              {
                'sticky top-0': stickyHeader,
                'lg:h-12': isMobileLayout,
                'h-12': !isMobileLayout
              },
              $utils.checkCallback(column.titleClass)
            ]"
            :style="$utils.checkCallback(column.titleStyle)"
          >
            <div
              class="py-4 bg-white border-b border-gray-200"
              :class="{
                'pr-4': columnIndex < columns.length - 1,
                'py-3 px-6': columnIndex === 0 && !checked
              }"
            >
              <slot
                :column="column"
                :title="column[columnTitleKey]"
                :name="`title-${column[columnDataKey]}`"
              >
                {{ column[columnTitleKey] }}
              </slot>
            </div>
          </th>
        </tr>
      </thead>

      <transition-group
        tag="tbody"
        enter-active-class="transition-all duration-300 ease-out origin-top transform-gpu"
        leave-active-class="transition-all duration-200 ease-in origin-top transform-gpu"
        enter-class="scale-y-0 opacity-0"
        leave-to-class="scale-y-0 opacity-0"
        class="border-t transition-all"
        :class="{
          'lg:border-none': isMobileLayout,
          'border-none': !isMobileLayout
        }"
      >
        <template v-for="(item, itemIndex) of groupedItems">
          <tr
            v-if="
              !item[groupBy] ||
              (item[groupBy] && openedGroupItemIds.includes(item[groupBy]))
            "
            :key="item[primaryKey] || itemIndex"
            :tabindex="!item.disabled && isItemClickable(item) ? 0 : undefined"
            :class="bodyRowClasses(item)"
            @keypress.enter="onItemClick(item, itemIndex)"
            @click="onItemClick(item, itemIndex)"
          >
            <td
              v-if="isMobileLayout ? checked && item : checked"
              class="text-center"
              :class="dataCellClasses({})"
              @click.stop
            >
              <strong class="text-black lg:hidden">
                {{ 'Select' }}
              </strong>
              <CheckField
                v-if="item.id"
                v-model="checkModel"
                :value="item.id"
                :disabled="disabled"
              />
            </td>
            <td
              v-for="(column, columnIndex) of columnsFiltered"
              :key="`td-${itemIndex}-${columnIndex}`"
              :class="dataCellClasses({ column, columnIndex, item })"
              :style="$utils.checkCallback(column.dataStyle, [item])"
            >
              <div
                :class="{
                  'pl-6.5':
                    item[groupBy] && columnIndex === 0 && !isMobileLayout,
                  'flex items-center justify-between lg:justify-start w-full':
                    columnIndex === 0 || isMobileLayout
                }"
              >
                <span>
                  <Button
                    v-if="item.children && columnIndex === 0"
                    size="small"
                    class="mr-1"
                    appearance="tertiary"
                    @click.prevent.stop="onClickToggleItemChildren(item)"
                  >
                    <span class="flex justify-center items-center w-5 h-5">
                      <IconArrowDown
                        width="12"
                        fill="#000"
                        class="transition-all"
                        :class="{
                          '-rotate-90': !openedGroupItemIds.includes(
                            item[primaryKey]
                          )
                        }"
                      />
                    </span>
                  </Button>

                  <strong class="text-black lg:hidden">
                    <slot
                      :column="column"
                      :title="column[columnTitleKey]"
                      :name="`title-${column[columnDataKey]}`"
                    >
                      {{ column[columnTitleKey] }}
                    </slot>
                  </strong>
                </span>

                <slot
                  :item="item"
                  :column="column"
                  :value="item[column[columnDataKey]]"
                  :name="`data-${column[columnDataKey]}`"
                  :displayed-value="displayCellValue(item, column)"
                >
                  <template
                    v-if="$utils.checkCallback(column.component, [item])"
                  >
                    <component
                      :is="$utils.checkCallback(column.component, [item])"
                      :item="item"
                      :column="column"
                      :item-index="itemIndex"
                      :value="item[column[columnDataKey]]"
                      :displayed-value="displayCellValue(item, column)"
                      :options="
                        $utils.checkCallback(column.componentOptions, [item]) ||
                        {}
                      "
                    />
                  </template>

                  <span v-else-if="isMobileLayout" class="block lg:hidden">
                    {{ displayCellValue(item, column) }}
                  </span>

                  <template v-else>
                    <span
                      class="
                        h-full
                        leading-normal
                        lg:overflow-hidden lg:text-ellipsis lg:whitespace-nowrap
                      "
                      >{{ displayCellValue(item, column) }}</span
                    >
                  </template>
                </slot>
              </div>
            </td>
          </tr>
        </template>
      </transition-group>

      <tbody v-if="loading">
        <tr
          v-for="(blurItem, blurItemIndex) in loadingPlaceholderItems"
          :key="blurItemIndex"
          :class="bodyRowClasses({})"
        >
          <td v-if="checked" :class="dataCellClasses({})">
            <strong class="lg:hidden">
              {{ 'Select Content' }}
            </strong>

            <LoadingPlaceholder class="inline-block -my-1 w-10 h-7" />
          </td>
          <td
            v-for="(column, columnIndex) of columnsFiltered"
            :key="`td-${blurItemIndex}-${columnIndex}`"
            :class="dataCellClasses({ column, columnIndex, item: {} })"
            :style="$utils.checkCallback(column.dataStyle, [{}])"
          >
            <strong class="lg:hidden">
              {{ column[columnTitleKey] }}
            </strong>

            <LoadingPlaceholder
              class="inline-block -my-1 h-7"
              :width="`${$utils.numberGenerateBetween(40, 80)}%`"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="noDataToShow" class="flex justify-center items-center h-full">
      <slot name="empty">
        <div class="text-xl text-center">
          <NoData />

          <Button
            v-if="filterApplied"
            class="mt-4"
            appearance="secondary"
            size="small"
            @click="$emit('clear')"
          >
            {{ 'Clear applied filters' }}
          </Button>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
/* eslint-disable vue/no-useless-template-attributes */
import infiniteScroll from 'vue-infinite-scroll'
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'DataGrid',
  directives: {
    infiniteScroll
  },

  components: {
    //   DataGridCellActions: () =>
    //     import('~/components/atoms/DataGridCellActions.vue'),
    //   DataGridCellAvatar: () =>
    //     import('~/components/atoms/DataGridCellAvatar.vue'),
    //   DataGridCellBadge: () => import('~/components/atoms/DataGridCellBadge.vue'),
    DataGridCellBlur: () => import('~/components/atoms/DataGridCellBlur.vue'),
    //   DataGridCellButton: () =>
    //     import('~/components/atoms/DataGridCellButton.vue'),
    //   DataGridCellCheckField: () =>
    //     import('~/components/atoms/DataGridCellCheckField.vue'),
    //   DataGridCellChip: () => import('~/components/atoms/DataGridCellChip.vue'),
    //   DataGridCellIBAN: () => import('~/components/atoms/DataGridCellIBAN.vue'),
    DataGridCellIcon: () => import('~/components/atoms/DataGridCellIcon.vue'),
    // DataGridCellMoney: () => import('~/components/atoms/DataGridCellMoney.vue'),
    LoadingPlaceholder: () =>
      import('~/components/atoms/LoadingPlaceholder.vue')
    // NoData: () => import('~/components/atoms/NoData.vue'),
    // IconFolderOpen: () => import('~/assets/icons/folder-open.svg?inline'),
    // IconArrowDown: () => import('~/assets/icons/arrow-down.svg?inline')
  },

  props: {
    items: {
      default: () => [],
      type: Array
    },

    total: {
      default: 0,
      type: Number
    },

    columns: {
      default: () => [],
      required: true,
      type: Array
    },

    showHeader: {
      default: true,
      type: Boolean
    },

    columnTitleKey: {
      default: 'title',
      type: String
    },

    columnDataKey: {
      default: 'key',
      type: String
    },

    primaryKey: {
      default: 'id',
      type: String
    },

    stickyHeader: {
      default: true,
      type: Boolean
    },

    disabled: {
      default: false,
      type: Boolean
    },

    itemClickable: {
      default: false,
      type: [Boolean, Function]
    },

    itemsPerPage: {
      default: 30,
      type: Number
    },

    loading: {
      default: false,
      type: Boolean
    },

    groupBy: {
      default: null,
      type: String
    },

    filterApplied: {
      default: false,
      type: Boolean
    },
    checked: {
      type: Array,
      default: () => null
    },
    hideCheckAll: {
      type: Boolean,
      default: false
    }
  },

  emits: ['ready', 'item-click', 'load-more-data', 'clear', 'update:checked'],

  data: () => ({
    isMobileLayout: false,
    isMobileLayoutRef: null,
    openedGroupItemIds: []
  }),

  computed: {
    allowedItems() {
      return this.groupedItems.filter((elem) => elem.id)
    },
    checkModel: {
      get() {
        return this.checked
      },
      set(value) {
        this.$emit('update:checked', value)
      }
    },
    columnsFiltered() {
      return this.$utils.getVisibleItems(this.columns)
    },

    disableInfiniteScroll() {
      return this.disabled || this.loading || this.items.length >= this.total
    },

    noDataToShow() {
      return this.items.length === 0 && !this.loading
    },

    loadingPlaceholderItems() {
      return new Array(this.itemsPerPage)
    },

    uniqueItems() {
      return [
        ...new Map(
          this.items.map((item, itemIndex) => [
            item[this.primaryKey] ?? itemIndex,
            item
          ])
        ).values()
      ]
    },

    groupedItems() {
      if (this.groupBy) {
        const items = this.uniqueItems.reduce((items, item) => {
          const groupByKey = item[this.groupBy]
          const itemId = item[this.primaryKey]

          if (groupByKey) {
            items = {
              ...items,
              [groupByKey]: {
                ...items[groupByKey],
                children: [...(items[groupByKey]?.children ?? []), item]
              }
            }
          } else {
            items = {
              ...items,
              [itemId]: {
                ...items[itemId],
                item,
                children: item.children ?? undefined
              }
            }
          }

          return items
        }, {})

        const groupedItems = Object.values(items).reduce(
          (items, { item, children }) => {
            if (item) {
              items = [
                ...items,
                {
                  ...item,
                  children
                }
              ]
            }

            return [...items, ...(children ?? [])]
          },
          []
        )

        return groupedItems
      }

      return this.uniqueItems
    }
  },

  mounted() {
    this.$emit('ready', this)

    this.isMobileLayoutRef = this.checkIsMobileLayout()
    this.isMobileLayoutRef()
    // eslint-disable-next-line nuxt/no-env-in-hooks
    if (process.browser) {
      window.addEventListener('resize', this.isMobileLayoutRef)
    }
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.isMobileLayoutRef)
  },

  methods: {
    isItemClickable(item) {
      return this.$utils.checkCallback(this.itemClickable, [item])
    },

    displayCellValue(item, column) {
      let value = null
      if (this.$utils.isFunction(column.formatter)) {
        value = column.formatter(item)
      } else if (column[this.columnDataKey]) {
        value = this.$utils.objectGetNestedKey(item, column[this.columnDataKey])
      }

      return value
    },

    onLoadMoreData() {
      if (
        !this.loading &&
        this.items.length !== 0 &&
        this.items.length !== this.total
      ) {
        this.$emit('load-more-data', {
          size: this.itemsPerPage,
          skip: this.items.length
        })
      }
    },

    checkIsMobileLayout() {
      return this.$utils.debounce(() => {
        this.isMobileLayout = this.$utils.getWindowWidth() < 1024
      }, 100)
    },

    onItemClick(item, itemIndex) {
      if (item.disabled) return
      if (!this.$utils.checkCallback(this.itemClickable, [item, itemIndex])) {
        return
      }

      this.$emit('item-click', item)
    },

    bodyRowClasses(item) {
      return [
        'border-b border-silver transition-all',
        {
          'lg:border-none': this.isMobileLayout,
          'border-none': !this.isMobileLayout,
          'cursor-pointer outline-none hover:bg-snow focus-visible:rounded focus-visible:ring-inset focus-visible:ring-2':
            this.isItemClickable(item),
          'opacity-50 !cursor-default': item.disabled
        }
      ]
    },

    dataCellClasses({ column = {}, columnIndex = 0, item = {} }) {
      return [
        'justify-between py-3 leading-none border-b border-whitesmoke',
        {
          'flex items-center space-x-3 lg:items-baseline lg:table-cell lg:space-x-0 lg:h-12':
            this.isMobileLayout,
          'items-baseline table-cell space-x-0 h-12': !this.isMobileLayout,
          'text-right lg:text-left lg:pr-4':
            this.isMobileLayout && columnIndex < this.columns.length - 1,
          'text-left pr-4':
            !this.isMobileLayout && columnIndex < this.columns.length - 1,
          'border-silver text-right lg:border-whitesmoke':
            this.isMobileLayout && columnIndex === this.columns.length - 1,
          'border-whitesmoke':
            !this.isMobileLayout && columnIndex === this.columns.length - 1,
          'py-3 px-6': columnIndex === 0 && !this.checked
        },
        this.$utils.checkCallback(column.dataClass, [item])
      ]
    },

    onClickToggleItemChildren(item) {
      const itemId = item[this.primaryKey]

      if (this.openedGroupItemIds.includes(itemId)) {
        this.$set(
          this,
          'openedGroupItemIds',
          this.openedGroupItemIds.filter((id) => id !== itemId)
        )
      } else {
        this.$set(this, 'openedGroupItemIds', [
          ...this.openedGroupItemIds,
          itemId
        ])
      }
    }
  }
})
</script>

<style>
</style>