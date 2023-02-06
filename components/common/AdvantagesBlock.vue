<template>
  <div class="advantages-block">
    <div class="advantages-block__item">
      <div class="advantages-block__item-container">
        <div class="advantages-block__item-header">
          <div class="advantages-block__icon-container">
            <SvgIcon
              style="width: 39px; height: 28px"
              class="advantages-block__icon"
              name="payments"
            />
          </div>
          <p class="advantages-block__title">
            Paiment en 3X
            <!-- {{ $t('AdvantagesBlock.item_1.title_normal') }} -->
          </p>
        </div>
        <p class="advantages-block__description">
          <!-- {{ $t('AdvantagesBlock.item_1.description') }} -->
          Sans frais dès 100€ d’achat avec Alma ou 4x sans frais avec Paypal.
        </p>
      </div>
    </div>
    <div class="advantages-block__item">
      <div class="advantages-block__item-container">
        <div class="advantages-block__item-header">
          <div class="advantages-block__icon-container">
            <SvgIcon
              style="width: 58px; height: 31px"
              class="advantages-block__icon"
              name="free-shipping"
            />
          </div>
          <p class="advantages-block__title">
            Livraison gratuite
            <!-- {{ $t('AdvantagesBlock.item_2.title_normal') }} -->
          </p>
        </div>
        <p class="advantages-block__description">
          En boutique et dès 69€ en Relais Colis et Colissimo.
          <!-- {{ $t('AdvantagesBlock.item_2.description') }} -->
        </p>
      </div>
    </div>
    <div class="advantages-block__item">
      <div class="advantages-block__item-container">
        <div class="advantages-block__item-header">
          <div class="advantages-block__icon-container">
            <SvgIcon
              style="width: 27px; height: 31px"
              class="advantages-block__icon"
              name="return-shipping"
            />
          </div>
          <p class="advantages-block__title">
            Retours gratuits
            <!-- {{ $t('AdvantagesBlock.item_3.title_normal') }} -->
          </p>
        </div>
        <p class="advantages-block__description advantages-block__description">
          Par Relais Colis pour toute commande livrées en boutique ou Point
          Relais.
          <!-- {{ $t('AdvantagesBlock.item_3.description') }} -->
        </p>
      </div>
    </div>

    <div class="advantages-block__item">
      <div class="advantages-block__item-container">
        <div class="advantages-block__item-header">
          <div class="advantages-block__icon-container">
            <SvgIcon
              style="width: 34px; height: 32px"
              class="advantages-block__icon"
              name="client-service"
            />
          </div>
          <p class="advantages-block__title">
            <!-- {{ $t('AdvantagesBlock.item_3.title_normal') }} -->
            Service client
          </p>
        </div>
        <p class="advantages-block__description advantages-block__description">
          <!-- {{ $t('AdvantagesBlock.item_3.description') }} -->
          Contactez-nous.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AdvantagesBlock',
})
</script>

<style lang="scss" scoped>
.advantages-block {
  padding: 60px 20px 45px 20px;
  width: 100%;
  max-width: 1500px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 35px 24px;
  margin: auto;

  &__item-container {
    display: flex;
    flex-direction: column;
    gap: 7px;
  }

  &__icon-container {
    height: 40px;
    width: 60px;
    display: flex;
    justify-content: center;
  }

  &__item {
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: center;
  }

  &__item-header {
    display: flex;
    align-items: center;
    gap: 5px;
    flex-direction: column;
    align-items: center;
  }

  &__icon {
    color: $color-black;
  }

  &__title {
    font-weight: 460;
    font-size: 16px;
    line-height: 21px;
    font-family: $font-secondary;
  }

  &__description {
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    margin-top: 0px;
    max-width: 165px;
    text-align: center;
    color: rgba(0, 0, 0, 0.3);
  }
}

@include media-md {
  .advantages-block {
    display: flex;
    gap: 28px;
    justify-content: space-between;
    max-width: 1200px;

    &__description {
      color: $color-black;
    }

    &__icon-container {
      align-items: flex-start;
    }

    &__item-container {
      align-items: flex-start;
    }

    &__item-header {
      display: flex;
      gap: 15px;
      min-height: 46px;
      align-items: flex-start;
    }

    &__icon-container {
      justify-content: flex-start;
    }

    &__description {
      text-align: left;
    }

    &__title {
    }

    &__item {
      align-items: center;
    }

    &__item:first-child {
      align-items: flex-start;
    }

    &__item:last-child {
      align-items: flex-end;
      padding-right: 15px;
    }
  }
}
</style>
