<template>
  <div v-if="isOpen" class="modal-info">
    <div class="modal-info__body">
      <ButtonCloseModal class="modal-info__close-button" @click="closeModal" />
      <div
        class="modal-info__sticker-container"
        :class="`modal-info__sticker-container--${stickerName}`"
      ></div>
      <div class="moda-info__content">
        <p class="modal-info__text">
          {{ text }}
        </p>
      </div>

      <div class="modal-info__footer">
        <template v-if="withButtons">
          <button
            class="modal-info__button modal-info__button--accept"
            @click="acceptAction"
          >
            oui
          </button>
          <button
            class="modal-info__button modal-info__button--reject"
            @click="closeModal"
          >
            Non
          </button>
        </template>

        <button
          v-if="!withButtons"
          class="modal-info__button"
          @click="closeModal"
        >
          Revenir
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ButtonCloseModal from '~/components/common/ButtonCloseModal.vue'

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
    default: false,
  },
  text: {
    type: String,
    default: '',
  },
  stickerName: {
    type: String,
    default: 'diskette',
  },
  withButtons: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['close', 'accept'])

const closeModal = () => {
  emit('close')
}

const acceptAction = () => {
  emit('accept')
}
</script>

<style lang="scss" scoped>
.modal-info {
  width: 100vw;
  height: 100vh;
  background-color: rgba($color: #000000, $alpha: 0.7);
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: $z-index-modal;

  &__body {
    position: relative;
    background-color: $color-white;
    border-radius: 31px;
    padding: 69px 40px 47px 40px;
    width: 100%;
  }

  &__text {
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
  }

  &__button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 44px;
    text-transform: uppercase;
    background-color: $color-pink;
    color: $color-white;
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
    text-align: center;
    border-radius: 30px;
    padding: 12px;
    width: 100%;
    max-width: 228px;
    margin: 30px auto 0 auto;
    min-width: 112px;

    &--grey {
      background-color: $color-medium-grey;
      color: $color-dark-grey;
    }

    &--reject {
      background-color: $color-white;
      color: $color-black;
    }
  }

  &__sticker-container {
    width: 65px;
    height: 65px;
    position: absolute;
    top: -25px;
    left: 0px;
    transform: rotate(334deg);
    background-repeat: no-repeat;
    background-position: center;
    background-image: url(~/assets/images/stickers/diskette.png);
    background-size: 65px;

    &--sun {
      background-image: url(~/assets/images/stickers/sun.png);
      left: -15px;
      transform: rotate(-20deg);
    }

    &--question {
      background-image: url(~/assets/images/stickers/question.png);
      left: -15px;
      transform: rotate(-20deg);
    }
  }

  &__close-button {
    display: none;
  }

  &__footer {
    display: flex;
    align-items: center;
  }
}

@include media-lg {
  .modal-info {
    &__body {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding: 29px 35px 17px 35px;
      max-width: 565px;
      min-height: 196px;
    }

    &__content {
      margin: 0 auto;
    }

    &__text {
      text-align: center;
      max-width: 493px;
      margin: 0 auto;
    }

    &__button {
      display: none;

      &--accept {
        display: flex;
      }

      &--reject {
        display: flex;
      }
    }

    &__sticker-container {
      width: 90px;
      height: 90px;
      position: absolute;
      top: -33px;
      left: -25px;
      transform: rotate(-21deg);

      &--question {
        background-size: 90px;
      }
    }

    &__close-button {
      display: flex;
      align-items: center;
      gap: 10px;
      position: absolute;
      right: 23px;
      top: 25px;
    }
  }
}
</style>
