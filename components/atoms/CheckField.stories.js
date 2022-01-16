import CheckField from '~/components/atoms/CheckField'

import {
  actionsToMethods,
  argsToProps,
  argTypeSlot,
  methodsToEvents
} from '~/plugins/helpers/storybook'

export default {
  title: 'Atoms/CheckField',
  component: CheckField,
  argTypes: {
    // Slots
    default: argTypeSlot('CheckField')

    // Props
  }
}

const methods = actionsToMethods('click', 'dblclick')
const events = methodsToEvents(methods)

export const UnityTest = (_args, { argTypes }) => ({
  components: { CheckField },
  props: argsToProps(argTypes),
  methods,
  template: `
    <CheckField v-bind="$props" ${events}>
      <span>{{ $props.default }}</span>
    </CheckField>
  `
})
