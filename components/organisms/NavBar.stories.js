import NavBar from '~/components/organisms/NavBar.vue'
import { argsToProps } from '~/plugins/helpers/storybook'

export default {
  title: 'Organisms/NavBar',
  component: NavBar,
  argTypes: {}
}

export const UnityTest = (_args, { argTypes }) => ({
  components: { NavBar },
  props: argsToProps(argTypes),
  template: `
    <NavBar v-bind="$props"></NavBar>
  `
})
