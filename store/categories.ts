import { defineStore } from 'pinia'
import { useCustomFetch } from '~~/composables/useCustomFetch'

import ICategory from '~~/types/category.interface'

interface IState {
  categories: ICategory[]
}

export const useCategoriesStore = defineStore('categories', {
  state: (): IState => {
    return {
      categories: [],
    }
  },
  getters: {
    newInCategory: (state) => {
      return (
        state.categories.find(
          (category: ICategory) => category.is_new_category
        ) || { slug: '/' }
      )
    },
  },
  actions: {
    async fetchCategories(): Promise<void> {
      const config = useRuntimeConfig()

      const { data } = await useCustomFetch(
        `https://divat.nafnaf.io/api/v1/${config.public.channelCode}/categories`,
        {
          key: 'fetchCategories',
          method: 'GET',
          initialCache: false,
        }
      )

      this.categories = data
    },
  },
})
