export default {
  strategy: 'no_prefix',
  detectBrowserLanguage: {
    useCookie: true
  },
  langDir: '~/locales/',
  defaultLocale: 'en-GB',
  locales: [
    {
      code: 'de-DE',
      iso: 'de-DE',
      file: 'de.json',
      name: 'Deutsch',
      fullName: 'Deutsch (Deutschland)',
      dir: 'ltr'
    },
    {
      code: 'en-GB',
      iso: 'en-GB',
      file: 'en.json',
      name: 'English',
      fullName: 'English (United Kingdom)',
      dir: 'ltr'
    },
    {
      code: 'fr-FR',
      iso: 'fr-FR',
      file: 'fr.json',
      name: 'Français',
      fullName: 'Français (France)',
      dir: 'ltr'
    }
  ],
  vueI18n: {
    fallbackLocale: 'en-GB',
    dateTimeFormats: {
      'de-DE': {
        monthShort: {
          month: 'short'
        },
        monthLong: {
          month: 'long'
        },
        monthYearShort: {
          month: 'short',
          year: '2-digit'
        },
        monthShortYearLong: {
          month: 'short',
          year: 'numeric'
        },
        monthDayShortLong: {
          month: 'short',
          day: '2-digit'
        },
        monthYearLong: {
          month: 'long',
          year: 'numeric'
        },
        dateShorter: {
          year: '2-digit',
          month: '2-digit',
          day: '2-digit'
        },
        dateShort: {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        },
        dateLong: {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        },
        dateTimeShort: {
          dateStyle: 'short',
          timeStyle: 'short'
        },
        dateTimeLong: {
          dateStyle: 'long',
          timeStyle: 'short'
        }
      },

      'en-GB': {
        monthShort: {
          month: 'short'
        },
        monthLong: {
          month: 'long'
        },
        monthYearShort: {
          month: 'short',
          year: '2-digit'
        },
        monthDayShort: {
          month: '2-digit',
          day: '2-digit'
        },
        monthDayShortLong: {
          month: 'short',
          day: '2-digit'
        },
        monthShortYearLong: {
          month: 'short',
          year: 'numeric'
        },
        monthYearLong: {
          month: 'long',
          year: 'numeric'
        },
        dateShorter: {
          year: '2-digit',
          month: '2-digit',
          day: '2-digit'
        },
        dateShort: {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        },
        dateLong: {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        },
        dateTimeShort: {
          dateStyle: 'short',
          timeStyle: 'short'
        },
        dateTimeLong: {
          dateStyle: 'long',
          timeStyle: 'short'
        },
        dayMonthOnly: {
          day: '2-digit',
          month: '2-digit'
        }
      },

      'fr-FR': {
        monthShort: {
          month: 'short'
        },
        monthLong: {
          month: 'long'
        },
        monthYearShort: {
          month: 'short',
          year: '2-digit'
        },
        monthShortYearLong: {
          month: 'short',
          year: 'numeric'
        },
        monthYearLong: {
          month: 'long',
          year: 'numeric'
        },
        monthDayShortLong: {
          month: 'short',
          day: '2-digit'
        },
        dateShorter: {
          year: '2-digit',
          month: '2-digit',
          day: '2-digit'
        },
        dateShort: {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        },
        dateLong: {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        },
        dateTimeShort: {
          dateStyle: 'short',
          timeStyle: 'short'
        },
        dateTimeLong: {
          dateStyle: 'long',
          timeStyle: 'short'
        }
      }
    },
    numberFormats: {
      'de-DE': {
        integer: { maximumFractionDigits: 0 },
        float: { minimumFractionDigits: 2, maximumFractionDigits: 2 }
      },

      'en-GB': {
        integer: { maximumFractionDigits: 0 },
        float: { minimumFractionDigits: 2, maximumFractionDigits: 2 }
      },

      'fr-FR': {
        integer: { maximumFractionDigits: 0 },
        float: { minimumFractionDigits: 2, maximumFractionDigits: 2 }
      }
    }
  }
}
