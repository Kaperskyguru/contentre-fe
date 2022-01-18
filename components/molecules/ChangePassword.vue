<template>
  <div
    class="
      w-full
      px-3
      py-6
      block
      bg-white
      text-gray-700
      border border-gray-200
      rounded-lg
    "
  >
    <div class="block text-black font-bold pb-2">
      <p class="text-sm mb-4">Change Password</p>
    </div>

    <!-- ====== Cards Section Start -->
    <div class="container">
      <div class="flex flex-wrap -mx-2">
        <div class="w-full md:w-1/2 xl:w-1/2 px-4">
          <div>
            <label class="block text-sm text-gray-600">
              Current Password
            </label>
            <input
              type="text"
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
              placeholder="..................."
            />
          </div>
          <div class="pt-4">
            <label class="block text-sm pt-2">New Password </label>
            <input
              type="text"
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
              placeholder="Enter new password"
            />
          </div>

          <div class="pt-4">
            <label class="block text-sm"> Confirm New Password </label>
            <input
              type="text"
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
              placeholder="Repeat new password"
            />
          </div>
        </div>
        <div class="w-full md:w-1/2 xl:w-1/2 px-4">
          <div class="bg-teal-300 rounded-lg shadow overflow-hidden mb-10 my-8">
            <div class="p-4 sm:p-9 md:p-7 xl:p-9 text-sm">
              <p class="block text-black font-bold">Password Rules</p>
              <p class="text-body-color leading-relaxed mb-7">
                To create a new password, you need to meet the following
                requirements:
              </p>
              <ul class="list-disc px-4">
                <li>Minimum of 8 characters</li>
                <li>At least one special character</li>
                <li>At least one number</li>
                <li>Can not be the same as the previous</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- ====== Cards Section End -->
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>