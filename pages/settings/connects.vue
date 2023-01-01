<template>
  <!-- Right Side -->
  <div class="w-full bg-white rounded-xl shadow md:w-10/12 md:h-64">
    <!-- Profile tab -->
    <!-- About Section -->
    <div class="bg-white rounded-xl shadow-sm">
      <div
        class="
          flex
          items-center
          py-6
          px-4
          space-x-2
          font-semibold
          leading-8
          text-gray-900
          border-b-2
        "
      >
        <span class="tracking-wide">Connect</span>
      </div>
    </div>
    <!-- End of about section -->

    <!-- contact -->
    <div class="py-6 px-4 bg-white rounded-sm shadow-sm">
      <div
        class="
          block
          py-6
          px-3
          w-full
          text-gray-700
          bg-white
          rounded-lg
          border border-gray-200
        "
      >
        <div class="block pb-2 font-bold text-black">
          <p class="mb-4 text-sm">Referrals</p>
        </div>
        <div class="block font-normal text-black">
          <p class="text-base text-gray-500">
            Copy and share your contentre link with others
          </p>
        </div>

        <div class="flex flex-col gap-4 justify-evenly md:flex-row">
          <div class="pb-2 w-full">
            <TextField
              id="copyTextInput"
              type="text"
              class="w-full text-sm"
              :disabled="true"
              :value="`https://app.contentre.io/auth/register?referrer=${currentUser.username}`"
            />
          </div>
          <Button :disabled="copied" @click.prevent="copyToClipboard">
            {{ copied ? 'Copied' : 'Copy Link' }}
          </Button>
        </div>

        <div class="block pb-2 mt-6 font-normal text-black">
          <p class="text-base text-gray-500">Invite friends to Contentre</p>
        </div>

        <div class="flex flex-col gap-4 justify-evenly mb-5 md:flex-row">
          <div class="pb-4 w-full">
            <TextField
              v-model="$v.fieldEmails.$model"
              type="email"
              :rows="2"
              :error="getValidationMessage($v.fieldEmails)"
              class="w-full text-sm"
              placeholder="Enter all your friend's email (separated by new line)"
            />
          </div>
          <Button type="submit" @click.prevent="onInviteFriends">
            Invite
          </Button>
        </div>

        <CustomText
          :text="`Total users referred: ${currentUser.totalUsersReferred}`"
        />
      </div>
    </div>

    <!-- End of contact --->

    <div class="py-6 px-4 bg-white rounded-sm shadow-sm">
      <div
        class="
          block
          py-6
          px-3
          w-full
          text-gray-700
          bg-white
          rounded-lg
          border border-gray-200
        "
      >
        <div class="block pb-2 font-bold text-black">
          <p class="mb-4 text-sm">Teams Members</p>
        </div>
        <div class="w-full">
          <Warning
            v-if="isUnderDevelopment"
            href="https://forms.gle/9PG1eC373JZLhFXK7"
            button-text="Give Feedback"
            >Team feature is under development</Warning
          >
        </div>
        <div class="block pb-2 mt-6 font-normal text-black">
          <p class="text-base text-gray-500">
            Invite team members to Contentre
          </p>
        </div>

        <div
          class="flex flex-col gap-4 justify-between mb-8 w-full md:flex-row"
        >
          <div class="pb-4 w-full">
            <TextField
              type="email"
              :rows="2"
              class="w-full text-sm"
              placeholder="Enter all your team member's email (separated by new line)"
            />
          </div>
          <Button :is-pro-feature="true" message="Coming Soon"> Invite </Button>
        </div>

        <section class="container px-4 mx-auto bg-white">
          <div class="overflow-x-auto px-4 -mx-4 h-60 sm:-mx-8">
            <DataGrid
              :columns="columns"
              :items="members"
              :total="members.length"
              :loading="$apollo.queries.members.loading"
              :item-clickable="true"
              @item-click="onItemClick"
            />
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { currentUser } from '~/components/mixins'
import { GET_MEMBERS, INVITE_FRIENDS } from '~/graphql'
import { required } from '~/plugins/validators'
export default {
  name: 'ConnectS',

  mixins: [currentUser],

  data: () => ({
    fieldEmails: '',
    memberId: null,
    members: [],
    sending: false,
    isUnderDevelopment: true,
    copied: false
  }),
  head() {
    return {
      title: 'Settings | Connects'
    }
  },

  validations: {
    fieldEmails: {
      required
    }
  },

  apollo: {
    members: {
      query: GET_MEMBERS,
      fetchPolicy: 'cache-and-network',
      variables() {
        return {
          contains: ''
        }
      },
      update(data) {
        return data.getMembers
      }
    }
  },

  computed: {
    columns() {
      return [
        {
          title: 'Name',
          key: 'name',
          component: () => 'DataGridCellIcon',
          componentOptions: this.getNameComponentOptions
        },

        {
          title: 'Username',
          key: 'username',

          component: () => {
            return 'DataGridCellIcon'
          },
          componentOptions: this.getUsernameComponentOptions
        },

        {
          title: 'Role',
          key: 'role',

          component: () => {
            return 'DataGridCellIcon'
          },
          componentOptions: this.getRoleComponentOptions
        },

        {
          title: 'Created',
          key: 'createdAt',
          component: () => 'DataGridCellIcon',
          componentOptions: this.getCreatedAtComponentOptions
        }
      ]
    }
  },

  methods: {
    copyToClipboard() {
      const copyText = document.getElementById('copyTextInput')

      /* Select the text field */
      copyText.select()
      copyText.setSelectionRange(0, 99999) /* For mobile devices */

      /* Copy the text inside the text field */
      navigator.clipboard.writeText(copyText.value)
      this.copied = true
    },
    onItemClick({ id }) {
      this.memberId = id
    },
    async onInviteFriends() {
      if (await this.isValidationInvalid()) return

      this.sending = true
      try {
        await this.$apollo.mutate({
          mutation: INVITE_FRIENDS,
          variables: {
            data: {
              emails: this.fieldEmails.split(/\r?\n/)
            }
          }
        })
        this.$toast.positive('Friends invited successfully')
        this.sending = false
      } catch (error) {
        this.$toast.negative(error.message)
        this.sending = false
      }
    },

    getCreatedAtComponentOptions({ createdAt }) {
      return !createdAt
        ? {
            style: 'secondary',
            value: 'No date provided'
          }
        : new Date(createdAt) > new Date()
        ? {
            type: 'icon',
            size: 14,
            name: 'Scheduled',
            value: this.$d(new Date(createdAt), 'dateShorter')
          }
        : {
            value: this.$d(new Date(createdAt), 'dateShorter')
          }
    },

    getNameComponentOptions({ name }) {
      return name
        ? {
            tooltip: true,
            style: !name ? 'secondary' : undefined,
            value: name || 'No name provided'
          }
        : {}
    },

    getUsernameComponentOptions({ username }) {
      return username
        ? {
            tooltip: true,
            style: !username ? 'secondary' : undefined,
            value: username || 'No username provided'
          }
        : {}
    },

    getRoleComponentOptions({ role }) {
      return role
        ? {
            tooltip: true,
            style: !role ? 'secondary' : undefined,
            value: role || 'No role provided'
          }
        : {}
    }
  }
}
</script>

<style>
</style>