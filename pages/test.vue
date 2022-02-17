<template>
  <main class="">
    <Editor
      component="div"
      class="grow m-2 border-2 border-gray-500"
      :resolver-map="resolverMap"
    >
      <div class="flex flex-row justify-between">
        <div class="w-1/5">
          <Blueprint component="Button">
            Paragraph
            <template #blueprint>
              <Paragraph />
            </template>
          </Blueprint>
          <Blueprint component="Button">
            Container
            <template #blueprint>
              <Canvas component="Container" />
            </template>
          </Blueprint>

          <div class="mt-5">
            <SettingPanel />
          </div>
        </div>
        <div class="w-full h-screen">
          <Frame component="div" class="overflow-auto w-full h-80 bg-gray-200">
            <Canvas component="Container"
              ><Paragraph
                content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
                  aspernatur deserunt culpa, magnam unde cumque architecto
                  veritatis. Dicta aperiam soluta expedita corrupti voluptates
                  iusto. Quaerat doloribus suscipit repellendus quos molestiae.
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
                  asperiores natus corporis vitae quibusdam reprehenderit enim
                  exercitationem nihil, voluptatem architecto iure numquam harum
                  rem, ipsum, quam ratione quod in quaerat!"
              ></Paragraph>
            </Canvas>
          </Frame>
        </div>
      </div>
    </Editor>
  </main>
</template>

<script>
import { Canvas, Editor, Frame, Blueprint } from '@v-craft/core'
import SettingPanel from '~/components/SettingPanel.vue'
import Container from '~/components/elements/Container.vue'
import Paragraph from '~/components/elements/Paragraph.vue'

export default {
  name: 'TestApp',
  components: {
    Canvas,
    Editor,
    Frame,
    Paragraph,
    SettingPanel,
    Blueprint
  },
  data() {
    return {
      resolverMap: {
        Canvas,
        Container,
        Paragraph
      }
    }
  }
}
</script>