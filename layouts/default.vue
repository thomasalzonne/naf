<template>
  <div :key="$route.fullPath" class="layout">
    <div class="layout__header">
      <AppHeader />
    </div>
    <main class="layout__content"><slot /></main>
    <AppFooter class="layout__footer" />
  </div>
</template>

<script lang="ts" setup>
import AppHeader from '~/components/header/AppHeader.vue'
import AppFooter from '~/components/footer/AppFooter.vue'
</script>
<script lang="ts">
export default {
  watch: {
    $route(to) {
      if (to.path.includes('/collections/')) {
        setTimeout(this.changeBgColor, 500)
      }
    },
  },
  mounted() {
    this.changeBgColor()
  },
  methods: {
    changeBgColor() {
      const header = document.querySelector('.page-catalog__header')
      if (header) {
        document.querySelector('.layout__content').style.background = '#015F76'
      } else {
        document.querySelector('.layout__content').style.background = 'white'
      }
    },
  },
}
</script>

function a(a: any) { throw new Error('Function not implemented.') }
