<template>
  <section>
    <!-- -===========nav========== -->

    <section id="main" class="pt-10 mb-10">
      <!-- hero section -->
      <div class="mx-auto w-3/4 text-center lg:w-2/5">
        <h1 class="text-3xl font-bold md:text-4xl">Billing Address</h1>
        <p class="text-sm md:text-lg">
          Please enter your billing address below. We collect this information
          to help combat fraud, and keep your payment secure.
        </p>
      </div>
      <!-- hero section -->
    </section>

    <div class="container p-8 mx-auto w-3/4 bg-white rounded lg:w-2/5">
      <form @submit.prevent="addAddress">
        <DropdownField
          v-model="$v.fieldCountry.$model"
          label="COUNTRY"
          :error="getValidationMessage($v.fieldCountry)"
        >
          <option
            v-for="(item, itemIndex) in countries"
            :key="itemIndex"
            :value="item.country"
          >
            {{ item.country }}
          </option>
        </DropdownField>

        <div class="md:flex md:justify-between md:space-x-4">
          <div class="py-2 mb-2 w-full">
            <TextField
              v-model="$v.fieldStreet.$model"
              type="text"
              class="py-2 mb-2 w-full text-sm"
              label="STREET ADDRESS"
              placeholder="Enter your address"
              :error="getValidationMessage($v.fieldStreet)"
            />

            <TextField
              v-model="$v.fieldState.$model"
              type="text"
              class="py-2 mb-2 w-full text-sm"
              label="STATE/REGION"
              placeholder="Enter your state/region"
              :error="getValidationMessage($v.fieldState)"
            />
          </div>
          <div class="py-2 mb-2 w-full">
            <TextField
              v-model="$v.fieldCity.$model"
              type="text"
              class="py-2 mb-2 w-full text-sm"
              label="CITY"
              placeholder="Enter your city"
              :error="getValidationMessage($v.fieldCity)"
            />
            <TextField
              v-model="$v.fieldZip.$model"
              type="text"
              class="py-2 mb-2 w-full text-sm"
              label="ZIP CODE"
              placeholder="Enter your zip code"
              :error="getValidationMessage($v.fieldZip)"
            />
          </div>
        </div>

        <Button class="py-2 px-4 mt-4 w-full" type="submit">
          Save Address</Button
        >
      </form>
    </div>
  </section>
</template>

<script>
import { GET_CURRENT_USER, UPDATE_USER } from '~/graphql'
export default {
  name: 'SubscriptionAddress',

  props: {
    user: {
      type: [Array, Object],
      default: () => {}
    }
  },

  data: () => ({
    fieldCountry: '',
    fieldStreet: '',
    fieldCity: '',
    fieldState: '',
    fieldZip: '',
    sending: false,
    countries: [
      { country: 'Afghanistan,code', code: 'AF' },
      { country: 'Aland Islands', code: 'AX' },
      { country: 'Albania', code: 'AL' },
      { country: 'Algeria', code: 'DZ' },
      { country: 'American Samoa', code: 'AS' },
      { country: 'Andorra', code: 'AD' },
      { country: 'Angola', code: 'AO' },
      { country: 'Anguilla', code: 'AI' },
      { country: 'Antigua and Barbuda', code: 'AG' },
      { country: 'Argentina', code: 'AR' },
      { country: 'Armenia', code: 'AM' },
      { country: 'Aruba', code: 'AW' },
      { country: 'Australia', code: 'AU' },
      { country: 'Austria', code: 'AT' },
      { country: 'Azerbaijan', code: 'AZ' },
      { country: 'Bahamas', code: 'BS' },
      { country: 'Bahrain', code: 'BH' },
      { country: 'Bangladesh', code: 'BD' },
      { country: 'Barbados', code: 'BB' },
      { country: 'Belarus', code: 'BY' },
      { country: 'Belgium', code: 'BE' },
      { country: 'Belize', code: 'BZ' },
      { country: 'Benin', code: 'BJ' },
      { country: 'Bermuda', code: 'BM' },
      { country: 'Bhutan', code: 'BT' },
      { country: 'Bolivia', code: 'BO' },
      { country: 'Bonaire, Sint Eustatius and Saba', code: 'BQ' },
      { country: 'Bosnia and Herzegovina', code: 'BA' },
      { country: 'Botswana', code: 'BW' },
      { country: 'Bouvet Island', code: 'BV' },
      { country: 'Brazil', code: 'BR' },
      { country: 'Brit. Indian Ocean', code: 'IO' },
      { country: 'British Virgin Islands', code: 'VG' },
      { country: 'Brunei', code: 'BN' },
      { country: 'Bulgaria', code: 'BG' },
      { country: 'Burkina Faso', code: 'BF' },
      { country: 'Burundi', code: 'BI' },
      { country: 'Cambodia', code: 'KH' },
      { country: 'Cameroon', code: 'CM' },
      { country: 'Canada', code: 'CA' },
      { country: 'Cape Verde', code: 'CV' },
      { country: 'Cayman Islands', code: 'KY' },
      { country: 'Central African Republic', code: 'CF' },
      { country: 'Chad', code: 'TD' },
      { country: 'Chile', code: 'CL' },
      { country: 'China', code: 'CN' },
      { country: 'Christmas Island', code: 'CX' },
      { country: 'Cocos Islands', code: 'CC' },
      { country: 'Colombia', code: 'CO' },
      { country: 'Comoros', code: 'KM' },
      { country: 'Cook Islands', code: 'CK' },
      { country: 'Costa Rica', code: 'CR' },
      { country: "Cote D'Ivoire", code: 'CI' },
      { country: 'Croatia', code: 'HR' },
      { country: 'Curaçao', code: 'CW' },
      { country: 'Cyprus', code: 'CY' },
      { country: 'Czech Republic', code: 'CZ' },
      { country: 'Denmark', code: 'DK' },
      { country: 'Djibouti', code: 'DJ' },
      { country: 'Dominica', code: 'DM' },
      { country: 'Dominican Republic', code: 'DO' },
      { country: 'Ecuador', code: 'EC' },
      { country: 'Egypt', code: 'EG' },
      { country: 'El Salvador', code: 'SV' },
      { country: 'Equatorial Guinea', code: 'GQ' },
      { country: 'Eritrea', code: 'ER' },
      { country: 'Estonia', code: 'EE' },
      { country: 'Ethiopia', code: 'ET' },
      { country: 'Falkland Islands', code: 'FK' },
      { country: 'Faroe Islands', code: 'FO' },
      { country: 'Fiji', code: 'FJ' },
      { country: 'Finland', code: 'FI' },
      { country: 'France', code: 'FR' },
      { country: 'French Guiana', code: 'GF' },
      { country: 'French Polynesia', code: 'PF' },
      { country: 'French Southern Te}rr.', code: 'TF' },
      { country: 'Gabon', code: 'GA' },
      { country: 'Gambia', code: 'GM' },
      { country: 'Georgia', code: 'GE' },
      { country: 'Germany', code: 'DE' },
      { country: 'Ghana', code: 'GH' },
      { country: 'Gibraltar', code: 'GI' },
      { country: 'Greece', code: 'GR' },
      { country: 'Greenland', code: 'GL' },
      { country: 'Grenada', code: 'GD' },
      { country: 'Guadeloupe', code: 'GP' },
      { country: 'Guam', code: 'GU' },
      { country: 'Guatemala', code: 'GT' },
      { country: 'Guernsey', code: 'GG' },
      { country: 'Guinea', code: 'GN' },
      { country: 'Guinea-Bissau', code: 'GW' },
      { country: 'Guyana', code: 'GY' },
      { country: 'Haiti', code: 'HT' },
      { country: 'Heard/ Mcdonald Islands', code: 'HM' },
      { country: 'Holy See/ Vatican City', code: 'VA' },
      { country: 'Honduras', code: 'HN' },
      { country: 'Hong Kong', code: 'HK' },
      { country: 'Hungary', code: 'HU' },
      { country: 'Iceland', code: 'IS' },
      { country: 'India', code: 'IN' },
      { country: 'Indonesia', code: 'ID' },
      { country: 'Iraq', code: 'IQ' },
      { country: 'Ireland', code: 'IE' },
      { country: 'Isle of Man', code: 'IM' },
      { country: 'Israel', code: 'IL' },
      { country: 'Italy', code: 'IT' },
      { country: 'Jamaica', code: 'JM' },
      { country: 'Japan', code: 'JP' },
      { country: 'Jersey', code: 'JE' },
      { country: 'Jordan', code: 'JO' },
      { country: 'Kazakhstan', code: 'KZ' },
      { country: 'Kenya', code: 'KE' },
      { country: 'Kiribati', code: 'KI' },
      { country: 'Kuwait', code: 'KW' },
      { country: 'Kyrgyzstan', code: 'KG' },
      { country: "Lao People's DR", code: 'LA' },
      { country: 'Latvia', code: 'LV' },
      { country: 'Lebanon', code: 'LB' },
      { country: 'Lesotho', code: 'LS' },
      { country: 'Liberia', code: 'LR' },
      { country: 'Liechtenstein', code: 'LI' },
      { country: 'Lithuania', code: 'LT' },
      { country: 'Luxembourg', code: 'LU' },
      { country: 'Macao', code: 'MO' },
      { country: 'Macedonia', code: 'MK' },
      { country: 'Madagascar', code: 'MG' },
      { country: 'Malawi', code: 'MW' },
      { country: 'Malaysia', code: 'MY' },
      { country: 'Maldives', code: 'MV' },
      { country: 'Mali', code: 'ML' },
      { country: 'Malta', code: 'MT' },
      { country: 'Marshall Islands', code: 'MH' },
      { country: 'Martinique', code: 'MQ' },
      { country: 'Mauritania', code: 'MR' },
      { country: 'Mauritius', code: 'MU' },
      { country: 'Mayotte', code: 'YT' },
      { country: 'Mexico', code: 'MX' },
      { country: 'Micronesia', code: 'FM' },
      { country: 'Moldova', code: 'MD' },
      { country: 'Monaco', code: 'MC' },
      { country: 'Mongolia', code: 'MN' },
      { country: 'Montenegro', code: 'ME' },
      { country: 'Montserrat', code: 'MS' },
      { country: 'Morocco', code: 'MA' },
      { country: 'Mozambique', code: 'MZ' },
      { country: 'Myanmar', code: 'MM' },
      { country: 'Namibia', code: 'NA' },
      { country: 'Nauru', code: 'NR' },
      { country: 'Nepal', code: 'NP' },
      { country: 'Netherlands', code: 'NL' },
      { country: 'Netherlands Antilles', code: 'AN' },
      { country: 'New Caledonia', code: 'NC' },
      { country: 'New Zealand', code: 'NZ' },
      { country: 'Niger', code: 'NE' },
      { country: 'Nigeria', code: 'NG' },
      { country: 'Niue', code: 'NU' },
      { country: 'Norfolk Island', code: 'NF' },
      { country: 'Northern Mariana Islands', code: 'MP' },
      { country: 'Norway', code: 'NO' },
      { country: 'Oman', code: 'OM' },
      { country: 'Pakistan', code: 'PK' },
      { country: 'Palau', code: 'PW' },
      { country: 'Palestinian Territory', code: 'PS' },
      { country: 'Panama', code: 'PA' },
      { country: 'Papua New Guinea', code: 'PG' },
      { country: 'Paraguay', code: 'PY' },
      { country: 'Peru', code: 'PE' },
      { country: 'Philippines', code: 'PH' },
      { country: 'Pitcairn', code: 'PN' },
      { country: 'Poland', code: 'PL' },
      { country: 'Portugal', code: 'PT' },
      { country: 'Puerto Rico', code: 'PR' },
      { country: 'Qatar', code: 'QA' },
      { country: 'Republic of Congo', code: 'CG' },
      { country: 'Republic of Serbia', code: 'RS' },
      { country: 'Reunion', code: 'RE' },
      { country: 'Romania', code: 'RO' },
      { country: 'Russian Federation', code: 'RU' },
      { country: 'Rwanda', code: 'RW' },
      { country: 'S. Georgia/ Sandwich Islands', code: 'GS' },
      { country: 'Saint Helena', code: 'SH' },
      { country: 'Saint Kitts and Nevis', code: 'KN' },
      { country: 'Saint Lucia', code: 'LC' },
      { country: 'Saint Martin', code: 'MF' },
      { country: 'Saint Pierre and Miquelon', code: 'PM' },
      { country: 'Saint Vincent/ Grenadines', code: 'VC' },
      { country: 'Samoa', code: 'WS' },
      { country: 'San Marino', code: 'SM' },
      { country: 'Sao Tome and Principe', code: 'ST' },
      { country: 'Saudi Arabia', code: 'SA' },
      { country: 'Senegal', code: 'SN' },
      { country: 'Seychelles', code: 'SC' },
      { country: 'Sierra Leone', code: 'SL' },
      { country: 'Singapore', code: 'SG' },
      { country: 'Slovakia', code: 'SK' },
      { country: 'Slovenia', code: 'SI' },
      { country: 'Solomon Islands', code: 'SB' },
      { country: 'South Africa', code: 'ZA' },
      { country: 'South Korea', code: 'KR' },
      { country: 'Spain', code: 'ES' },
      { country: 'Sri Lanka', code: 'LK' },
      { country: 'Sudan', code: 'SD' },
      { country: 'Suriname', code: 'SR' },
      { country: 'Svalbard and Jan Mayen', code: 'SJ' },
      { country: 'Swaziland', code: 'SZ' },
      { country: 'Sweden', code: 'SE' },
      { country: 'Switzerland', code: 'CH' },
      { country: 'Taiwan', code: 'TW' },
      { country: 'Tajikistan', code: 'TJ' },
      { country: 'Tanzania', code: 'TZ' },
      { country: 'Thailand', code: 'TH' },
      { country: 'Timor-Leste', code: 'TL' },
      { country: 'Togo', code: 'TG' },
      { country: 'Tokelau', code: 'TK' },
      { country: 'Tonga', code: 'TO' },
      { country: 'Trinidad and Tobago', code: 'TT' },
      { country: 'Tunisia', code: 'TN' },
      { country: 'Turkey', code: 'TR' },
      { country: 'Turkmenistan', code: 'TM' },
      { country: 'Turks and Caicos Islands', code: 'TC' },
      { country: 'Tuvalu', code: 'TV' },
      { country: 'U.S. Virgin Islands', code: 'VI' },
      { country: 'Uganda', code: 'UG' },
      { country: 'Ukraine', code: 'UA' },
      { country: 'United Arab Emirates', code: 'AE' },
      { country: 'United Kingdom', code: 'GB' },
      { country: 'United States', code: 'US' },
      { country: 'United States (M.O.I.)', code: 'UM' },
      { country: 'Uruguay', code: 'UY' },
      { country: 'Uzbekistan', code: 'UZ' },
      { country: 'Vanuatu', code: 'VU' },
      { country: 'Vietnam', code: 'VN' },
      { country: 'Wallis and Futuna', code: 'WF' },
      { country: 'Western Sahara', code: 'EH' },
      { country: 'Zambia', code: 'ZM' },
      { country: 'Zimbabwe', code: 'ZW' }
    ]
  }),

  validations: {
    fieldCountry: {},
    fieldStreet: {},
    fieldCity: {},
    fieldState: {},
    fieldZip: {},
    honeyPot: {}
  },

  async mounted() {
    this.fieldStreet = this.user?.homeAddress
    this.fieldCountry = this.user?.country

    await this.$segment({
      operation: 'identify'
    })

    await this.$segment({
      eventName: 'Viewed Address Page'
    })
  },

  methods: {
    getCode(country) {
      return this.countries.find((item) => item.country === country)?.code
    },
    async addAddress() {
      if (await this.isValidationInvalid()) return
      const address = {
        country: this.fieldCountry,
        state: this.fieldState,
        street: this.fieldStreet,
        city: this.fieldCity,
        zip: this.fieldZip,
        code: this.getCode(this.fieldCountry)
      }

      const homeAddress = `${address.street},${address.city},${address.state},${address.zip}`

      try {
        await this.$apollo.mutate({
          mutation: UPDATE_USER,
          variables: {
            input: {
              homeAddress,
              country: address.country
            }
          },
          update: (cache, { data: { updateUser } }) => {
            cache.writeQuery({
              query: GET_CURRENT_USER,
              data: { getCurrentUser: updateUser }
            })
          }
        })

        this.sending = false

        this.$emit('getAddress', address)

        this.$router.push({
          path: '/subscriptions',
          query: { ...this.$route.query, address: true, tab: 'Payment' }
        })
      } catch (error) {
        this.$toast.negative(error.message)
        this.sending = false
      }
    }
  }
}
</script>

<style>
</style>