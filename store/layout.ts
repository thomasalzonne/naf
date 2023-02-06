import { defineStore } from 'pinia'
import { EModals } from '~~/constants/modals'
import { IDictionary } from '~~/types/dictionary.interface'

interface State {
  modals: IDictionary<boolean>
  windowWidth: number
}

export const useLayoutStore = defineStore('layout', {
  state: (): State => {
    return {
      modals: {
        [EModals.SEARCH]: false,
        [EModals.CART]: false,
        [EModals.AUTH]: false,
        [EModals.MENU]: false,
        [EModals.FILTERS]: false,
        [EModals.PRODUCT_ZOOM]: false,
        [EModals.ADDRESS]: false,
        [EModals.CHECKOUT_DELIVERY]: false,
        [EModals.SIZE_HELPER]: false,
        [EModals.PRE_AUTH]: false,
        [EModals.CART_DELETE]: false,
        [EModals.PRODUCT_LOOKS]: false,
        [EModals.CART_EDIT_PRODUCT]: false,
        [EModals.WISHLIST_VIEW_PRODUCT]: false,
        [EModals.AUTH_CTA]: false,
      },
      windowWidth: 0,
    }
  },
  getters: {
    isOpenSomeModal: (state) => {
      return !!Object.keys(state.modals).find(
        (key: EModals) => state.modals[key]
      )
    },
  },
  actions: {
    openModal(key: EModals) {
      this.closeAllModals()

      this.modals[key] = true
    },
    closeModal(key: EModals) {
      this.modals[key] = false
    },
    closeAllModals() {
      Object.keys(this.modals).forEach((key: EModals) => {
        this.modals[key] = false
      })
    },
  },
})
