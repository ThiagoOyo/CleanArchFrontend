import { ref, computed, onMounted } from 'vue'
import httpClient from '@/services/httpClient'
import type { CryptoAsset } from '../types/cryptoAssets'

export function useCryptoAssets() {
  const cryptoAssets = ref<CryptoAsset[]>([])
  const filter = ref('')

  const fetchCryptoAssets = async () => {
    try {
      const response = await httpClient.get<CryptoAsset[]>('/cryptoassets')

      cryptoAssets.value = response.data
    } catch (error) {
      console.error('Erro while fetching crypto assets:', error)
    }
  }

  const filteredAssets = computed(() =>
    cryptoAssets.value.filter((asset) =>
      `${asset.name} ${asset.symbol}`.toLowerCase().includes(filter.value.toLowerCase()),
    ),
  )

  onMounted(fetchCryptoAssets)

  return {
    cryptoAssets,
    filter,
    filteredAssets,
    fetchCryptoAssets,
  }
}
