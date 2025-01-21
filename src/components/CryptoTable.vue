<template>
  <div>
    <h1>Cryptocurrency Prices</h1>
    <div class="filter">
      <input v-model="filter" type="text" placeholder="Filter by name or symbol..." />
    </div>
    <DataTable :value="filteredAssets" paginator :rows="10" responsiveLayout="scroll">
      <Column field="name" header="Name"></Column>
      <Column field="symbol" header="Symbol"></Column>
      <Column field="current_price" sortable header="Current Price" :body="formatPrice">
        <template #body="slotProps">
          {{ formatPrice(slotProps.data.current_price) }}
        </template>
      </Column>
      <Column field="market_cap" sortable header="Market Cap">
        <template #body="slotProps">
          {{ formatPrice(slotProps.data.market_cap) }}
        </template>
      </Column>
      <Column field="last_updated" sortable header="Last Updated">
        <template #body="slotProps">
          {{ formatDate(slotProps.data.last_updated) }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { useCryptoAssets } from '@/composables/useCryptoAssets'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const { filter, filteredAssets } = useCryptoAssets()

const formatPrice = (value: number) => {
  if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`
  if (value >= 1e3) return `$${(value / 1e3).toFixed(2)}K`
  return `$${value.toString()}`
}

const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }
  return new Date(date).toLocaleDateString('en-US', options)
}
</script>

<style>
.filter {
  margin-bottom: 1rem;
}
</style>
