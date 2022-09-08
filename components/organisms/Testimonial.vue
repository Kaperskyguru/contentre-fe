<template>
  <div class="py-20 w-full">
    <h2
      class="
        font-gilroy
        text-2xl
        font-medium
        tracking-wide
        leading-[62.4px]
        text-center text-[#102A27]
        lg:text-5xl
      "
    >
      Awesome feedback from technical writers
    </h2>
    <div class="mx-auto mt-10 md:w-full lg:w-full">
      <div class="items-center px-2 space-x-3 w-full md:px-0 md:space-x-8">
        <ssr-carousel
          show-arrows
          :autoplay-delay="5"
          :responsive="[
            {
              maxWidth: '100%',
              slidesPerPage: 1
            }
          ]"
        >
          <div
            v-for="(testimonial, i) in testimonials"
            :key="i"
            class="slide"
            :index="i"
          >
            <div class="px-10 pt-6 pb-16 bg-white rounded-md border">
              <div
                class="
                  pb-3
                  border-b-[1px] border-[#F2F4F4]
                  md:flex md:justify-between
                  lg:items-center
                "
              >
                <div class="flex justify-center">
                  <div class="justify-center mb-6 md:flex md:justify-start">
                    <div class="mx-9 w-[48px] h-[48px] rounded-full md:mx-0">
                      <img
                        :src="testimonial.image"
                        alt=""
                        class="block object-cover w-full"
                      />
                    </div>
                    <div class="mt-5 md:mt-0 md:ml-4">
                      <h6
                        class="
                          text-base
                          font-medium
                          leading-[20.8px]
                          text-[#286963]
                        "
                      >
                        {{ testimonial.name }}
                      </h6>
                      <p
                        class="
                          text-xs
                          font-medium
                          leading-[15.6px]
                          text-[#888888]
                        "
                      >
                        {{ testimonial.job }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p
                class="
                  mt-5
                  mb-3
                  text-[14px]
                  font-medium
                  leading-[24px]
                  text-center text-[#54605F]
                  md:text-[16px] md:text-left
                "
              >
                {{ testimonial.testimony }}
              </p>
            </div>
          </div>
        </ssr-carousel>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Testimonial',

  data: () => ({
    testimonials: [
      {
        name: 'Solomon Eseme',
        job: 'Senior Technical Writer @ Kinsta',
        image:
          'https://res.cloudinary.com/kaperskydisk/image/upload/v1654025159/contentre/Founders/ge0hlhast4qdsis2jzht.jpg',
        testimony:
          'Contentre is a tool I will recommend to every writer, I use it to generate multiple portfolios with CONTENT RULES set to what my clients want. Additionally, I can generate as many portfolios as needed for different clients without writing any code. It also helps me organized all my written contents in one place.'
      },

      {
        name: 'Chukwuka Deh',
        job: 'Freelance Copywriter and Founder @ SliqWriters',
        image:
          'https://res.cloudinary.com/kaperskydisk/image/upload/v1656354941/contentre/testimonial/sliq_writer.jpg',
        testimony:
          'Contentre is going to help me arrange my portfolio better and as well as, having a synchronizable writing platform'
      },

      {
        name: 'MacBobby Chibuzor',
        job: 'Technical Writer',
        image:
          'https://res.cloudinary.com/kaperskydisk/image/upload/v1656354822/contentre/testimonial/MacBobby_Chibuzor.png',
        testimony:
          'Contentre holds all my write-ups, making it easier to share my best publications as samples. Moreover, I have access to a customizable portfolio that I can share to improve my brand. Additionally, The fact that I can write new contents on Contentre, as well as publish simultaneously is amazing.'
      },

      {
        name: 'Eric Aprioku',
        job: 'Software Engineer and Technical writer',
        image:
          'https://res.cloudinary.com/kaperskydisk/image/upload/v1656355617/contentre/testimonial/HC0vkyK4_400x400.jpg',
        testimony:
          "By helping me see all the articles I've written in one place and helping me cross-post them across multiple platforms. I've never had the problem personally cause I don't write very often, but I believe it can help me stay organized when I do start writing more aggressively."
      },

      {
        name: 'Alloyking1 ( Moses)',
        job: 'Technical blog contributor',
        image:
          'https://res.cloudinary.com/kaperskydisk/image/upload/v1654433104/contentre/Founders/moses_headshot.jpg',
        testimony:
          'It Helps me manage all the writing activities from one place.'
      },

      {
        name: 'Wendy Ekemezie',
        job: 'Freelance Writer',
        image:
          'https://res.cloudinary.com/kaperskydisk/image/upload/v1656355207/contentre/testimonial/wendy.jpg',
        testimony:
          'Helping with organizing my business and adding works according to clients.'
      }
    ]
  })
}
</script>

<style scoped>
</style>