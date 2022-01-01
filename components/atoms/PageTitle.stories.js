import PageTitle from '~/components/atoms/PageTitle.vue'
import {
  actionsToMethods,
  argsToProps,
  argTypePropText,
  methodsToEvents
} from '~/plugins/helpers/storybook'

export default {
  title: 'Atoms/PageTitle',
  component: PageTitle,
  argTypes: {
    title: argTypePropText()
  }
}
const methods = actionsToMethods('click', 'dblclick')
const events = methodsToEvents(methods)
export const UnityTest = (_args, { argTypes }) => ({
  components: { PageTitle },
  methods,
  props: argsToProps(argTypes),
  template: `
    <PageTitle v-bind="$props" ${events}></PageTitle>
  `
})
