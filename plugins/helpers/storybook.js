import { action } from '@storybook/addon-actions'

export const argsToProps = (argTypes) => Object.keys(argTypes)

export const actionsToMethods = (...actions) => {
  const methods = {}

  for (const name of actions) {
    methods[name] = action(name)
  }

  methods.$callMethod = function (name, event) {
    methods[name](event)
  }

  return methods
}

export const methodsToEvents = (methods) =>
  Object.keys(methods)
    .filter((m) => m !== '$callMethod')
    .map((m) => `@${m}="$callMethod('${m}', $event)"`)
    .join(' ')

export const argTypeSlot = (defaultValue = '') => ({
  control: 'text',
  defaultValue,
  table: { category: 'slots', type: { summary: 'VNode[]' } }
})

export const argTypeHide = () => ({
  table: { disable: true }
})

export const argTypePropText = (defaultValue = '') => ({
  control: 'text',
  defaultValue,
  table: {
    category: 'props',
    type: { summary: 'string' },
    defaultValue: {
      summary: defaultValue === null ? 'null' : `'${defaultValue}'`
    }
  }
})

export const argTypePropNumber = (defaultValue = undefined) => ({
  control: 'number',
  defaultValue,
  table: {
    category: 'props',
    type: { summary: 'number' },
    defaultValue: { summary: defaultValue }
  }
})

export const argTypePropBoolean = (defaultValue = false) => ({
  control: 'boolean',
  defaultValue,
  table: {
    category: 'props',
    type: { summary: 'boolean' },
    defaultValue: { summary: defaultValue }
  }
})

export const argTypePropSelect = (defaultValue = '', options) => ({
  control: 'select',
  defaultValue,
  options,
  table: {
    category: 'props',
    type: { summary: `'${options.join(`'|'`)}'` },
    defaultValue: { summary: `'${defaultValue}'` }
  }
})

export const argTypePropArray = (defaultValue = []) => ({
  control: 'array',
  defaultValue,
  table: {
    category: 'props',
    type: { summary: 'Array' },
    defaultValue: { summary: `Array(${defaultValue.length})` }
  }
})

export const argTypePropObject = (defaultValue = null) => ({
  control: 'object',
  defaultValue,
  table: {
    category: 'props',
    type: { summary: 'Object' },
    defaultValue: { summary: defaultValue ? 'Object' : 'null' }
  }
})

export const argTypePropDate = (defaultValue = null) => ({
  control: 'date',
  defaultValue,
  table: {
    category: 'props',
    type: { summary: 'Date' },
    defaultValue: { summary: `Date(${defaultValue})` }
  }
})

export const disableControls = (story) => {
  story.parameters = { controls: { disable: true } }
}
