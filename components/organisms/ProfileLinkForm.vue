<template>
  <form class="w-full">
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label
          class="block text-gray-700 text-xs font-bold mb-2"
          for="grid-first-name"
        >
          Channel Name
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
          placeholder="Medium"
        />
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full px-3">
        <label
          class="block text-gray-700 text-xs font-bold mb-2"
          for="grid-password"
        >
          Upload Link
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
          placeholder="https://www.nation.so/Joyce-Eboh-0d027018a40d4245bd58a8e6081e90f1"
        />
      </div>
    </div>

    <section class="py-4 flex flex items-center flex-wrap">
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label class="block text-gray-700 text-xs font-bold">
          Upload Image
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
          placeholder="img1532683_medd.jpg"
        />
      </div>

      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label class="block text-gray-700 text-xs font-bold mb-2 ml-2">
          Upload Image
        </label>
        <div class="relative inline-flex ml-2">
          <svg
            class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 412 232"
          >
            <path
              d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
              fill="#648299"
              fill-rule="nonzero"
            ></path>
          </svg>
          <select
            class="
              border border-gray-300
              rounded-sm
              text-gray-600
              h-10
              pl-5
              pr-10
              bg-white
              hover:border-gray-400
              focus:outline-none
              appearance-none
            "
          >
            <option>Pen</option>
            <option>Red</option>
            <option>Blue</option>
            <option>Yellow</option>
            <option>Black</option>
            <option>Orange</option>
          </select>
        </div>
      </div>
    </section>

    <div class="w-full px-3 flex items-center justify-center mt-4">
      <button
        class="
          shadow
          form-btn
          w-1/2
          focus:shadow-outline
          text-white
          font-bold
          py-4
          px-6
          rounded-lg
        "
        type="submit"
      >
        Save
      </button>
    </div>
  </form>
</template>

<script>
export default {}
</script>

<style>
</style>