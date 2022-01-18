<template>
  <form class="w-full">
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label
          class="block text-gray-700 text-xs font-bold mb-2"
          for="grid-first-name"
        >
          First Name
        </label>
        <input
          type="email"
          class="
            w-full
            mt-2
            p-3
            text-sm
            border
            rounded-md
            focus:border-blue-400
            focus:outline-none
            focus:ring-1
            focus:ring-blue-600
          "
          placeholder="Jane"
        />
      </div>
      <div class="w-full md:w-1/2 px-3">
        <label
          class="block text-gray-700 text-xs font-bold mb-2"
          for="grid-last-name"
        >
          Last Name
        </label>
        <input
          type="email"
          class="
            w-full
            mt-2
            p-3
            text-sm
            border
            rounded-md
            focus:border-blue-400
            focus:outline-none
            focus:ring-1
            focus:ring-blue-600
          "
          placeholder="Smith"
        />
      </div>
    </div>

    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label
          class="blocktext-gray-700 text-xs font-bold mb-2"
          for="grid-first-name"
        >
          Job Title
        </label>
        <input
          type="email"
          class="
            w-full
            mt-2
            p-3
            text-sm
            border
            rounded-md
            focus:border-blue-400
            focus:outline-none
            focus:ring-1
            focus:ring-blue-600
          "
          placeholder="Content Creator | Article Writer"
        />
      </div>
      <div class="w-full md:w-1/2 px-3">
        <label
          class="block text-gray-700 text-xs font-bold mb-2"
          for="grid-last-name"
        >
          Home Address
        </label>
        <input
          type="email"
          class="
            w-full
            mt-2
            p-3
            text-sm
            border
            rounded-md
            focus:border-blue-400
            focus:outline-none
            focus:ring-1
            focus:ring-blue-600
          "
          placeholder="16, Challenge, Ibadan - Oyo State,Nigeria"
        />
      </div>
    </div>

    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label
          class="block text-gray-700 text-xs font-bold mb-2"
          for="grid-first-name"
        >
          Email Address
        </label>
        <input
          type="email"
          class="
            w-full
            mt-2
            p-3
            text-sm
            border
            rounded-md
            focus:border-blue-400
            focus:outline-none
            focus:ring-1
            focus:ring-blue-600
          "
          placeholder="Jane"
        />
      </div>
      <div class="w-full md:w-1/2 px-3">
        <label
          class="
            block
            uppercase
            tracking-wide
            text-gray-700 text-xs
            font-bold
            mb-2
          "
          for="grid-last-name"
        >
          Phone Number
        </label>
        <input
          type="email"
          class="
            w-full
            mt-2
            p-3
            text-sm
            border
            rounded-md
            focus:border-blue-400
            focus:outline-none
            focus:ring-1
            focus:ring-blue-600
          "
          placeholder="Janesmith@gmail.com"
        />
      </div>
    </div>

    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full px-3">
        <label
          class="block tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-password"
        >
          Bio
        </label>
        <textarea
          rows="10"
          class="
            block
            w-full
            bg-white
            text-gray-700
            border border-gray-200
            rounded-lg
            py-3
            px-4
            mb-3
            leading-tight
            focus:outline-none focus:bg-white focus:border-gray-500
          "
          placeholder="Minimum of 600 words"
        >
        </textarea>
      </div>
    </div>
  </form>
</template>

<script>
export default {}
</script>

<style>
</style>