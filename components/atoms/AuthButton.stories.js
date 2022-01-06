import AuthButton from '~/components/atoms/AuthButton.vue'

import {
  actionsToMethods,
  argsToProps,
  argTypeSlot,
  methodsToEvents
} from '~/plugins/helpers/storybook'

export default {
  title: 'Atoms/AuthButton',
  component: AuthButton,
  argTypes: {
    // Slots
    default: argTypeSlot('AuthButton')

    // Props
  }
}

const methods = actionsToMethods('click', 'dblclick')
const events = methodsToEvents(methods)

export const UnityTest = (_args, { argTypes }) => ({
  components: { AuthButton },
  props: argsToProps(argTypes),
  methods,
  template: `
    <AuthButton v-bind="$props" ${events}>
      <span>{{ $props.default }}</span>
    </AuthButton>
  `
})
