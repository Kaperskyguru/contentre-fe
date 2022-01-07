import Tooltip from '~/components/atoms/Tooltip.vue'
import Button from '~/components/atoms/Button.vue'
import TextField from '~/components/atoms/TextField.vue'
import {
  argsToProps,
  argTypePropBoolean,
  argTypePropSelect,
  argTypePropText,
  disableControls
} from '~/plugins/helpers/storybook'

export default {
  title: 'Atoms/Tooltip',
  component: Tooltip,
  argTypes: {
    // Props
    always: argTypePropBoolean(false),
    label: argTypePropText('Tooltip label'),
    tooltipClass: argTypePropText(),
    position: argTypePropSelect('bottom', ['top', 'right', 'left', 'bottom']),
    trigger: {
      control: 'inline-check',
      defaultValue: ['hover', 'focus'],
      options: ['hover', 'focus', 'click']
    }
  }
}

export const UnityTest = (_args, { argTypes }) => ({
  components: { Tooltip, Button },
  props: argsToProps(argTypes),
  template: `
    <div class="flex justify-center items-center h-20">
      <Tooltip v-bind="$props">
        <Button>Example Button</Button>
      </Tooltip>
    </div>
  `
})

export const WithTextField = (_args, { argTypes }) => ({
  components: { Tooltip, TextField },
  props: argsToProps(argTypes),
  data: () => ({
    email: 'test.com'
  }),
  template: `
    <div class="grid grid-cols-1 gap-10 max-w-md">
    <p>Hover or focus on each error alert icon:</p>
      <TextField
        id="email"
        v-model="email"
        type="email"
        name="email"
        autocomplete="email"
        label="Email address"
        enterkeyhint="next"
        maxlength="255"
        :error="$props.label"
      />
      <p>Hover or focus on password eye icon:</p>
      <TextField
        id="password"
        v-model="email"
        type="password"
        name="password"
        autocomplete="password"
        label="Password"
        enterkeyhint="next"
        maxlength="255"
      />
      <p>Hover or focus on clear icon:</p>
      <TextField
        id="email2"
        v-model="email"
        type="text"
        name="email2"
        autocomplete="email"
        label="Email address"
        enterkeyhint="next"
        clearable
        maxlength="255"
      />
    </div>
  `
})

disableControls(WithTextField)
