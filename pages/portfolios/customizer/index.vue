

<template>
  <div class="w-full font-semibold text-white">
    <nav class="flex w-full h-[3rem] bg-[#001E26]">
      <div
        class="
          flex
          justify-between
          items-center
          min-w-[13.5rem]
          max-w-[13.5rem]
          h-full
          text-[#00DC82]
          border-r border-black
        "
      >
        <span
          class="
            flex
            justify-center
            items-center
            w-1/4
            h-full
            text-xl text-center
            cursor-pointer
          "
          :class="currentTab == 'TheStyle' ? 'bg-[#012A35]' : 'bg-[#001E26]'"
          @click="currentTab = 'TheStyle'"
        >
          <svg width="1.13em" height="1em" viewBox="0 0 576 512">
            <path
              fill="currentColor"
              d="M224 263.3c.2-30 14.4-58.1 38.4-76.1L499.1 9.605c18.6-13.958 44.5-12.57 61.6 3.295c17 15.86 20.1 41.64 7.5 61.17L406.5 324.1c-15.2 23.6-39.9 39.1-67.2 43L224 263.3zM320 400c0 61.9-50.1 112-112 112H64c-17.67 0-32-14.3-32-32s14.33-32 32-32h4.81c17.63 0 29.59-18.9 27.78-36.4c-.39-3.8-.59-7.7-.59-11.6c0-60.4 47.9-109.7 107.7-111.9l116.1 104.4c.1 1.6.2 5 .2 7.5z"
            ></path>
          </svg>
        </span>

        <span
          class="
            flex
            justify-center
            items-center
            w-1/4
            h-full
            text-xl text-center
            cursor-pointer
          "
          :class="currentTab == 'TheLayers' ? 'bg-[#012A35]' : 'bg-[#001E26]'"
          @click="currentTab = 'TheLayers'"
        >
          <svg width="1em" height="1em" viewBox="0 0 24 24">
            <path
              d="M21.484 7.125l-9.022-5a1.003 1.003 0 0 0-.968 0l-8.978 4.96a1 1 0 0 0-.003 1.748l9.022 5.04a.995.995 0 0 0 .973.001l8.978-5a1 1 0 0 0-.002-1.749z"
              fill="currentColor"
            ></path>
            <path
              d="M12 15.856l-8.515-4.73l-.971 1.748l9 5a1 1 0 0 0 .971 0l9-5l-.971-1.748L12 15.856z"
              fill="currentColor"
            ></path>
            <path
              d="M12 19.856l-8.515-4.73l-.971 1.748l9 5a1 1 0 0 0 .971 0l9-5l-.971-1.748L12 19.856z"
              fill="currentColor"
            ></path>
          </svg>
        </span>

        <span
          class="
            flex
            justify-center
            items-center
            w-1/4
            h-full
            text-xl text-center
            cursor-pointer
          "
          :class="currentTab == 'TheBlocks' ? 'bg-[#012A35]' : 'bg-[#001E26]'"
          @click="currentTab = 'TheBlocks'"
        >
          <svg width="1em" height="1em" viewBox="0 0 36 36">
            <path
              fill="currentColor"
              d="m31.42 9.09l-13-6a1 1 0 0 0-.84 0l-13 6A1 1 0 0 0 4 10v17a1 1 0 0 0 .58.91l13 6a1 1 0 0 0 .84 0l13-6A1 1 0 0 0 32 27V10a1 1 0 0 0-.58-.91ZM18 14.9L7.39 10L18 5.1L28.61 10Zm12 11.46l-11 5.08v-14.8l11-5.08Z"
              class="clr-i-solid clr-i-solid-path-1"
            ></path>
            <path fill="none" d="M0 0h36v36H0z"></path>
          </svg>
        </span>
        <span
          class="
            flex
            justify-center
            items-center
            w-1/4
            h-full
            text-xl text-center text-[#00DC82]
            cursor-pointer
          "
          :class="currentTab == 'TheTraits' ? 'bg-[#012A35]' : 'bg-[#001E26]'"
          @click="currentTab = 'TheTraits'"
        >
          <IconRobot />
        </span>
      </div>
      <!-- Logo -->

      <div class="flex justify-between py-1 px-4 w-full h-full text-[#00DC82]">
        <div class="flex justify-center items-center space-x-3">
          <span @click.prevent="activateCommand('set-device-desktop')">
            <IconComputer class="w-6 h-6 cursor-pointer" />
          </span>
          <span @click.prevent="activateCommand('set-device-tablet')">
            <IconTablet class="w-5 h-5 cursor-pointer" />
          </span>
          <span @click.prevent="activateCommand('set-device-mobile')">
            <IconMobile class="w-4 h-4 cursor-pointer" />
          </span>
        </div>
        <div class="flex justify-center items-center space-x-4">
          <span @click.prevent="activateCommand('core:component-outline')">
            <IconOutline class="w-5 h-5 cursor-pointer" />
          </span>

          <span @click.prevent="activateCommand('core:undo')">
            <IconUndo class="w-4 h-4 cursor-pointer" />
          </span>
          <span @click.prevent="activateCommand('core:redo')">
            <IconRedo class="w-4 h-4 cursor-pointer" />
          </span>
          <span @click.prevent="activateCommand('export-template')">
            <IconCode class="w-5 h-5 cursor-pointer" />
          </span>
        </div>
        <div class="flex justify-center items-center space-x-4">
          <button
            class="
              flex
              justify-center
              items-center
              p-1
              space-x-2
              w-24
              text-sm
              font-semibold
              text-[#001E26]
              bg-[#00DC82]
              rounded
              hover:opacity-90
              cursor-pointer
              select-none
            "
            @click="activateCommand('save-to-db')"
          >
            <span>Save</span>
            <IconEye class="w-5 h-5 cursor-pointer" />
          </button>

          <button
            class="
              flex
              justify-center
              items-center
              p-1
              space-x-2
              w-24
              text-sm
              font-semibold
              text-[#001E26]
              bg-[#00DC82]
              rounded
              hover:opacity-90
              cursor-pointer
              select-none
            "
            @click="activateCommand('core:preview')"
          >
            <span>Preview</span>
            <IconEye class="w-5 h-5 cursor-pointer" />
          </button>
          <button
            class="
              flex
              justify-center
              items-center
              p-1
              space-x-2
              w-24
              text-sm
              font-semibold
              text-[#001E26]
              bg-[#00DC82]
              rounded
              hover:opacity-90
              cursor-pointer
              select-none
            "
            @click="clearCanvas"
          >
            <span>Clear</span>
            <IconTrash class="w-5 h-5" />
          </button>

          <Hyperlink
            to="/portfolios"
            class="
              flex
              justify-center
              items-center
              p-1
              space-x-2
              w-24
              text-sm
              font-semibold
              text-[#001E26]
              bg-[#00DC82]
              rounded
              hover:opacity-90
              cursor-pointer
              select-none
            "
          >
            <span>Back</span>
          </Hyperlink>
        </div>
      </div>

      <!-- Responsive Screen -->
    </nav>

    <section class="flex w-full h-[calc(100vh-3rem)] bg-gray-200 editor-row">
      <aside
        v-show="currentTab == 'TheBlocks'"
        id="blocks"
        class="
          flex
          overflow-y-scroll
          relative
          flex-col
          py-4
          px-1
          w-[16rem]
          h-full
          bg-[#001E26]
          border-t border-black
          myblocks
          scrollbar-hide
        "
      ></aside>
      <aside
        v-show="currentTab == 'TheStyle'"
        id="stylus"
        class="
          flex
          overflow-y-scroll
          relative
          flex-col
          py-4
          px-1
          w-[16rem]
          h-full
          bg-[#001E26]
          border-t border-black
          myblocks
          scrollbar-hide
        "
      ></aside>
      <aside
        v-show="currentTab == 'TheLayers'"
        id="layering"
        class="
          flex
          overflow-y-scroll
          relative
          flex-col
          py-4
          px-1
          w-[16rem]
          h-full
          bg-[#001E26]
          border-t border-black
          myblocks
          scrollbar-hide
        "
      ></aside>
      <aside
        v-show="currentTab == 'TheTraits'"
        id="traiters"
        class="
          flex
          overflow-y-scroll
          relative
          flex-col
          py-4
          px-1
          w-[16rem]
          h-full
          bg-[#001E26]
          border-t border-black
          myblocks
          scrollbar-hide
        "
      ></aside>

      <main class="overflow-hidden mx-auto w-full">
        <div id="gjs" class="h-[100vh-3rem] scrollbar-hide">
          <h1 class="p-4 text-2xl text-center text-[#001E26]">
            Made with love by Contentre
          </h1>
          <div class="flex flex-col px-12 space-y-3 text-[#001E26]">
            <div class="flex items-center space-x-6">
              <svg width="1.13em" height="1em" viewBox="0 0 576 512">
                <path
                  fill="currentColor"
                  d="M224 263.3c.2-30 14.4-58.1 38.4-76.1L499.1 9.605c18.6-13.958 44.5-12.57 61.6 3.295c17 15.86 20.1 41.64 7.5 61.17L406.5 324.1c-15.2 23.6-39.9 39.1-67.2 43L224 263.3zM320 400c0 61.9-50.1 112-112 112H64c-17.67 0-32-14.3-32-32s14.33-32 32-32h4.81c17.63 0 29.59-18.9 27.78-36.4c-.39-3.8-.59-7.7-.59-11.6c0-60.4 47.9-109.7 107.7-111.9l116.1 104.4c.1 1.6.2 5 .2 7.5z"
                ></path>
              </svg>
              <h2>style selected components</h2>
            </div>
            <div class="flex items-center space-x-6">
              <svg width="1em" height="1em" viewBox="0 0 24 24">
                <path
                  d="M21.484 7.125l-9.022-5a1.003 1.003 0 0 0-.968 0l-8.978 4.96a1 1 0 0 0-.003 1.748l9.022 5.04a.995.995 0 0 0 .973.001l8.978-5a1 1 0 0 0-.002-1.749z"
                  fill="currentColor"
                ></path>
                <path
                  d="M12 15.856l-8.515-4.73l-.971 1.748l9 5a1 1 0 0 0 .971 0l9-5l-.971-1.748L12 15.856z"
                  fill="currentColor"
                ></path>
                <path
                  d="M12 19.856l-8.515-4.73l-.971 1.748l9 5a1 1 0 0 0 .971 0l9-5l-.971-1.748L12 19.856z"
                  fill="currentColor"
                ></path>
              </svg>
              <h2>view the componet layering</h2>
            </div>
            <div class="flex items-center space-x-6">
              <svg width="1em" height="1em" viewBox="0 0 36 36">
                <path
                  fill="currentColor"
                  d="m31.42 9.09l-13-6a1 1 0 0 0-.84 0l-13 6A1 1 0 0 0 4 10v17a1 1 0 0 0 .58.91l13 6a1 1 0 0 0 .84 0l13-6A1 1 0 0 0 32 27V10a1 1 0 0 0-.58-.91ZM18 14.9L7.39 10L18 5.1L28.61 10Zm12 11.46l-11 5.08v-14.8l11-5.08Z"
                  class="clr-i-solid clr-i-solid-path-1"
                ></path>
                <path fill="none" d="M0 0h36v36H0z"></path>
              </svg>
              <h2>add new components</h2>
            </div>
            <div class="flex items-center space-x-6">
              <IconRobot />
              <h2>add attributes to components</h2>
            </div>
            <div class="flex items-center space-x-6">
              <IconOutline />
              <h2>toggle outline of components</h2>
            </div>
            <div class="flex items-center space-x-6">
              <IconUndo />
              <h2>undo last action</h2>
            </div>
            <div class="flex items-center space-x-6">
              <IconRedo />
              <h2>Redo last action</h2>
            </div>
            <div class="flex items-center space-x-6">
              <IconCode />
              <h2>View page source code</h2>
            </div>

            <h2>Double click on any componet to edit or delete it</h2>
            <h2>
              Built for devices with large screen size, touch functionality is
              not enabled yet.
            </h2>
            <h2>Build different views for different screen sizes.</h2>
          </div>
          <h2
            class="
              p-3
              mx-auto
              mt-3
              w-fit
              text-xl
              font-bold
              text-center text-[#00dc82]
              bg-[#001E26]
              rounded
              hover:opacity-90
              cursor-pointer
              select-none
            "
            @click="clearCanvas"
          >
            Clear the canvas for a clean page
          </h2>
        </div>
      </main>
    </section>
  </div>
</template>

<script>
import 'grapesjs/dist/css/grapes.min.css'
import grapesjs from 'grapesjs'
import 'grapesjs-preset-webpage'
import componentBlocks from '~/assets/blocks/blocks.js'
import {
  GET_CONTENTS,
  GET_USER_TEMPLATE,
  UPDATE_USER_TEMPLATE
} from '~/graphql'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Customizer',
  components: {
    IconComputer: () => import('~/assets/blocks/icons/IconComputer.vue'),
    IconTablet: () => import('~/assets/blocks/icons/IconTablet.vue'),
    IconMobile: () => import('~/assets/blocks/icons/IconMobile.vue'),
    IconCode: () => import('~/assets/blocks/icons/IconCode.vue'),
    IconUndo: () => import('~/assets/blocks/icons/IconUndo.vue'),
    IconRedo: () => import('~/assets/blocks/icons/IconRedo.vue'),
    IconEye: () => import('~/assets/blocks/icons/IconEye.vue'),
    IconTrash: () => import('~/assets/blocks/icons/IconTrash.vue'),
    IconOutline: () => import('~/assets/blocks/icons/IconOutline.vue'),
    IconRobot: () => import('~/assets/blocks/icons/IconRobot.vue')
  },

  layout: 'portfolioDesign',

  async asyncData(context) {
    const client = context.app.apolloProvider.defaultClient

    try {
      const {
        data: { getContents }
      } = await client.query({
        query: GET_CONTENTS,
        variables: {
          size: 9,
          skip: 0
        }
      })

      return {
        contents: {
          items: getContents.contents,
          total: getContents.meta.total
        }
      }
    } catch (e) {
      return {
        error: true
      }
    }
  },

  data: () => ({
    editor: null,
    contents: {},
    simpleStorage: {},
    db: null,
    currentTab: 'TheStyle',
    templateId: null,
    key: ''
  }),

  watch: {
    '$route.query': {
      immediate: true,
      handler(queries) {
        this.templateId = queries.id
        this.key = `gjs-${this.templateId}`
      }
    }
  },

  mounted() {
    const _self = this
    const computedBlocks = componentBlocks(this.contents)
    this.editor = grapesjs.init({
      container: '#gjs',
      fromElement: true,
      height: '100%',
      width: '100%',

      storageManager: {
        id: `gjs-${this.templateId}-`, // Prefix identifier that will be used on parameters
        type: 'local', // Type of the storage
        autosave: true, // Store data automatically
        autoload: true, // Autoload stored data on init
        stepsBeforeSave: 1 // If autosave enabled, indicates how many changes are necessary before store method is triggered
      },

      canvas: {
        styles: [],
        scripts: ['https://cdn.tailwindcss.com']
      },
      layerManager: {
        appendTo: '#layering'
      },
      traitManager: {
        appendTo: '#traiters'
      },
      styleManager: {
        appendTo: '#stylus'
      },
      panels: {
        defaults: [
          // ...
        ]
      },
      commands: {
        defaults: [
          {
            id: 'set-device-desktop',
            run(editor) {
              editor.setDevice('Desktop')
            }
          },
          {
            id: 'set-device-tablet',
            run(editor) {
              editor.setDevice('Tablet')
            }
          },
          {
            id: 'set-device-mobile',
            run(editor) {
              editor.setDevice('Mobile')
            }
          },
          {
            id: 'save-to-db',
            run(editor) {
              _self.save({ content: editor.getHtml(), css: editor.getCss() })
            }
          }
        ]
      },
      deviceManager: {
        devices: [
          {
            name: 'Desktop',
            width: '' // default size
          },
          {
            name: 'Tablet',
            width: '530px',
            widthMedia: '768px' // default size
          },
          {
            name: 'Mobile',
            width: '320px', // this value will be used on canvas width
            widthMedia: '480px' // this value will be used in CSS @media
          }
        ]
      },
      blockManager: {
        appendTo: '#blocks',
        blocks: computedBlocks
      },
      plugins: ['gjs-blocks-basic'],
      pluginsOpts: {
        'gjs-blocks-basic': {
          category: 'Primitives',
          blocks: [
            'column1',
            'column2',
            'column3',
            'text',
            'link',
            'image',
            'video'
          ]
        }
      }
    })

    this.editor.StorageManager.add('local', {
      // New logic for the local storage

      load(keys, clb, clbErr) {
        const indexedDB =
          window.indexedDB ||
          window.mozIndexedDB ||
          window.webkitIndexedDB ||
          window.msIndexedDB

        const open = indexedDB.open('gjs-contentre', 1)

        open.onupgradeneeded = function () {
          const db = open.result
          db.createObjectStore('templates', { autoIncrement: true })
        }

        open.onsuccess = function () {
          const db = open.result
          const tx = db.transaction(['templates'], 'readwrite')
          const store = tx.objectStore('templates')

          const request = store.get(_self.key)
          request.onerror = clbErr

          request.onsuccess = () => {
            const { id, ...data } = request.result || {}

            clb(data)
          }
          tx.oncomplete = function () {
            db.close()
          }
        }
      },

      store(data, clb, clbErr) {
        const indexedDB =
          window.indexedDB ||
          window.mozIndexedDB ||
          window.webkitIndexedDB ||
          window.msIndexedDB

        const open = indexedDB.open('gjs-contentre', 1)

        open.onupgradeneeded = function () {
          const db = open.result
          db.createObjectStore('templates', { autoIncrement: true })
        }

        open.onsuccess = function () {
          const db = open.result
          const tx = db.transaction(['templates'], 'readwrite')
          const store = tx.objectStore('templates')
          const request = store.put(data, _self.key)
          request.onerror = clbErr
          request.onsuccess = clb

          tx.oncomplete = function () {
            db.close()
          }
        }
      }
    })
    this.editor.load()
  },

  methods: {
    async save(data) {
      try {
        await this.$apollo.mutate({
          mutation: UPDATE_USER_TEMPLATE,
          variables: {
            id: this.templateId,
            input: {
              ...data
            }
          },
          skip() {
            return !this.templateId
          }
        })

        this.sending = false
        this.$toast.positive('Template saved succcessfully')
      } catch (error) {
        this.$toast.negative(error.message)
        this.sending = false
      }
    },

    async get() {
      const {
        data: { getUserTemplate: template }
      } = await this.$apollo.query({
        query: GET_USER_TEMPLATE,
        variables: {
          id: this.templateId
        },
        skip() {
          return !this.templateId
        }
      })
      return template
    },

    clearCanvas() {
      if (this.editor) {
        if (confirm('Are you sure you want to clear the canvas')) {
          this.editor.runCommand('core:canvas-clear')
        }
      }
    },

    activateCommand(command) {
      if (this.editor && this.editor.Commands.isActive(command)) {
        this.editor.stopCommand(command)
      } else this.editor.runCommand(command)
    }
  }
}
</script>

<style>
#gjs {
  overflow-y: scroll;
}

.gjs-block {
  width: 100%;
  min-height: 90px;
}

.gjs-cv-canvas {
  top: 0;
  width: 100%;
  height: 100%;
}

.panel__top {
  padding: 0;
  width: 100%;
  display: flex;
  position: initial;
  justify-content: flex-end;
  background-color: white;
  align-items: flex-end;
}
.panel__basic-actions {
  position: initial;
  background: transparent;
  color: #001e26;
  font-weight: bold;
}

.gjs-one-bg {
  background-color: #001e26;
}

/* Secondary color for the text color */
.gjs-two-color {
  color: #00dc82;
}

/* Tertiary color for the background */
.gjs-three-bg {
  background-color: rgb(2, 32, 5);
  color: #00dc82;
}

/* Quaternary color for the text color */
.gjs-four-color,
.gjs-four-color-h:hover {
  color: #00dc82;
}
</style>



