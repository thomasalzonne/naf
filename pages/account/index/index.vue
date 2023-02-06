<template>
  <div class="page-preferences">
    <p class="page-preferences__heading">
      {{ $t('Account.my_personal_info') }}
    </p>
    <div class="page-preferences__main">
      <AccountUserInfoPreferences />
      <AccountUserPasswordPreferences v-if="!isFakeEmail" />
    </div>
    <div class="page-preferences__remove">
      <RemoveAccountBlock />
    </div>
  </div>
</template>

<script lang="ts" setup>
import AccountUserInfoPreferences from '~/components/account/AccountUserInfoPreferences.vue'
import AccountUserPasswordPreferences from '~/components/account/AccountUserPasswordPreferences.vue'
import RemoveAccountBlock from '~/components/account/RemoveAccountBlock.vue'
import { useProfileStore } from '~~/store/profile'

const profileStore = useProfileStore()

const isFakeEmail = computed(() => {
  return !!profileStore.profile?.user?.isFakeEmail
})
</script>

<style lang="scss" scoped>
.page-preferences {
  margin-left: 5px;

  &__heading {
    font-weight: 480;
    font-size: 36px;
    line-height: 44px;
    font-family: $font-secondary;
    margin-left: 10px;
  }

  &__main {
    display: grid;
    margin-top: 30px;
    gap: 30px;
  }

  &__remove {
    margin-top: 30px;
  }
}

@media screen and (min-width: 1280px) {
  .page-preferences {
    &__main {
      grid-template-columns: 52% calc(48% - 35px);
      gap: 35px;
    }

    &__remove {
      margin-top: 71px;
    }
  }
}

@media screen and (min-width: 2560px) {
  .page-preferences {
    &__remove {
      display: grid;
      grid-template-columns: 52% 48%;
    }
  }
}
</style>
