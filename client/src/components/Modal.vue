<template>
  <div
    class="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center"
  >
    <div class="fixed inset-0 transition-opacity">
      <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
    </div>
    <div
      class="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
    >
      <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div class="sm:flex sm:items-start">
          <div class="mt-3 text-center sm:mt-0 sm:text-left mx-auto">
            <img src="../assets/room.jpg" width="400" />
            <table class="table-auto">
              <tr>
                <td class="p-2">Name</td>
                <td class="p-2">{{room.name}}</td>
              </tr>
              <tr>
                <td class="p-2">Description</td>
                <td class="p-2">{{room.description}}</td>
              </tr>
              <tr>
                <td class="p-2">Capacity</td>
                <td class="p-2">{{room.capacity}}</td>
              </tr>
              <tr>
                <td class="p-2">Assets</td>
                <td class="p-2">{{room.assets}}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
          <button
            type="button"
            @click="toggleModal"
            class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
          >Close</button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "modal",
  props: {
    room: Object,
    toggleModal: Function
  }
};
</script>