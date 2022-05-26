import Vue from 'vue'
import ContentBlock from '~/components/organisms/ContentBlock.vue'

export default (contents) => {
  const ToastComp = Vue.extend(ContentBlock)
  const app = new ToastComp({
    propsData: {
      contents
    }
  }).$mount()

  const content1 = {
    category: 'Content',
    id: 'content__4',
    label: '<b>content</b>',
    attributes: { class: 'gjs-block-section' },
    content: `<section class="py-20 bg-white" id="mount-node">${app.$el.outerHTML}</section>`
  }

  return [
    { ...content1 },
    {
      category: 'Content',
      id: 'content__5',
      label: '<b>content</b>',
      attributes: { class: 'gjs-block-section' },
      content: `  <section
        class="box-border py-8 leading-7 text-gray-900 bg-white border-0 border-gray-200 border-solid sm:py-12 md:py-16 lg:py-24"
      >
        <div
          class="box-border max-w-6xl px-4 pb-12 mx-auto border-solid sm:px-6 md:px-6 lg:px-4"
        >
          <div
            class="flex flex-col items-center leading-7 text-center text-gray-900"
          >
            <h2
              class="box-border m-0 text-3xl font-semibold leading-tight tracking-tight text-black border-solid sm:text-4xl md:text-5xl"
            >
              My Works
            </h2>
            <p
              class="box-border mt-4 text-2xl leading-normal text-gray-900 border-solid"
            >
              View some of my recent works below
            </p>
          </div>
          <div
            class="grid max-w-md mx-auto mt-6 overflow-hidden leading-7 text-gray-900 border border-b-4 border-gray-300 border-blue-600 rounded-xl md:max-w-lg lg:max-w-none sm:mt-10 lg:grid-cols-3"
          >
            <div
              class="box-border px-4 py-8 mb-6 text-center bg-white border-solid lg:mb-0 sm:px-4 sm:py-8 md:px-8 md:py-12 lg:px-10"
            >
              <h3
                class="m-0 text-2xl font-semibold leading-tight tracking-tight text-black border-0 border-solid sm:text-3xl md:text-4xl"
              >
                Using Tailwind
              </h3>
              <p class="mt-3 leading-7 text-gray-900 border-0 border-solid">
                some text talking about how the article is with few details to
                note before reading the article some text talking about how the
                article is with few details to note before reading the article
                some text talking about how the article is with few details to
                note before reading the article
              </p>
              <button
                class="inline-flex items-center justify-center w-full py-3 mt-6 font-sans text-sm leading-none text-center text-blue-600 no-underline bg-transparent border border-b-2 border-blue-600 rounded-md cursor-pointer hover:bg-blue-600 hover:border-blue-600 hover:text-white sm:text-base sm:mt-8 md:text-lg"
              >
                View Article
              </button>
            </div>
            <div
              class="box-border px-4 py-8 mb-6 text-center bg-gray-100 border border-gray-300 border-solid lg:mb-0 sm:px-4 sm:py-8 md:px-8 md:py-12 lg:px-10"
            >
              <h3
                class="m-0 text-2xl font-semibold leading-tight tracking-tight text-black border-0 border-solid sm:text-3xl md:text-4xl"
              >
                using Tailwind
              </h3>
              <p class="mt-3 leading-7 text-gray-900 border-0 border-solid">
                <span id="iqqxg"
                  >some text talking about how the article is with few details to
                  note before reading the article </span
                >
                <span id="i63ba"
                  >some text talking about how the article is with few details to
                  note before reading the article </span
                >
                <span id="ijjkh"
                  >some text talking about how the article is with few details to
                  note before reading the article</span
                >
              </p>
              <button
                class="inline-flex items-center justify-center w-full py-3 mt-6 font-sans text-sm leading-none text-center text-white no-underline bg-blue-600 border-b-4 border-blue-700 rounded cursor-pointer hover:text-white sm:text-base sm:mt-8 md:text-lg"
              >
                View Article
              </button>
            </div>
            <div
              class="box-border px-4 py-8 text-center bg-white border-solid sm:px-4 sm:py-8 md:px-8 md:py-12 lg:px-10"
            >
              <h3
                class="m-0 text-2xl font-semibold leading-tight tracking-tight text-black border-0 border-solid sm:text-3xl md:text-4xl"
              >
                Using Tailwind
              </h3>
              <p class="mt-3 leading-7 text-gray-900 border-0 border-solid">
                some text talking about how the article is with few details to
                note before reading the article some text talking about how the
                article is with few details to note before reading the article
                some text talking about how the article is with few details to
                note before reading the article
              </p>
              <button
                class="inline-flex items-center justify-center w-full py-3 mt-6 font-sans text-sm leading-none text-center text-blue-600 no-underline bg-transparent border border-b-2 border-blue-600 rounded cursor-pointer hover:bg-blue-600 hover:border-blue-600 hover:text-white sm:text-base sm:mt-8 md:text-lg"
              >
                View Article
              </button>
            </div>
          </div>
        </div>
      </section>`
    },

    {
      category: 'Content',
      id: 'content__2', // id is mandatory
      label: '<b>content</b>', // You can use HTML/SVG inside labels
      attributes: { class: 'gjs-block-section' },
      content: `
        <!-- Section 1 -->
        <section class="w-full bg-white pt-7 pb-7 md:pt-20 md:pb-24">
            <div class="box-border flex flex-col items-center content-center px-8 mx-auto leading-6 text-black border-0 border-gray-300 border-solid md:flex-row max-w-7xl lg:px-16">
        
                <!-- Image -->
                <div class="box-border relative w-full max-w-md px-4 mt-5 mb-4 -ml-5 text-center bg-no-repeat bg-contain border-solid md:ml-0 md:mt-0 md:max-w-none lg:mb-0 md:w-1/2 xl:pl-10">
                    <img src="https://cdn.devdojo.com/images/december2020/productivity.png" class="p-2 pl-6 pr-5 xl:pl-16 xl:pr-20 ">
                </div>
        
                <!-- Content -->
                <div class="box-border order-first w-full text-black border-solid md:w-1/2 md:pl-10 md:order-none">
                    <h2 class="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl">
                        Boost Productivity
                    </h2>
                    <p class="pt-4 pb-8 m-0 leading-7 text-gray-700 border-0 border-gray-300 sm:pr-12 xl:pr-32 lg:text-lg">
                        Build an atmosphere that creates productivity in your organization and your company culture.
                    </p>
                    <ul class="p-0 m-0 leading-6 border-0 border-gray-300">
                        <li class="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                            <span class="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-yellow-300 rounded-full"><span class="text-sm font-bold">✓</span></span> Maximize productivity and growth
                        </li>
                        <li class="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                            <span class="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-yellow-300 rounded-full"><span class="text-sm font-bold">✓</span></span> Speed past your competition
                        </li>
                        <li class="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                            <span class="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-yellow-300 rounded-full"><span class="text-sm font-bold">✓</span></span> Learn the top techniques
                        </li>
                    </ul>
                </div>
                <!-- End  Content -->
            </div>
            <div class="box-border flex flex-col items-center content-center px-8 mx-auto mt-2 leading-6 text-black border-0 border-gray-300 border-solid md:mt-20 xl:mt-0 md:flex-row max-w-7xl lg:px-16">
        
                <!-- Content -->
                <div class="box-border w-full text-black border-solid md:w-1/2 md:pl-6 xl:pl-32">
                    <h2 class="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl">
                        Automated Tasks
                    </h2>
                    <p class="pt-4 pb-8 m-0 leading-7 text-gray-700 border-0 border-gray-300 sm:pr-10 lg:text-lg">
                        Save time and money with our revolutionary services. We are the leaders in the industry.
                    </p>
                    <ul class="p-0 m-0 leading-6 border-0 border-gray-300">
                        <li class="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                            <span class="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-yellow-300 rounded-full"><span class="text-sm font-bold">✓</span></span> Automated task management workflow
                        </li>
                        <li class="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                            <span class="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-yellow-300 rounded-full"><span class="text-sm font-bold">✓</span></span> Detailed analytics for your data
                        </li>
                        <li class="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                            <span class="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-yellow-300 rounded-full"><span class="text-sm font-bold">✓</span></span> Some awesome integrations
                        </li>
                    </ul>
                </div>
                <!-- End  Content -->
        
                <!-- Image -->
                <div class="box-border relative w-full max-w-md px-4 mt-10 mb-4 text-center bg-no-repeat bg-contain border-solid md:mt-0 md:max-w-none lg:mb-0 md:w-1/2">
                    <img src="https://cdn.devdojo.com/images/december2020/settings.png" class="pl-4 sm:pr-10 xl:pl-10 lg:pr-32">
                </div>
            </div>
        </section>
        `
    }
  ]
}
