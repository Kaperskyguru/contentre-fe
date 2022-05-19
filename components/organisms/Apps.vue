<template>
  <span>
    <div
      class="
        text-sm
        font-medium
        text-center text-gray-500
        dark:text-gray-400
        border-b border-gray-200
        dark:border-gray-700
      "
    >
      <ul id="tabs" class="flex flex-wrap -mb-px">
        <li class="mr-2">
          <a
            id="profaily-tab"
            href="#profaily"
            class="
              inline-block
              p-4
              hover:text-gray-600
              dark:hover:text-gray-300
              rounded-t-lg
              border-b-2 border-transparent
              hover:border-blue-500
            "
            data-tabs-target="#profaily"
            type="button"
            role="tab"
            aria-controls="profaily"
            aria-selected="false"
          >
            Profaily
          </a>
        </li>
        <li class="mr-2">
          <a
            id="medium-tab"
            href="#medium"
            class="
              inline-block
              p-4
              hover:text-gray-600
              dark:hover:text-gray-300
              rounded-t-lg
              border-b-2 border-transparent
              hover:border-blue-500
            "
            aria-current="page"
            data-tabs-target="#medium"
            type="button"
            role="tab"
            aria-controls="medium"
            aria-selected="false"
            >Medium</a
          >
        </li>
        <li class="mr-2">
          <a
            id="dev-tab"
            href="#dev"
            class="
              inline-block
              p-4
              hover:text-gray-600
              dark:hover:text-gray-300
              rounded-t-lg
              border-b-2 border-transparent
              hover:border-blue-500
            "
            data-tabs-target="#dev"
            type="button"
            role="tab"
            aria-controls="dev"
            aria-selected="false"
            >Dev.to</a
          >
        </li>
        <li class="mr-2">
          <a
            id="hashnode-tab"
            href="#hashnode"
            class="
              inline-block
              p-4
              hover:text-gray-600
              dark:hover:text-gray-300
              rounded-t-lg
              border-b-2 border-transparent
              hover:border-blue-500
            "
            data-tabs-target="#hashnode"
            type="button"
            role="tab"
            aria-controls="hashnode"
            aria-selected="false"
            >Hashnode</a
          >
        </li>
        <li>
          <a
            id="strapi-tab"
            href="#strapi"
            class="
              inline-block
              p-4
              hover:text-gray-600
              dark:hover:text-gray-300
              rounded-t-lg
              border-b-2 border-transparent
              hover:border-blue-500
            "
            data-tabs-target="#strapi"
            type="button"
            role="tab"
            aria-controls="strapi"
            aria-selected="false"
            >Strapi</a
          >
        </li>

        <li>
          <a
            id="google_docs-tab"
            href="#google_docs"
            class="
              inline-block
              p-4
              hover:text-gray-600
              dark:hover:text-gray-300
              rounded-t-lg
              border-b-2 border-transparent
              hover:border-blue-500
            "
            data-tabs-target="#google_docs"
            type="button"
            role="tab"
            aria-controls="google_docs"
            aria-selected="false"
            >Google Docs</a
          >
        </li>

        <li>
          <a
            id="notion-tab"
            href="#notion"
            class="
              inline-block
              p-4
              hover:text-gray-600
              dark:hover:text-gray-300
              rounded-t-lg
              border-b-2 border-transparent
              hover:border-blue-500
            "
            data-tabs-target="#notion"
            type="button"
            role="tab"
            aria-controls="notion"
            aria-selected="false"
            >Notion</a
          >
        </li>

        <li>
          <a
            id="notes-tab"
            href="#notes"
            class="
              inline-block
              p-4
              hover:text-gray-600
              dark:hover:text-gray-300
              rounded-t-lg
              border-b-2 border-transparent
              hover:border-blue-500
            "
            data-tabs-target="#notes"
            type="button"
            role="tab"
            aria-controls="notes"
            aria-selected="false"
            >Notes</a
          >
        </li>
        <li>
          <a
            id="calendar-tab"
            href="#calendar"
            class="
              inline-block
              p-4
              hover:text-gray-600
              dark:hover:text-gray-300
              rounded-t-lg
              border-b-2 border-transparent
              hover:border-blue-500
            "
            data-tabs-target="#calendar"
            type="button"
            role="tab"
            aria-controls="calendar"
            aria-selected="false"
            >Calendar</a
          >
        </li>

        <li>
          <a
            id="slack-tab"
            href="#slack"
            class="
              inline-block
              p-4
              hover:text-gray-600
              dark:hover:text-gray-300
              rounded-t-lg
              border-b-2 border-transparent
              hover:border-blue-500
            "
            data-tabs-target="#slack"
            type="button"
            role="tab"
            aria-controls="slack"
            aria-selected="false"
            >Slack</a
          >
        </li>

        <li>
          <a
            id="outvoice-tab"
            href="#outvoice"
            class="
              inline-block
              p-4
              hover:text-gray-600
              dark:hover:text-gray-300
              rounded-t-lg
              border-b-2 border-transparent
              hover:border-blue-500
            "
            data-tabs-target="#outvoice"
            type="button"
            role="tab"
            aria-controls="outvoice"
            aria-selected="false"
            >OutVoice</a
          >
        </li>
      </ul>
    </div>
    <div id="myTabContent">
      <div
        id="profaily"
        class="hidden p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
        role="tabpanel"
        aria-labelledby="profaily-tab"
      >
        <!-- <p class="text-sm text-gray-500 dark:text-gray-400">
          This is some placeholder content the
          <strong class="font-medium text-gray-800 dark:text-white"
            >Profile tab's associated content</strong
          >. Clicking another tab will toggle the visibility of this one for the
          next. The tab JavaScript swaps classes to control the content
          visibility and styling.
        </p> -->

        <div class="flex justify-start mt-4 sm:mt-8">
          <div class="mr-3">Share to:</div>
          <div
            class="
              flex flex-col
              justify-end
              items-start
              -mb-3
              text-gray-100
              md:flex-row md:flex-wrap
            "
          >
            <div class="mr-4">
              <CheckField id="medium" v-model="medium" class="text-gray-100"
                >Facebook</CheckField
              >
            </div>
            <div class="mr-4">
              <CheckField id="devto" v-model="devto" class="text-gray-100"
                >Twitter</CheckField
              >
            </div>
            <div class="mr-4">
              <CheckField id="hashnode" v-model="hashnode" class="text-gray-100"
                >Linkedin</CheckField
              >
            </div>
          </div>
        </div>
      </div>
      <div
        id="medium"
        class="hidden p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
        role="tabpanel"
        aria-labelledby="medium-tab"
      >
        <div class="mr-4">
          <div class="flex flex-row justify-start mb-3 space-x-2">
            <div class="mr-3">Actions</div>
            <div class="flex flex-row space-x-3">
              <CheckField
                v-model="medium_action"
                type="radio"
                value="Publish"
                class="text-gray-100"
                >Publish</CheckField
              >
              <CheckField
                v-model="medium_action"
                type="radio"
                value="Retrieve"
                class="text-gray-100"
                >Retrieve contents</CheckField
              >
            </div>
          </div>

          <div class="p-5 my-5 bg-white border border-btn-green">
            <div class="flex flex-col justify-start pb-5 mb-3 space-x-2">
              <div class="mr-3">Content Format</div>
              <div class="flex flex-col space-y-3">
                <CheckField
                  v-model="medium_content_format"
                  type="radio"
                  value="HTML"
                  class="text-gray-100"
                  >HTML</CheckField
                >
                <CheckField
                  v-model="medium_content_format"
                  type="radio"
                  value="MARKDOWN"
                  class="text-gray-100"
                  >MARKDOWN</CheckField
                >
              </div>
            </div>

            <div class="flex flex-row justify-start pb-5 mb-3 space-x-2">
              <div class="flex flex-col space-y-3">
                <TextField
                  id="medium_content_canonical_url"
                  v-model="medium_content_canonical_url"
                  class="text-gray-100"
                  label="Canonical URL"
                />
              </div>
            </div>

            <div class="flex flex-row justify-start pb-5 mb-3 space-x-2">
              <div class="flex flex-col space-y-3">
                <CheckField
                  id="medium_notify_followers"
                  v-model="medium_notifyFollowers"
                  class="text-gray-100"
                  >Notify Followers
                </CheckField>
              </div>
            </div>

            <div class="flex flex-row justify-start pb-5 mb-3 space-x-2">
              <div class="flex flex-col space-y-3">
                <DropdownField
                  v-model="medium_publish_status"
                  placeholder="Publish Status"
                  label="Publish Status"
                >
                  <option value="PUBLIC">PUBLIC</option>
                  <option value="DRAFT">DRAFT</option>
                  <option value="UNLISTED">UNLISTED</option>
                </DropdownField>
              </div>
            </div>
          </div>

          <div class="flex justify-end">
            <Button @click.prevent="addMedium">Add App</Button>
          </div>
        </div>
      </div>
      <div
        id="dev"
        class="hidden p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
        role="tabpanel"
        aria-labelledby="dev-tab"
      >
        <div class="mr-4">
          <div class="flex flex-col justify-start space-y-2">
            <div class="mr-3">Actions</div>
            <div class="flex flex-col space-y-3">
              <CheckField id="hashnode" v-model="hashnode" class="text-gray-100"
                >Publish</CheckField
              >
              <CheckField id="hashnode" v-model="hashnode" class="text-gray-100"
                >Retrieve contents</CheckField
              >
            </div>
          </div>
        </div>
      </div>
      <div
        id="hashnode"
        class="hidden p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
        role="tabpanel"
        aria-labelledby="hashnode-tab"
      >
        <div class="mr-4">
          <div class="flex flex-col justify-start space-y-2">
            <div class="mr-3">Actions</div>
            <div class="flex flex-col space-y-3">
              <CheckField id="hashnode" v-model="hashnode" class="text-gray-100"
                >Publish</CheckField
              >
              <CheckField id="hashnode" v-model="hashnode" class="text-gray-100"
                >Retrieve contents</CheckField
              >
            </div>
          </div>
        </div>
      </div>

      <div
        id="strapi"
        class="hidden p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
        role="tabpanel"
        aria-labelledby="strapi-tab"
      >
        <p class="text-sm text-gray-500 dark:text-gray-400">
          This is some placeholder content the
          <strong class="font-medium text-gray-800 dark:text-white"
            >Contacts tab's associated content</strong
          >. Clicking another tab will toggle the visibility of this one for the
          next. The tab JavaScript swaps classes to control the content
          visibility and styling.
        </p>
      </div>

      <div
        id="google_docs"
        class="hidden p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
        role="tabpanel"
        aria-labelledby="google_docs-tab"
      >
        <p class="text-sm text-gray-500 dark:text-gray-400">
          This is some placeholder content the
          <strong class="font-medium text-gray-800 dark:text-white"
            >Contacts tab's associated content</strong
          >. Clicking another tab will toggle the visibility of this one for the
          next. The tab JavaScript swaps classes to control the content
          visibility and styling.
        </p>
      </div>

      <div
        id="notion"
        class="hidden p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
        role="tabpanel"
        aria-labelledby="notion-tab"
      >
        <p class="text-sm text-gray-500 dark:text-gray-400">
          This is some placeholder content the
          <strong class="font-medium text-gray-800 dark:text-white"
            >Contacts tab's associated content</strong
          >. Clicking another tab will toggle the visibility of this one for the
          next. The tab JavaScript swaps classes to control the content
          visibility and styling.
        </p>
      </div>

      <div
        id="notes"
        class="hidden p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
        role="tabpanel"
        aria-labelledby="notes-tab"
      >
        <p class="text-sm text-gray-500 dark:text-gray-400">
          This is some placeholder content the
          <strong class="font-medium text-gray-800 dark:text-white"
            >Contacts tab's associated content</strong
          >. Clicking another tab will toggle the visibility of this one for the
          next. The tab JavaScript swaps classes to control the content
          visibility and styling.
        </p>
      </div>

      <div
        id="calendar"
        class="hidden p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
        role="tabpanel"
        aria-labelledby="calendar-tab"
      >
        <p class="text-sm text-gray-500 dark:text-gray-400">
          This is some placeholder content the
          <strong class="font-medium text-gray-800 dark:text-white"
            >Contacts tab's associated content</strong
          >. Clicking another tab will toggle the visibility of this one for the
          next. The tab JavaScript swaps classes to control the content
          visibility and styling.
        </p>
      </div>

      <div
        id="slack"
        class="hidden p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
        role="tabpanel"
        aria-labelledby="slack-tab"
      >
        <p class="text-sm text-gray-500 dark:text-gray-400">
          This is some placeholder content the
          <strong class="font-medium text-gray-800 dark:text-white"
            >Contacts tab's associated content</strong
          >. Clicking another tab will toggle the visibility of this one for the
          next. The tab JavaScript swaps classes to control the content
          visibility and styling.
        </p>
      </div>

      <div
        id="outvoice"
        class="hidden p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
        role="tabpanel"
        aria-labelledby="outvoice-tab"
      >
        <p class="text-sm text-gray-500 dark:text-gray-400">
          This is some placeholder content the
          <strong class="font-medium text-gray-800 dark:text-white"
            >Contacts tab's associated content</strong
          >. Clicking another tab will toggle the visibility of this one for the
          next. The tab JavaScript swaps classes to control the content
          visibility and styling.
        </p>
      </div>
    </div>
  </span>
</template>

<script>
export default {
  name: 'AppS',

  data: () => ({
    medium_action: 'Publish',
    medium_notifyFollowers: false,
    medium_content_canonical_url: '',
    medium_content_format: 'HTML',
    medium_publish_status: '',
    medium_content_format_markdown: false,

    hashnode: false,
    devto: false,
    medium: false
  }),

  mounted() {
    this.$nextTick(() => {
      this.tabToggle()
    })
  },

  methods: {
    addMedium() {
      const medium = {
        // action: this.medium_action,
        contentFormat: this.medium_content_format,
        notifyFollowers: this.medium_notifyFollowers,
        canonicalUrl: this.medium_content_canonical_url,
        publishedStatus: this.medium_publish_status
      }
      this.$emit('add', { name: 'medium', data: medium })
    },
    onFilterChange() {},
    tabToggle() {
      const tabsContainer = document.querySelector('#tabs')

      const tabTogglers = tabsContainer.querySelectorAll('a')

      tabTogglers.forEach(function (toggler) {
        toggler.addEventListener('click', function (e) {
          e.preventDefault()

          const tabName = this.getAttribute('href')

          const tabContents = document.querySelector('#myTabContent')

          for (let i = 0; i < tabContents.children.length; i++) {
            tabTogglers[i].parentElement.classList.remove('active')
            tabContents.children[i].classList.remove('hidden')
            if ('#' + tabContents.children[i].id === tabName) {
              continue
            }
            tabContents.children[i].classList.add('hidden')
          }
          e.target.parentElement.classList.add('active')
        })
      })

      document.getElementById('profaily-tab').click()
    }
  }
}
</script>

<style scoped>
.active {
  @apply text-blue-600 dark:text-blue-500 rounded-t-lg border-b-2 border-blue-600 dark:border-blue-500;
}
</style>