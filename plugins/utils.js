/**
 * Check if value is an object.
 * @param mixed value
 * @returns boolean
 */
export const isObject = (value) => value && value.constructor === Object

/**
 * Check if value is an array.
 * @param mixed value
 * @returns boolean
 */
export const isArray = (value) => value && value.constructor === Array

/**
 * Check if value is a function.
 * @param mixed value
 * @returns boolean
 */
export const isFunction = (value) => value && value.constructor === Function

/**
 * Return cloned object.
 *
 * @param array|object value
 * @returns mixed
 */
export const objectClone = (value) => JSON.parse(JSON.stringify(value))

/**
 * Deep merge objects.
 * @param {any} target
 * @param  {...array} items
 * @returns object
 */
export const objectDeepMerge = (target, ...items) => {
  if (!items.length) {
    return target
  }

  const [source, ...sources] = items

  if (isObject(target) && isObject(source)) {
    Object.entries(source).forEach(([key, value]) => {
      if (isObject(value)) {
        target = {
          ...target,
          [key]: objectDeepMerge(target[key] || {}, value)
        }
      } else if (isArray(target[key]) && isArray(value)) {
        target = {
          ...target,
          [key]: [...target[key], ...value]
        }
      } else {
        target = {
          ...target,
          [key]: value
        }
      }
    })
  }

  return objectDeepMerge(target, ...sources)
}

/**
 * Get object nested key.
 *
 * @param mixed data
 * @param string strKey
 * @param mixed defaultValue
 * @returns mixed
 */
export const objectGetNestedKey = (data, strKey, defaultValue = null) => {
  if (!data || !(isObject(data) || isArray(data))) {
    data = {}
  }

  const keys = strKey.split('.')
  let value = objectClone(data)
  let loopOnKeysIsBroken = false

  for (let index = 0; index < keys.length; index++) {
    const key = (keys[index].match('\\[(.*)\\]') || [])[1] || keys[index]
    if (
      index === keys.length - 1 &&
      Object.prototype.hasOwnProperty.call(value, key)
    ) {
      value = value[key]
    } else if (isObject(value[key]) || isArray(value[key])) {
      value = value[key]
    } else {
      loopOnKeysIsBroken = true
      break
    }
  }

  return loopOnKeysIsBroken || value === null ? defaultValue : value
}

/**
 * Generate random string.
 * @param undefined|int length
 * @returns string
 */
export const stringGenerateRandom = (length) => {
  const base = `${Math.random().toString(36)}${Math.random().toString(36)}`
  return base.substring(0, length ?? Math.round(Math.random() * 20) + 6)
}

/**
 * Format IBAN
 * @param string|null value
 * @returns string
 */
export const formatIBAN = (value) =>
  value ? `${value.substr(0, 2).toUpperCase()} ...${value.substr(-4, 4)}` : ''

/**
 * Check if a callback is a function
 * if it's a function, then call it and apply params
 * otherwise return the callback value
 * @param mixed callback
 * @param array params
 * @return mixed
 */
export const checkCallback = (callback, params = []) => {
  if (isFunction(callback)) {
    return callback.apply(null, params)
  }

  return callback
}

export const errors = (type, params) => {
  const messages = {
    default: 'Value is valid',
    required: 'Value is required',
    requiredIf: 'Value is required',
    minLength: `Minimum length must be at least ${params.min}`,
    maxLength: `Maximum length allowed is ${params.max}`,
    minValue: `Minimum value must be at least ${params.min}`,
    maxValue: `Maximum value allowed is ${params.max}`,
    between: `Value must be between ${params.min} and ${params.max}`,
    alpha: 'Value must be alphabetical',
    alphaNum: 'Value must be alpha-numeric',
    numeric: 'Value must be numeric',
    integer: 'Value must be an integer',
    decimal: 'Value must be decimal',
    email: 'Value is not a valid email address',
    ipAddress: 'Value is not a valid IP address',
    macAddress: 'Value is not a valid MAC address',
    sameAs: 'Value must be equal to the other value',
    isURL: 'Value is not a valid URL address',
    isUsername: 'Value is not a valid Username',
    hasLetter: 'Please provide at least one letter',
    hasNumber: 'Please provide at least one number',
    hasSymbol: 'Please provide at least one special character',
    hasCapital: 'Please provide at least one capital character',
    hasNoSpace: 'No space is allowed'
  }

  return messages[type]
}

/**
 * Copy text to clipboard.
 * @param string text
 *
 * @returns Promise
 */
export const copyToClipboard = (text) => {
  return new Promise((resolve, reject) => {
    const fallbackCopyTextToClipboard = (text) => {
      const textArea = document.createElement('textarea')
      textArea.value = text

      textArea.style.top = '-10000'
      textArea.style.left = '-10000'
      textArea.style.position = 'fixed'

      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()

      try {
        const status = document.execCommand('copy')
        resolve({ status })
      } catch (error) {
        reject(error)
      }

      setTimeout(() => {
        document.body.removeChild(textArea)
      }, 50)
    }

    const copyTextToClipboard = (text) => {
      if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text)
        return
      }

      navigator.clipboard.writeText(text).then(
        () => {
          resolve({ status: true })
        },
        (error) => {
          reject(error)
        }
      )
    }

    copyTextToClipboard(text)
  })
}

/**
 * Generate random number between range
 *
 * @param number min
 * @param number max
 * @returns number
 */
export const numberGenerateBetween = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)

  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Generates a unique identifier, usefull for creating unique form fields `id`.
 *
 * @param id If an specific `id` is mannually provided, generation is just skiped.
 * @returns string
 */
export const uidGenerator = (id) => {
  if (!!id || id === 0) return id.toString()

  const block = () =>
    (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  return `${block()}${block()}-${block()}-${block()}-${block()}-${block()}${block()}${block()}`
}

/**
 * Debounce calling a callback.
 *
 * @param function fn.
 * @param number delay.
 * @returns function
 */
export const debounce = function (fn, delay) {
  let timeoutID = null
  return function () {
    clearTimeout(timeoutID)
    const args = arguments
    const that = this
    timeoutID = setTimeout(function () {
      fn.apply(that, args)
    }, delay)
  }
}

/**
 * Get window width.
 *
 * @returns float
 */
export const getWindowWidth = () => {
  const width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth

  return width
}

/**
 * Get window height.
 *
 * @returns float
 */
export const getWindowHeight = () => {
  const height =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight

  return height
}

/**
 * Get Feature value.
 *
 * @returns float
 */
export const getFeatureValue = (subscription, name) => {
  const feature = subscription?.features.find((item) => item.feature === name)
  if (!feature) return null
  return feature.value === 'unlimited' ? 0 : parseInt(feature.value)
}

/**
 * Get visible items based on show / hide props.
 *
 * @param array items
 * @returns array
 */
export const getVisibleItems = (items) =>
  items.filter(
    ({ show, hide }) =>
      [undefined, false].includes(checkCallback(hide)) &&
      [undefined, true].includes(checkCallback(show))
  )

export default function (_context, inject) {
  inject('utils', {
    checkCallback,
    copyToClipboard,
    errors,
    formatIBAN,
    isArray,
    isFunction,
    isObject,
    objectDeepMerge,
    objectGetNestedKey,
    stringGenerateRandom,
    numberGenerateBetween,
    uidGenerator,
    debounce,
    getWindowWidth,
    getWindowHeight,
    getVisibleItems,
    getFeatureValue
  })
}
