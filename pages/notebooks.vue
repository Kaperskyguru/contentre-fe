<template>
  <section class="px-3 h-full md:px-12">
    <div class="flex justify-between items-center py-4">
      <PageTitle>Notebooks</PageTitle>
    </div>

    <section
      class="
        flex flex-col
        justify-between
        mb-6
        space-y-6 space-x-0
        md:flex-row md:space-y-0 md:space-x-6
      "
    >
      <div>
        <ContentFilter :filter-columns="columns" @filters="onFilters" />
      </div>

      <!-- <div class="basis-4/5">
        <SearchField
          id="search"
          v-model="filters.terms"
          placeholder="Search by name..."
        />
      </div> -->

      <div class="flex space-x-0 md:space-x-3">
        <Button appearance="secondary" @click.prevent="onSwitchNotebook"
          >Switch Notebook</Button
        >
        <Button @click.prevent="onAddNotebook">Create Notebook</Button>
      </div>
    </section>

    <section class="mt-5">
      <div
        class="grid grid-cols-1 gap-4 px-5 w-full h-60 md:grid-cols-12 lg:px-0"
      >
        <div
          class="
            col-span-12
            p-4
            mb-5
            bg-[#286963]
            rounded-lg
            lg:col-span-4 lg:mr-6
          "
        >
          <div class="flex justify-between items-center">
            <p class="text-sm font-semibold text-white">SCRATCH PAD</p>
            <a href="#">
              <img
                src="https://raw.githubusercontent.com/Succyvibe/example_portfolio/main/img/dots.png"
                alt=""
                class="w-[20px]"
            /></a>
          </div>
          <textarea
            id=""
            name=""
            cols="30"
            rows="10"
            class="mt-2 w-full text-sm bg-transparent outline-none"
            placeholder="Start writing"
          ></textarea>
        </div>
        <div
          class="col-span-12 p-4 bg-white rounded-lg shadow-lg lg:col-span-12"
        >
          <div class="flex justify-between">
            <div>
              <div class="mb-5">
                <a href="#">
                  <p class="text-[14px] font-semibold">
                    NOTES <span><i class="bx bx-chevron-right"></i></span>
                  </p>
                </a>
              </div>
              <div>
                <ul class="flex text-sm">
                  <li>
                    <a
                      href=""
                      class="text-[#102A27] border-b-2 border-[#102A27]"
                      >Recent</a
                    >
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <div class="flex items-center">
                <a href="#" class="flex items-center">
                  <i class="text-2xl bx bxs-edit"></i>
                </a>
                <a href="#" class="flex items-center ml-4">
                  <img
                    src="https://raw.githubusercontent.com/Succyvibe/example_portfolio/main/img/dots.png"
                    alt=""
                    class="mt-1 w-[20px]"
                  />
                </a>
              </div>
            </div>
          </div>

          <div class="overflow-hidden w-full">
            <div class="flex overflow-x-auto gap-1 mt-4 w-full">
              <div
                v-for="(item, index) in notes.items"
                :key="index"
                class="
                  flex flex-col
                  justify-between
                  p-3
                  min-w-[10.72rem]
                  h-[16.125rem]
                  bg-white
                  rounded-lg
                  border-2
                "
              >
                <div>
                  <h3 class="text-lg font-bold">{{ item.title }}</h3>

                  <article class="mt-3 text-sm">
                    {{ item.content }}
                  </article>
                </div>
                <div class="text-sm">
                  {{ $d(item.updatedA, 'monthDayShortLong') }}
                </div>
              </div>

              <div
                class="
                  flex
                  justify-center
                  items-center
                  min-w-[10.72rem]
                  h-[16.125rem]
                  bg-gray-100
                  rounded-lg
                  border-2
                "
              >
                <a href="">
                  <div
                    class="
                      flex flex-col
                      justify-center
                      items-center
                      w-full
                      h-full
                    "
                  >
                    <div
                      class="
                        flex
                        justify-center
                        items-center
                        w-[3.125rem]
                        h-[3.125rem]
                        bg-[#286963]
                        rounded-full
                      "
                    >
                      <i class="text-2xl text-white bx bxs-book-add"></i>
                    </div>
                    <p class="text-[14px] font-semibold">Create new note</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <NotebookEdit v-model="isConfirmModalVisible" />
    <SwitchNotebook v-model="isSwitchModalVisible" />
  </section>
</template>

<script>
import { GET_NOTES } from '~/graphql'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Notebooks',
  layout: 'Dashboard',

  data: () => ({
    searchedTerm: '',
    filters: {},
    isConfirmModalVisible: false,
    isSwitchModalVisible: false,
    columns: [
      { name: 'Name', key: 'name' },
      { name: 'Payment', key: 'payment' },
      { name: 'Total Contents', key: 'totalContents' },
      { name: 'Created', key: 'createdAt' },
      { name: 'Amount', key: 'amount' },
      { name: 'Status', key: 'status' }
    ],
    notes: {
      items: [],
      total: 0
    }
  }),

  head() {
    return {
      title: 'Notebooks'
    }
  },

  methods: {
    onFilters(v) {
      this.filters = {
        ...this.filters,
        ...v
      }
    },
    onAddNotebook() {
      this.isConfirmModalVisible = !this.isConfirmModalVisible
    },
    onSwitchNotebook() {
      this.isSwitchModalVisible = !this.isSwitchModalVisible
    }
  },

  apollo: {
    notes: {
      query: GET_NOTES,
      fetchPolicy: 'cache-and-network',
      update(data) {
        return { items: data.getNotes.notes, total: data.getNotes.meta.total }
      },
      variables() {
        return {
          size: 30,
          skip: 0,
          filters: { ...this.filters }
        }
      }
    }
  }
}
</script>

<style>
</style>