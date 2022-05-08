<template>
  <section class="px-3 h-full md:px-12">
    <section
      class="flex flex-wrap justify-between items-center py-4 mt-4 w-full"
    >
      <PageTitle>Add Content</PageTitle>
    </section>

    <section class="container">
      <div class="py-12 pl-6">
        <div class="space-y-2 page-title">
          <a
            id="buttonmodal"
            class="
              flex flex-wrap
              items-center
              mb-6
              space-x-1
              cursor-pointer
              md:mb-0
            "
          >
            <span class="relative top-2">
              <svg
                class="mx-auto feather feather-image"
                xmlns="http://www.w3.org/2000/svg"
                width="10=4"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
            </span>
            <span class="mr-4 text-sm font-normal text-gray-500 md:mr-6"
              >Add Image Cover</span
            >
          </a>

          <h1 class="text-2xl font-bold">What exactly is Web 3?</h1>
        </div>

        <div class="my-6 md:justify-between md:items-center">
          <div class="flex flex-wrap items-center mb-6 space-x-2 md:mb-0">
            <span class="relative text-gray-500">
              <i
                class="bg-gray-400 fas fa-calendar-alt"
                style="font-size: 12px"
              ></i>
            </span>
            <span class="mr-4 text-sm font-normal text-gray-500 md:mr-6"
              >Created</span
            >
          </div>
          <div
            class="relative gap-2 text-xs"
            style="margin-left: 8rem; margin-top: -25px"
          >
            <div class="inline-flex items-center space-x-2 text-black">
              <span>November 13, 2021 | 04:39pm</span>
            </div>
          </div>
        </div>
        <div class="my-6 md:justify-between md:items-center">
          <div class="flex flex-wrap items-center mb-6 space-x-2 md:mb-0">
            <span class="relative text-gray-500">
              <i class="fas fa-tag" style="font-size: 12px"></i>
            </span>
            <span class="mr-4 text-sm font-normal text-gray-500 md:mr-6"
              >Tags</span
            >
          </div>
          <div
            class="relative gap-2 text-xs"
            style="margin-left: 8rem; margin-top: -25px"
          >
            <div
              class="
                inline-flex
                items-center
                px-2
                space-x-2
                bg-blue-200
                rounded
              "
            >
              <span>Tech</span>
            </div>

            <div
              class="
                inline-flex
                items-center
                px-2
                space-x-2
                bg-gray-500
                rounded
              "
            >
              <span>Internet</span>
            </div>

            <div
              class="
                inline-flex
                items-center
                px-2
                space-x-2
                bg-pink-200
                rounded
              "
            >
              <span>Web</span>
            </div>

            <div
              class="
                inline-flex
                items-center
                px-2
                space-x-2
                bg-blue-100
                rounded
              "
            >
              <span>Blockchain</span>
            </div>

            <div
              class="
                inline-flex
                items-center
                px-2
                space-x-2
                bg-gray-400
                rounded
              "
            >
              <span>Metaverse</span>
            </div>
          </div>
        </div>
        <div class="my-6 md:justify-between md:items-center">
          <div class="flex flex-wrap items-center mb-6 space-x-2 md:mb-0">
            <span class="relative text-gray-500">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-4 h-4"
                style=""
              >
                <g>
                  <path
                    d="M11.96 14.945c-.067 0-.136-.01-.203-.027-1.13-.318-2.097-.986-2.795-1.932-.832-1.125-1.176-2.508-.968-3.893s.942-2.605 2.068-3.438l3.53-2.608c2.322-1.716 5.61-1.224 7.33 1.1.83 1.127 1.175 2.51.967 3.895s-.943 2.605-2.07 3.438l-1.48 1.094c-.333.246-.804.175-1.05-.158-.246-.334-.176-.804.158-1.05l1.48-1.095c.803-.592 1.327-1.463 1.476-2.45.148-.988-.098-1.975-.69-2.778-1.225-1.656-3.572-2.01-5.23-.784l-3.53 2.608c-.802.593-1.326 1.464-1.475 2.45-.15.99.097 1.975.69 2.778.498.675 1.187 1.15 1.992 1.377.4.114.633.528.52.928-.092.33-.394.547-.722.547z"
                  ></path>
                  <path
                    d="M7.27 22.054c-1.61 0-3.197-.735-4.225-2.125-.832-1.127-1.176-2.51-.968-3.894s.943-2.605 2.07-3.438l1.478-1.094c.334-.245.805-.175 1.05.158s.177.804-.157 1.05l-1.48 1.095c-.803.593-1.326 1.464-1.475 2.45-.148.99.097 1.975.69 2.778 1.225 1.657 3.57 2.01 5.23.785l3.528-2.608c1.658-1.225 2.01-3.57.785-5.23-.498-.674-1.187-1.15-1.992-1.376-.4-.113-.633-.527-.52-.927.112-.4.528-.63.926-.522 1.13.318 2.096.986 2.794 1.932 1.717 2.324 1.224 5.612-1.1 7.33l-3.53 2.608c-.933.693-2.023 1.026-3.105 1.026z"
                  ></path>
                </g>
              </svg>
            </span>
            <span class="mr-4 text-sm font-normal text-gray-500 md:mr-6"
              >Channels</span
            >
          </div>
          <div
            class="relative gap-2 text-xs"
            style="margin-left: 8rem; margin-top: -25px"
          >
            <div
              class="
                inline-flex
                items-center
                px-2
                space-x-2
                bg-blue-200
                rounded
              "
            >
              <span>Medium</span>
            </div>

            <div
              class="
                inline-flex
                items-center
                px-2
                space-x-2
                bg-blue-100
                rounded
              "
            >
              <span>Zikoko</span>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="pt-6 w-full text-sm">
          <ckeditor :editor="editor" :config="editorConfig" class="w-full">
          </ckeditor>
        </div> -->

      <Portal selector="#portal-panel" class="p-5">
        <medium-editor
          v-model="content"
          :prefill="defaultValue"
          :options="options"
          :on-change="onChange"
          :hide-gist="false"
          @uploaded="uploadCallback"
        >
        </medium-editor>
      </Portal>
      <div class="flex justify-end my-8 space-x-4">
        <button
          class="
            py-4
            px-8
            mt-4
            text-sm
            font-bold
            leading-5
            text-center text-black
            rounded-md
            border border-teal-300
          "
          type="button"
        >
          Save
        </button>

        <button
          class="
            py-4
            px-24
            mt-4
            text-sm
            font-bold
            leading-5
            text-center text-white
            bg-teal-300
            rounded-md
            form-btn
          "
          type="button"
        >
          Upload
        </button>
      </div>
      <!-- </div> -->
    </section>
  </section>
  <!-- end of page -->
</template>

<script>
import { Portal } from '@linusborg/vue-simple-portal'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
export default {
  components: {
    Portal
  },
  layout: 'Dashboard',
  data: () => ({
    editor: ClassicEditor,
    editorConfig: {
      ref: 'field'
    },

    content: ``,
    defaultValue: `<h1>Vuejs <b>Medium Editor</b></h1>
          <div class="editor-image is-full"><img src="https://source.unsplash.com/yxNURc8he3o/2000x600"></div>
          <pre>axios.interceptors.response.use(function (response) {<br>  return response;<br>}, function (error) {<br>  const originalRequest = error.config;<br>  if (error.response.status === 401 &amp;&amp; !originalRequest._retry) {<br>    originalRequest._retry = true;<br>    const refreshToken = window.localStorage.getItem('refreshToken');<br>    return axios.post('http://localhost:8000/auth/refresh', { refreshToken })<br>      .then(({data}) =&gt; {<br>        window.localStorage.setItem('token', data.token);<br>        window.localStorage.setItem('refreshToken', data.refreshToken);<br>        axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;<br>        originalRequest.headers['Authorization'] = 'Bearer ' + data.token;<br>        return axios(originalRequest);<br>      });<br>  }<br>  return Promise.reject(error);<br>});</pre>
          <div class="editor-image-description">righteous indignation and dislike</div>
          <p>But I must explain to you how all this mistaken idea of denouncing <b>pleasure and praising pain was born and I will give you</b> a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes</p><p class="editor-embed">
            <a href="https://gist.github.com/Culttm/a8c3ca85032c4b0cc67037425f150c44">https://gist.github.com/Culttm/a8c3ca85032c4b0cc67037425f150c44</a>
            <div class="gist-embed-iframe"><iframe id="A8Tm2Y76Cuy9dtVRdxnaIRKgI2weZB8R" height="573px"></iframe></div>
            </p><p class="editor-embed"><br></p><p></p><ul><li>But I must explain to you how all this mistaken idea of denouncing</li><li>of pleasure of the moment, so blinded by desire</li></ul><p></p>
          <p>On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will</p><p class="editor-embed">
            <a href="https://gist.github.com/Culttm/a8c3ca85032c4b0cc67037425f150c44">https://gist.github.com/Culttm/a8c3ca85032c4b0cc67037425f150c44</a>
            <div class="gist-embed-iframe"><iframe id="QnJ6PY8hYZAdPw4ynC0ryAYsl9oVnZYr" height="573px"></iframe></div>
            </p>
            <p></p>
            <p></p><p class="editor-embed"><br></p>
          <p>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariaturasdasdasdasd<br></p>
          <h2>Section 1.10.33</h2>
          <div class="editor-image is-normal"><img src="https://source.unsplash.com/DKnXlH_r3x4/2000x800"></div>
          <div class="editor-image-description">you how all this mistaken idea of denouncing pleasure</div>
          <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus</p><p class="editor-embed">
            <a href="https://gist.github.com/Culttm/a8c3ca85032c4b0cc67037425f150c44">https://gist.github.com/Culttm/a8c3ca85032c4b0cc67037425f150c44</a>
            <div class="gist-embed-iframe"><iframe id="JbGNtl0kDTqJ1x1D4bNghxdFKNqpmuGJ" height="573px"></iframe></div>
            </p>
            <p></p>
            <p></p><p class="editor-embed"><br></p><p></p><ol><li>cum soluta nobis est eligendi optio cumque</li><li>righteous indignation and dislike</li></ol><p></p><h3>odio dignissimos ducimus</h3>
          <p></p>
          <div class="editor-image is-expand"><img src="https://source.unsplash.com/-g7axSVst6Y/1600x600">
          </div>
          <div class="editor-image-description">I will give you a complete account of the system</div>
          <p></p>
          <p>On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of wills</p>`,
    options: {
      uploadUrl: 'https://api.imgur.com/3/image',
      uploadUrlHeader: { Authorization: 'Client-ID db856b43cc7f441' },
      file_input_name: 'image',
      file_size: 1024 * 1024 * 10,
      imgur: true,
      toolbar: {
        buttons: [
          'bold',
          'italic',
          {
            name: 'anchor',
            action: 'createLink',
            aria: 'link',
            tagNames: ['a'],
            contentDefault: '<b>🔗</b>',
            contentFA: '<i class="fa fa-link"></i>'
          },
          'underline',
          'quote',
          'h1',
          'h2',
          'h3',
          'h4',
          {
            name: 'pre',
            action: 'append-pre',
            aria: 'code highlight',
            tagNames: ['pre'],
            contentDefault: '<b><\\></b>',
            contentFA: '<i class="fa fa-code fa-lg"></i>'
          },
          'unorderedlist',
          'orderedlist',
          {
            name: 'image',
            action: 'image',
            aria: 'insert image from url',
            tagNames: ['img'],
            contentDefault: '<b>image</b>',
            contentFA: '<i class="fa fa-picture-o"></i>'
          }
        ]
      }
    }
  }),

  methods: {
    onChange(s) {
      //   console.log(s)
    },
    uploadCallback(url) {
      console.log('uploaded url', url)
    }
  }
}
</script>

<style scoped>
</style>