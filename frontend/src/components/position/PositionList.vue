<template>
  <div class="lg:col-span-4  bg-gray-800 p-4 rounded-md">
    <h2 class="text-xl mb-4">Positions</h2>
    <table class="min-w-full table-auto">
      <thead>
      <tr class="bg-gray-700">
        <th class="px-4 py-2">Asset</th>
        <th class="px-4 py-2">Direction</th>
        <th class="px-4 py-2">Size</th>
        <th class="px-4 py-2">Entry Price</th>
        <th class="px-4 py-2">PNL</th>
        <th class="px-4 py-2">Date</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="position in positions" :key="position.id" class="bg-gray-600">
        <td class="border border-gray-700 border-colo px-4 py-2">{{ position.asset.name }}</td>

        <td :class="{
      'border border-gray-700 px-4 py-2': true,
      'text-red-500': position.direction === 'sell',
      'text-green-500': position.direction !== 'sell'
    }">{{ position.direction === 'sell' ? 'short' : 'long' }}</td>
        <td class="border border-gray-700 border-colo px-4 py-2">{{ position.size }} <span class="bg-gray-500 text-gray-300 rounded-md p-1 text-sm">x{{ position.leverage }}</span></td>
        <td class="border border-gray-700 px-4 py-2">{{ position.openPrice }}</td>
        <td class="border border-gray-700 px-4 py-2">{{ position.pnl }} <span class="bg-red-800 text-gray-300 rounded-md ml-2 p-1 text-sm cursor-pointer">close</span></td>
        <td class="border border-gray-700 px-4 py-2">{{ new Date(position.createdAt).toLocaleString() }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import {defineProps, onMounted, ref, watch} from 'vue';

interface Position {
  id: number;
  size: string;
  margin: string;
  leverage: string;
  pnl: string;
  date: string;
}

const props = defineProps<{
  positions: Position[];
}>();
</script>

<style scoped>

</style>
