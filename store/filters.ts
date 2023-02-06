import { defineStore } from 'pinia'
import { IDictionary } from '~~/types/dictionary.interface'
import { IColor } from '~~/types/filters.interface'

interface State {
  colors: IDictionary<IColor>
}

export const useFiltersStore = defineStore('filters', {
  state: (): State => {
    return {
      colors: null,
    }
  },
  actions: {
    async fetchColors() {
      const { data } = await useCustomFetch(
        'https://divat.nafnaf.io/api/v1/front/colors',
        {
          key: 'fetchColors',
          method: 'GET',
          initialCache: false,
        }
      )

      this.colors = data
    },
  },
})
