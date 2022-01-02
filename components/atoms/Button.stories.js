import Button from '~/components/atoms/Button.vue'

import {
  actionsToMethods,
  argsToProps,
  argTypeSlot,
  methodsToEvents
} from '~/plugins/helpers/storybook'

export default {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    // Slots
    default: argTypeSlot('Button')

    // Props
  }
}

const methods = actionsToMethods('click', 'dblclick')
const events = methodsToEvents(methods)

export const UnityTest = (_args, { argTypes }) => ({
  components: { Button },
  props: argsToProps(argTypes),
  methods,
  template: `
    <Button v-bind="$props" ${events}>
      <span>{{ $props.default }}</span>
    </Button>
  `
})
