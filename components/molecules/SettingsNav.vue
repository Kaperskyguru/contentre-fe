<template>
  <div class="px-4 pt-4 my-8 space-y-6">
    <Hyperlink
      :to="{ name: 'settings' }"
      class="
        flex
        justify-between
        items-center
        py-2
        px-4
        text-sm
        font-semibold
        text-center text-gray-900
        bg-white
        hover:shadow-lg
      "
    >
      <div class="flex items-center">
        <div
          class="
            inline-flex
            shrink-0
            justify-center
            items-center
            mr-2
            w-10
            h-10
            text-2xl text-black
            bg-blue-100
          "
        >
          <svg
            width="16"
            height="20"
            viewBox="0 0 16 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.92001 13C8.90004 12.9386 8.86959 12.8811 8.83001 12.83L8.71001 12.68C8.61704 12.5863 8.50644 12.5119 8.38458 12.4611C8.26272 12.4103 8.13202 12.3842 8.00001 12.3842C7.86799 12.3842 7.73729 12.4103 7.61543 12.4611C7.49357 12.5119 7.38297 12.5863 7.29001 12.68C7.24233 12.7234 7.20183 12.774 7.17001 12.83C7.13043 12.8811 7.09998 12.9386 7.08001 13C7.05105 13.0602 7.03084 13.1241 7.02001 13.19C7.01511 13.2532 7.01511 13.3168 7.02001 13.38C7.01653 13.5144 7.0439 13.6478 7.10001 13.77C7.20177 14.0132 7.39544 14.2064 7.6389 14.3075C7.88235 14.4086 8.15589 14.4095 8.40001 14.31C8.52154 14.2556 8.63309 14.1813 8.73001 14.09C8.81996 13.9979 8.89126 13.8892 8.94001 13.77C8.99254 13.6467 9.01975 13.5141 9.02001 13.38C9.02491 13.3168 9.02491 13.2532 9.02001 13.19C8.99664 13.1219 8.96291 13.0578 8.92001 13ZM8.00001 5.36C7.73479 5.36 7.48044 5.46536 7.2929 5.6529C7.10536 5.84043 7.00001 6.09479 7.00001 6.36V9.36C7.00001 9.62522 7.10536 9.87957 7.2929 10.0671C7.48044 10.2546 7.73479 10.36 8.00001 10.36C8.26522 10.36 8.51958 10.2546 8.70711 10.0671C8.89465 9.87957 9.00001 9.62522 9.00001 9.36V6.36C9.00001 6.09479 8.89465 5.84043 8.70711 5.6529C8.51958 5.46536 8.26522 5.36 8.00001 5.36V5.36ZM15.63 1.65C15.5138 1.55602 15.3781 1.48928 15.2327 1.45467C15.0873 1.42006 14.9361 1.41846 14.79 1.45C13.7214 1.67395 12.6183 1.6768 11.5486 1.45839C10.4789 1.23997 9.46525 0.804917 8.57001 0.180003C8.40261 0.063876 8.20374 0.00164795 8.00001 0.00164795C7.79627 0.00164795 7.5974 0.063876 7.43001 0.180003C6.53476 0.804917 5.52108 1.23997 4.45137 1.45839C3.38166 1.6768 2.27857 1.67395 1.21001 1.45C1.06394 1.41846 0.912671 1.42006 0.767306 1.45467C0.621942 1.48928 0.486181 1.55602 0.370006 1.65C0.253985 1.74412 0.160527 1.86304 0.0964981 1.99802C0.0324695 2.133 -0.00050219 2.28061 5.78149e-06 2.43V9.88C-0.000883255 11.3138 0.340779 12.727 0.996541 14.002C1.6523 15.277 2.60319 16.3768 3.77001 17.21L7.42001 19.81C7.58937 19.9306 7.7921 19.9954 8.00001 19.9954C8.20791 19.9954 8.41064 19.9306 8.58001 19.81L12.23 17.21C13.3968 16.3768 14.3477 15.277 15.0035 14.002C15.6592 12.727 16.0009 11.3138 16 9.88V2.43C16.0005 2.28061 15.9675 2.133 15.9035 1.99802C15.8395 1.86304 15.746 1.74412 15.63 1.65V1.65ZM14 9.88C14.0008 10.9948 13.7353 12.0936 13.2257 13.085C12.716 14.0765 11.977 14.9319 11.07 15.58L8.00001 17.77L4.93001 15.58C4.02304 14.9319 3.28399 14.0765 2.77435 13.085C2.26472 12.0936 1.99924 10.9948 2.00001 9.88V3.58C4.09643 3.75944 6.19605 3.27303 8.00001 2.19C9.80397 3.27303 11.9036 3.75944 14 3.58V9.88Z"
              fill="#286963"
            />
          </svg>
        </div>
        <div>
          <span class="flex">Security</span>
          <span class="block text-xs text-teal-600"
            >Login, Change Password, and 2FA</span
          >
        </div>
      </div>
      <span class="text-black">
        <svg
          width="8"
          height="12"
          viewBox="0 0 8 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.66699 1.33334L6.33366 6L1.66699 10.6667"
            stroke="#102A27"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
    </Hyperlink>

    <Hyperlink
      :to="{ name: 'settings/notifications' }"
      class="
        flex
        justify-between
        items-center
        py-2
        px-4
        text-sm
        font-semibold
        text-center text-gray-900
        bg-white
        hover:shadow-lg
      "
    >
      <div class="flex items-center">
        <div
          class="
            inline-flex
            shrink-0
            justify-center
            items-center
            mr-2
            w-10
            h-10
            text-2xl text-black
            bg-blue-100
          "
        >
          <svg
            width="20"
            height="22"
            viewBox="0 0 20 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1.50083 12.7871V12.5681C1.53295 11.9202 1.7406 11.2925 2.10236 10.7496C2.7045 10.0975 3.1167 9.29831 3.29571 8.43598C3.29571 7.7695 3.29571 7.0935 3.35393 6.42703C3.65469 3.21842 6.82728 1 9.96106 1H10.0387C13.1725 1 16.345 3.21842 16.6555 6.42703C16.7137 7.0935 16.6555 7.7695 16.704 8.43598C16.8854 9.3003 17.2972 10.1019 17.8974 10.7591C18.2618 11.2972 18.4698 11.9227 18.4989 12.5681V12.7776C18.5206 13.648 18.2208 14.4968 17.6548 15.1674C16.907 15.9515 15.8921 16.4393 14.8024 16.5384C11.607 16.8812 8.38303 16.8812 5.18762 16.5384C4.09914 16.435 3.08576 15.9479 2.33521 15.1674C1.778 14.4963 1.48224 13.6526 1.50083 12.7871Z"
              stroke="#286963"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7.55469 19.8518C8.05396 20.4784 8.78715 20.884 9.59198 20.9787C10.3968 21.0734 11.2069 20.8495 11.843 20.3564C12.0387 20.2106 12.2147 20.041 12.3669 19.8518"
              stroke="#286963"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div>
          <span class="flex">Notification</span>
          <span class="block text-xs text-teal-600"
            >Control your notifications</span
          >
        </div>
      </div>
      <span class="text-black">
        <svg
          width="8"
          height="12"
          viewBox="0 0 8 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.66699 1.33334L6.33366 6L1.66699 10.6667"
            stroke="#102A27"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
    </Hyperlink>

    <Hyperlink
      :to="{ name: 'settings/subscription' }"
      class="
        flex
        justify-between
        items-center
        py-2
        px-4
        text-sm
        font-semibold
        text-center text-gray-900
        bg-white
        hover:shadow-lg
      "
    >
      <div class="flex items-center">
        <div
          class="
            inline-flex
            shrink-0
            justify-center
            items-center
            mr-2
            w-10
            h-10
            text-2xl text-[#286963]
            bg-blue-100
          "
        >
          <ShareIcon />
        </div>
        <div>
          <span class="flex">Subscriptions</span>
          <span class="block text-xs text-teal-600"
            >View your most active subscription</span
          >
        </div>
      </div>
      <span class="text-black">
        <svg
          width="8"
          height="12"
          viewBox="0 0 8 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.66699 1.33334L6.33366 6L1.66699 10.6667"
            stroke="#102A27"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
    </Hyperlink>

    <Hyperlink
      :to="{ name: 'settings/apps' }"
      class="
        flex
        justify-between
        items-center
        py-2
        px-4
        text-sm
        font-semibold
        text-gray-900
        bg-white
        hover:shadow-lg
      "
    >
      <div class="flex items-center">
        <div
          class="
            inline-flex
            shrink-0
            justify-center
            items-center
            mr-2
            w-10
            h-10
            text-2xl text-black
            bg-blue-100
          "
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 11H1C0.734784 11 0.48043 11.1054 0.292893 11.2929C0.105357 11.4804 0 11.7348 0 12V19C0 19.2652 0.105357 19.5196 0.292893 19.7071C0.48043 19.8946 0.734784 20 1 20H8C8.26522 20 8.51957 19.8946 8.70711 19.7071C8.89464 19.5196 9 19.2652 9 19V12C9 11.7348 8.89464 11.4804 8.70711 11.2929C8.51957 11.1054 8.26522 11 8 11ZM7 18H2V13H7V18ZM19 0H12C11.7348 0 11.4804 0.105357 11.2929 0.292893C11.1054 0.48043 11 0.734784 11 1V8C11 8.26522 11.1054 8.51957 11.2929 8.70711C11.4804 8.89464 11.7348 9 12 9H19C19.2652 9 19.5196 8.89464 19.7071 8.70711C19.8946 8.51957 20 8.26522 20 8V1C20 0.734784 19.8946 0.48043 19.7071 0.292893C19.5196 0.105357 19.2652 0 19 0ZM18 7H13V2H18V7ZM19 11H12C11.7348 11 11.4804 11.1054 11.2929 11.2929C11.1054 11.4804 11 11.7348 11 12V19C11 19.2652 11.1054 19.5196 11.2929 19.7071C11.4804 19.8946 11.7348 20 12 20H19C19.2652 20 19.5196 19.8946 19.7071 19.7071C19.8946 19.5196 20 19.2652 20 19V12C20 11.7348 19.8946 11.4804 19.7071 11.2929C19.5196 11.1054 19.2652 11 19 11ZM18 18H13V13H18V18ZM8 0H1C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1V8C0 8.26522 0.105357 8.51957 0.292893 8.70711C0.48043 8.89464 0.734784 9 1 9H8C8.26522 9 8.51957 8.89464 8.70711 8.70711C8.89464 8.51957 9 8.26522 9 8V1C9 0.734784 8.89464 0.48043 8.70711 0.292893C8.51957 0.105357 8.26522 0 8 0ZM7 7H2V2H7V7Z"
              fill="#286963"
            />
          </svg>
        </div>
        <div>
          <span class="flex">Connected Apps</span>
          <span class="block text-xs text-teal-600"
            >Manage and control your connected Apps</span
          >
        </div>
      </div>
      <span class="text-black">
        <svg
          width="8"
          height="12"
          viewBox="0 0 8 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.66699 1.33334L6.33366 6L1.66699 10.6667"
            stroke="#102A27"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
    </Hyperlink>

    <Hyperlink
      :to="{ name: 'settings/connects' }"
      class="
        flex
        justify-between
        items-center
        py-2
        px-4
        text-sm
        font-semibold
        text-center text-gray-900
        bg-white
        hover:shadow-lg
      "
    >
      <div class="flex items-center">
        <div
          class="
            inline-flex
            shrink-0
            justify-center
            items-center
            mr-2
            w-10
            h-10
            text-2xl text-[#286963]
            bg-blue-100
          "
        >
          <ShareIcon />
        </div>
        <div>
          <span class="flex">Connect</span>
          <span class="block text-xs text-teal-600"
            >Share and invite friends and team members</span
          >
        </div>
      </div>
      <span class="text-black">
        <svg
          width="8"
          height="12"
          viewBox="0 0 8 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.66699 1.33334L6.33366 6L1.66699 10.6667"
            stroke="#102A27"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
    </Hyperlink>

    <Hyperlink
      :to="{ name: 'settings/accounts' }"
      class="
        flex
        justify-between
        items-center
        py-2
        px-4
        text-sm
        font-semibold
        text-center text-gray-900
        bg-white
        hover:shadow-lg
      "
    >
      <div class="flex items-center">
        <div
          class="
            inline-flex
            shrink-0
            justify-center
            items-center
            mr-2
            w-10
            h-10
            text-2xl text-black
            bg-blue-100
          "
        >
          <svg
            width="20"
            height="19"
            viewBox="0 0 20 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.79535 17.4179H17.2774C18.4244 17.3579 19.3064 16.3809 19.2474 15.2339C19.2344 15.0019 19.1844 14.7729 19.0964 14.5589L11.8194 1.8229C11.2634 0.8179 9.99835 0.4539 8.99335 1.0109C8.65135 1.1989 8.36935 1.4809 8.18035 1.8229L0.903352 14.5589C0.471352 15.6229 0.983352 16.8349 2.04635 17.2679C2.26235 17.3549 2.49035 17.4049 2.72235 17.4179"
              stroke="#286963"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9.98926 10.3961V7.2961"
              stroke="#286963"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div>
          <span class="flex">Account Settings</span>
          <span class="flex text-xs text-teal-600">Delete account</span>
        </div>
      </div>
      <span class="text-black">
        <svg
          width="8"
          height="12"
          viewBox="0 0 8 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.66699 1.33334L6.33366 6L1.66699 10.6667"
            stroke="#102A27"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
    </Hyperlink>
  </div>
</template>

<script>
export default {
  components: {
    ShareIcon: () => import('~/assets/icons/share.svg?inline')
  }
}
</script>

<style>
</style>