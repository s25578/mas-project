<template>
  <div class="bg-gray-800 p-4 rounded-md">
    <form @submit.prevent="confirmOpenPosition('buy')" class="space-y-4">
      <div>
        <label class="block mb-2">Market</label>
        <select v-model="newPosition.market" @change="fetchAssets" class="w-full p-2 bg-gray-700 rounded-md">
          <option v-for="market in markets" :key="market.id" :value="market.id">{{ market.name }}</option>
        </select>
      </div>
      <div>
        <label class="block mb-2">Asset <span class="text-white ml-2 cursor-pointer" @click="showAssetDescription()">ⓘ</span></label>
        <select v-model="newPosition.asset" @change="updateChart" class="w-full p-2 bg-gray-700 rounded-md">
          <option v-for="asset in assets" :key="asset.id" :value="asset.name">{{ asset.name }}</option>
        </select>
      </div>
      <div>
        <label class="block mb-2">Size</label>
        <input type="number" v-model="newPosition.size" class="w-full p-2 bg-gray-700 rounded-md" />
      </div>
      <div>
        <label class="block mb-2">Leverage</label>
        <input type="number" v-model="newPosition.leverage" class="w-full p-2 bg-gray-700 rounded-md" />
      </div>
      <div class="flex space-x-4">
        <button type="submit" class="flex-1 bg-green-500 p-2 rounded-md">Buy</button>
        <button type="button" @click="confirmOpenPosition('sell')" class="flex-1 bg-red-500 p-2 rounded-md">Sell</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch, onMounted } from 'vue';
import apiClient from '../../axiosConfig';
import Swal from 'sweetalert2';

interface Position {
  market: string;
  asset: string;
  size: number;
  leverage: number;
  direction: string;
  openPrice: number;
  fee: number;
  account: any;
}

interface Market {
  id: number;
  name: string;
}

interface Asset {
  id: number;
  name: string;
}

const props = defineProps<{
  initialPosition: Position;
}>();

const emits = defineEmits(['updateChart']);

const newPosition = ref<Position>({
  ...props.initialPosition,
  direction: 'buy',
  openPrice: 1,
  fee: 1,
  account: {
    id: 1,
  },
}); // Initialize direction as 'buy'

const markets = ref<Market[]>([]);
const assets = ref<Asset[]>([]);
let selectedAsset = ref<Asset | null>(null);

onMounted(async () => {
  await fetchMarkets();
});

const fetchMarkets = async () => {
  try {
    const response = await apiClient.get('/markets');
    markets.value = response.data;
    if (markets.value.length > 0) {
      newPosition.value.market = markets.value[0].id;
      await fetchAssets();
    }
  } catch (error) {
    console.error('Error fetching markets:', error);
  }
};

const fetchAssets = async () => {
  if (!newPosition.value.market) return;
  try {
    const response = await apiClient.get(`/markets/${newPosition.value.market}/assets`);
    assets.value = response.data.assets;
    if (assets.value.length > 0) {
      newPosition.value.asset = assets.value[0].name;
      selectedAsset.value = assets.value[0];
      updateChart();
    }
  } catch (error) {
    console.error('Error fetching assets:', error);
  }
};

watch(
  () => newPosition.value.asset,
  (newAsset) => {
    console.log('newAsset.name', newAsset);
    emits('updateChart', newAsset);
  }
);

const updateChart = () => {
  console.log('newPosition.value.asset', newPosition.value.asset);
  emits('updateChart', newPosition.value.asset);
};

const openPosition = async (direction: string) => {
  try {
    newPosition.value.direction = direction;
    newPosition.value.openPrice = Math.floor(Math.random() * 100000);
    const response = await apiClient.post('/position', newPosition.value);
    console.log('Position opened:', response.data);
    // successful response
  } catch (error) {
    console.error('Error opening position:', error);
    Swal.fire({
      title: 'Error',
      text: 'An error occurred while opening the position. Please try again.',
      icon: 'error',
      confirmButtonText: 'Close'
    });
  }
};

const confirmOpenPosition = async (direction: string) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: `Do you want to ${direction} this position?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, open it!',
    cancelButtonText: 'No, cancel!',
  });

  if (result.isConfirmed) {
    await openPosition(direction);
  }
};

const showAssetDescription = () => {
  const asset = selectedAsset.value;
  Swal.fire({
    title: `${asset.name}`,
    text: asset.description || 'No description available',
    icon: 'info',
    confirmButtonText: 'Close'
  });
};
</script>
