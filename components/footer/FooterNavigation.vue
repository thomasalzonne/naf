<template>
  <div class="footer-navigation">
    <div class="footer-navigation__menu footer-navigation__menu--mobile">
      <a class="footer-navigation__menu-link" href="/pages/store-locator">
        <span class="footer-navigation__menu-link-title">{{
          $t('Footer.services_link_store')
        }}</span>
        <SvgIcon class="footer-navigation__menu-link-icon" name="arrow" />
      </a>
      <a class="footer-navigation__menu-link" href="/pages/ayuda">
        <span class="footer-navigation__menu-link-title">{{
          $t('Footer.services_link_help')
        }}</span>
        <SvgIcon class="footer-navigation__menu-link-icon" name="arrow" />
      </a>
      <a
        class="footer-navigation__menu-link"
        href="/pages/contacto-franquicias"
      >
        <span class="footer-navigation__menu-link-title">{{
          $t('Footer.services_link_open_shop')
        }}</span>
        <SvgIcon class="footer-navigation__menu-link-icon" name="arrow" />
      </a>
      <NuxtLink class="footer-navigation__menu-link" href="/contacts">
        <span class="footer-navigation__menu-link-title">{{
          $t('Footer.services_link_contact')
        }}</span>
        <SvgIcon class="footer-navigation__menu-link-icon" name="arrow" />
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FooterNavigation',
})
</script>

<style lang="scss" scoped>
.footer-navigation {
  background-color: $color-pink-light;
  padding: 0 20px;
  &__menu {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 21px;
  }

  &__menu-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 21px 2px 20px 0;
    border-bottom: 1px solid $color-pink;

    &:first-child {
      border-top: 1px solid $color-pink;
    }
  }

  &__menu-link-title {
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    margin-left: -2px;
  }

  &__menu-link-icon {
    width: 20px;
    height: 20px;
  }

  &__top-menu {
    display: none;
  }
}

@include media-md {
  .footer-navigation {
    &__top-menu-links {
      margin-top: 13px;
      display: flex;
      flex-direction: column;
      max-height: 200px;
      flex-wrap: wrap;
      gap: 15px;
      max-width: 222px;
      column-gap: 25px;
    }
  }
}

@include media-lg {
  .footer-navigation {
    background-color: rgba($color: $color-pink, $alpha: 0.1);
    padding: 0;

    &__menu {
      margin-top: 0;
      &--mobile {
        display: none;
      }
    }

    &__top {
      background-color: rgba($color: $color-pink, $alpha: 0.2);
      padding: 64px 0px 55px 0px;
    }

    &__top-menu {
      display: grid;
      grid-template-columns: 52% 44%;
      gap: 21px;
    }

    &__top-menu-box {
      width: 100%;
    }

    &__top-menu-title {
      font-weight: 500;
      font-size: 20px;
      line-height: 41px;
    }

    &__top-menu-link {
      font-size: 18px;
      line-height: 24px;
      font-weight: 400;
      text-decoration: underline;

      &--no-decoration {
        text-decoration: none;
      }

      &--accent {
        color: $color-green;
        text-decoration: none;
      }
    }

    &__top-menu-links {
      width: 201px;
    }
  }
}

@media screen and (min-width: 1290px) {
  .footer-navigation {
    &__top-menu-links {
      max-height: 163px;
    }
  }
}

@include media-xxl {
  .footer-navigation {
    &__menu {
      &--desktop {
        grid-template-columns: 65% 35%;
      }
    }

    &__top-menu-links {
      column-gap: 81px;
    }

    &__menu {
      max-width: 1459px;
      padding-left: 0;
      padding-right: 0;
    }
  }
}

@include media-xxxl {
  .footer-navigation {
    &__menu {
      max-width: 1459px;
      padding-left: 0;
      padding-right: 0;
    }
  }
}
</style>
