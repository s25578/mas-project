<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <HeaderBlock />
    <!-- Main Content -->
    <div class="p-4 grid grid-cols-1 lg:grid-cols-4 gap-4">
      <!-- TradingView Chart -->
      <div class="lg:col-span-3 bg-gray-800 p-4 rounded-md">
        <div id="tradingview-widget" class="bg-gray-700 h-96 rounded-md"></div>
      </div>

      <!-- New Position Form -->
      <OpenPosition :initialPosition="newPosition" @updateChart="updateChart" />

      <!-- Positions Table -->
      <PositionList :positions="positions" />

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import HeaderBlock from '@/components/header/HeaderBlock.vue';
import OpenPosition from '@/components/position/OpenPosition.vue';
import PositionList from '@/components/position/PositionList.vue';

interface Position {
  market: string;
  asset: string;
  size: number;
  leverage: number;
}

// Reactive data
const newPosition = ref<Position>({
  market: 'crypto',
  asset: 'BTCUSDT',
  size: 1,
  leverage: 1
});

import apiClient from '../axiosConfig';
import {defineEmits} from "vue/dist/vue";


//const positions = ref<Position[]>([]);
const positions = ref<Position[]>([{"pnl":"118 (+6.44%)", "direction":"buy","size":1,"leverage":1,"openPrice":1618,"fee":1,"type":"OpenedPosition","createdAt":1718888563797,"updatedAt":1718888563797,"asset":{"name":"GOLDUSD","tag":["Tech"],"description":null,"status":"active","id":2},"postponeFeeRate":0,"id":"c232783b-9a64-408a-8386-9d6e279310d1"},
  {"pnl":"1,425 (+2.39%)", "direction":"sell","size":14,"leverage":2,"openPrice":220,"fee":1,"type":"OpenedPosition","createdAt":1718888603470,"updatedAt":1718888603470,"asset":{"name":"AAPL","tag":["Tech"],"description":null,"status":"active","id":2},"postponeFeeRate":0,"id":"066d65c6-584e-4665-95ca-c9f19cb54532"},
  {"pnl":"925 (+2.39%)", "direction":"buy","size":1,"leverage":1,"openPrice":1524,"fee":1,"type":"OpenedPosition","createdAt":1718889440849,"updatedAt":1718889440849,"asset":{"name":"GOLDUSD","tag":["Tech"],"description":null,"status":"active","id":2},"postponeFeeRate":0,"id":"e1b2fa76-b104-4fc7-89ac-621112f7f095"},
  {"pnl":"-253 (-4.19%)", "direction":"sell","size":2,"leverage":10,"openPrice":71262,"fee":1,"type":"OpenedPosition","createdAt":1718889689297,"updatedAt":1718889689297,"asset":{"name":"BTCUSDT","tag":["Tech"],"description":null,"status":"active","id":2},"postponeFeeRate":0,"id":"9e3b71f3-bee2-4686-9062-0b775c78ad5d"}]);

const fetchPositions = async () => {
  try {
    const response = await apiClient.get('/position');
    console.log(response);
    //positions.value = response.data;
  } catch (error) {
    console.error('Error fetching positions:', error);
  }
};


onMounted(async () => {
  await fetchPositions();
});

const emits = defineEmits(['fetchPositions']);

watch(() => positions.value, (positions) => {
  emits('fetchPositions');
});

// const positions = ref([
//   { id: 1, size: '1 BTC', margin: '$1000', leverage: '10x', pnl: '$500', date: '2024-06-18' },
//   { id: 2, size: '2 ETH', margin: '$2000', leverage: '5x', pnl: '$800', date: '2024-06-19' },
// ]);

let widgetScript: HTMLScriptElement | null = null;

// load TradingView widget
const loadTradingViewWidget = (symbol: string) => {
  if (widgetScript) {
    widgetScript.remove();
  }
  widgetScript = document.createElement('script');
  widgetScript.src = `https://s3.tradingview.com/tv.js`;
  widgetScript.async = true;
  widgetScript.onload = () => {
    new (window as any).TradingView.widget({
      width: '100%',
      height: '100%',
      symbol: symbol,
      interval: 'D',
      timezone: 'Etc/UTC',
      theme: 'dark',
      style: '1',
      locale: 'en',
      toolbar_bg: '#f1f3f6',
      enable_publishing: false,
      allow_symbol_change: true,
      container_id: 'tradingview-widget'
    });
  };
  document.getElementById('tradingview-widget')?.appendChild(widgetScript);
};

// changes in the asset selection
watch(() => newPosition.value.asset, (newAsset) => {
  loadTradingViewWidget(newAsset);
});

// Initial load TradingView
onMounted(() => {
  loadTradingViewWidget(newPosition.value.asset);
});

// handle chart updates from the OpenPosition component
const updateChart = (newAsset: string) => {
  console.log('updateChart', newAsset);
  newPosition.value.asset = newAsset;
};
/*
// open a new position
const openPosition = () => {
  console.log(newPosition.value);
};*/
</script>

<style scoped>
body {
  font-family: 'Roboto', sans-serif;
}

nav a {
  font-weight: 500;
}

button {
  transition: background-color 0.3s;
}

button:hover {
  filter: brightness(110%);
}
</style>
