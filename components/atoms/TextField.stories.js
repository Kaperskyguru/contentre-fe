import TextField from '~/components/atoms/TextField.vue'
import {
  actionsToMethods,
  argsToProps,
  argTypeHide,
  argTypePropBoolean,
  argTypePropText,
  methodsToEvents
} from '~/plugins/helpers/storybook'

export default {
  title: 'Atoms/TextField',
  component: TextField,
  argTypes: {
    // Model
    'v-model': argTypeHide(),
    vModel: {
      name: 'v-model',
      ...argTypePropBoolean()
    },
    label: argTypePropText(),
    type: argTypePropBoolean()
  }
}
const methods = actionsToMethods('click', 'dblclick')
const events = methodsToEvents(methods)
export const UnityTest = (_args, { argTypes }) => ({
  components: { TextField },
  props: argsToProps(argTypes),
  methods,
  template: `
    <TextField v-bind="propsOnly" v-model="$props.vModel" ${events}></TextField>
  `,
  computed: {
    propsOnly() {
      const { label, vModel, type, ...props } = this.$props
      return props
    }
  }
})
