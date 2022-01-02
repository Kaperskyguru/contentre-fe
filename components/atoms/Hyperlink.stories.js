import Hyperlink from '~/components/atoms/Hyperlink.vue'
import {
  actionsToMethods,
  argsToProps,
  argTypePropText,
  argTypeSlot,
  methodsToEvents
} from '~/plugins/helpers/storybook'

export default {
  title: 'Atoms/Hyperlink',
  component: Hyperlink,
  argTypes: {
    // Slots
    default: argTypeSlot('Hyperlink'),

    // Props
    extraClasses: argTypePropText('hyperlink'),
    to: argTypePropText('/')
  }
}
const methods = actionsToMethods('click', 'dblclick')
const events = methodsToEvents(methods)
export const UnityTest = (_args, { argTypes }) => ({
  components: { Hyperlink },
  methods,
  props: argsToProps(argTypes),
  template: `
    <Hyperlink v-bind="$props">
      <span v-if="$props.default" ${events}>{{ $props.default }}</span>
    </Hyperlink>
  `
})
