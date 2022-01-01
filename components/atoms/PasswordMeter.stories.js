import PasswordMeter from '~/components/atoms/PasswordMeter.vue'
import {
  actionsToMethods,
  argsToProps,
  argTypePropBoolean,
  argTypePropText,
  methodsToEvents
} from '~/plugins/helpers/storybook'

export default {
  title: 'Atoms/PasswordMeter',
  component: PasswordMeter,
  argTypes: {
    text: argTypePropText(),
    correct: argTypePropBoolean()
  }
}
const methods = actionsToMethods('click', 'dblclick')
const events = methodsToEvents(methods)
export const UnityTest = (_args, { argTypes }) => ({
  components: { PasswordMeter },
  methods,
  props: argsToProps(argTypes),
  template: `
    <PasswordMeter v-bind="$props" ${events}></PasswordMeter>
  `
})
