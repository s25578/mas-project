<template>
  <nav class="bg-gray-800 p-4 flex justify-between items-center">

    <!-- Logo -->
    <div class="flex items-center space-x-4">
      <div class="text-2xl font-bold text-white">TradeMaster</div>
      <div class="flex space-x-4">
        <a href="#" class="hover:text-blue-400 px-2">Trade</a>
        <a href="#" class="hover:text-blue-400 px-2">Assets</a>
        <a href="#" class="hover:text-blue-400 px-2">Deposit</a>
        <a href="#" class="hover:text-blue-400 px-2">Withdraw</a>
      </div>
    </div>

    <!-- User Account -->
    <div class="flex">
      <div class="flex items-center space-x-4 mr-5">
        <div class="flex space-x-4">
          <a href="#" class="text-blue-400 px-2">$11,599 <span class="ml-1 text-green-700">+6.42%</span></a>
        </div>
      </div>
      <div class="relative" @click="toggleDropdown">
        <div class="flex items-center space-x-2 cursor-pointer hover:text-blue-400">
          <span class="text-white">John Doe</span>
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        <div v-if="dropdownOpen" class="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg z-50">
          <a href="#" class="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-600">Profile</a>
          <a href="#" class="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-600">Assets</a>
          <a href="#" class="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-600">History</a>
          <a href="#" class="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-600">Logout</a>
        </div>
      </div>
    </div>

  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const dropdownOpen = ref(false);

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value;
}

function closeDropdown() {
  dropdownOpen.value = false;
}

function handleClickOutside(event: MouseEvent) {
  const path = event.composedPath();
  if (!path.includes((document.getElementById('tradingview-widget')))) {
    closeDropdown();
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
nav a {
  font-weight: 500;
}
</style>
