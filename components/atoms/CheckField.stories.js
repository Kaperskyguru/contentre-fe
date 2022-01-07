import CheckBox from '~/components/atoms/CheckBox'

import {
  actionsToMethods,
  argsToProps,
  argTypeSlot,
  methodsToEvents
} from '~/plugins/helpers/storybook'

export default {
  title: 'Atoms/CheckBox',
  component: CheckBox,
  argTypes: {
    // Slots
    default: argTypeSlot('CheckBox')

    // Props
  }
}

const methods = actionsToMethods('click', 'dblclick')
const events = methodsToEvents(methods)

export const UnityTest = (_args, { argTypes }) => ({
  components: { CheckBox },
  props: argsToProps(argTypes),
  methods,
  template: `
    <CheckBox v-bind="$props" ${events}>
      <span>{{ $props.default }}</span>
    </CheckBox>
  `
})
