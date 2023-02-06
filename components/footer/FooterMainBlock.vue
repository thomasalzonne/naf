<template>
  <div class="footer-main-block">
    <div class="footer-main-block__container">
      <div class="footer-main-block__links">
        <div class="footer-main-block__box-link">
          <div class="footer-main-block__links-header">
            <span class="footer-main-block__link-title" @click="toggleAccordion"
              >Nos services</span
            >
            <SvgIcon
              class="footer-main-block__icon-header"
              name="arrow-right"
            />
          </div>
          <ul class="footer-main-block__list-links">
            <li class="footer-main-block__link">Nos boutiques</li>
            <li class="footer-main-block__link">E-réservation</li>
            <li class="footer-main-block__link">FAQ</li>
            <li class="footer-main-block__link">Contact</li>
          </ul>
        </div>

        <div class="footer-main-block__box-link">
          <div class="footer-main-block__links-header">
            <span class="footer-main-block__link-title" @click="toggleAccordion"
              >Naf Naf</span
            >
            <SvgIcon
              class="footer-main-block__icon-header"
              name="arrow-right"
            />
          </div>
          <ul class="footer-main-block__list-links">
            <li class="footer-main-block__link">La marque</li>
            <li class="footer-main-block__link">My Fashion Thérapy</li>
            <li class="footer-main-block__link">Naf Naf parfums</li>
            <li class="footer-main-block__link">Recycler vos vêtements</li>
            <li class="footer-main-block__link">Notre démarche responsable</li>
          </ul>
        </div>

        <div class="footer-main-block__box-link">
          <div class="footer-main-block__links-header">
            <span class="footer-main-block__link-title" @click="toggleAccordion"
              >Informations</span
            >
            <SvgIcon
              class="footer-main-block__icon-header"
              name="arrow-right"
            />
          </div>
          <ul class="footer-main-block__list-links">
            <li class="footer-main-block__link">CGV</li>
            <li class="footer-main-block__link">Mentions legales</li>
            <li class="footer-main-block__link">Données personnelles</li>
            <li class="footer-main-block__link">Gestion des cookies</li>
            <li class="footer-main-block__link">Nous rejoindre</li>
          </ul>
        </div>
      </div>
      <div class="footer-main-block__contact">
        <div class="footer-main-block__newsletter">
          <h4 class="footer-main-block__contact-title">Newsletter</h4>
          <p class="footer-main-block__newsletter-text">
            Abonnez-vous a notre newsletter afin de recevoir nos dernières
            collections et nos offres
          </p>
          <div class="footer-main-block__box-email-newsletter">
            <SvgIcon class="footer-main-block__email-icon" name="email" />
            <input
              type="email"
              placeholder="Adresse e-mail"
              class="footer-main-block__input-email-newsletter"
            />
          </div>
        </div>
        <div
          class="footer-main-block__follow-us footer-main-block__follow-us-large-screen"
        >
          <h4 class="footer-main-block__contact-title">Suivez-nous</h4>
          <ul class="footer-main-block__social-networks">
            <li class="footer-main-block__social-networks-link">Instagram</li>
            <li class="footer-main-block__social-networks-link">TikTok</li>
            <li class="footer-main-block__social-networks-link">Pinterest</li>
            <li class="footer-main-block__social-networks-link">Youtube</li>
            <li class="footer-main-block__social-networks-link">Facebook</li>
          </ul>
        </div>
      </div>
    </div>
    <div
      class="footer-main-block__follow-us footer-main-block__follow-us-small-screen"
    >
      <h4 class="footer-main-block__contact-title">Suivez-nous</h4>
      <ul class="footer-main-block__social-networks">
        <li class="footer-main-block__social-networks-link">Instagram</li>
        <li class="footer-main-block__social-networks-link">TikTok</li>
        <li class="footer-main-block__social-networks-link">Pinterest</li>
        <li class="footer-main-block__social-networks-link">Youtube</li>
        <li class="footer-main-block__social-networks-link">Facebook</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FooterMainBlock',
  mounted() {
    const acc = document.getElementsByClassName(
      'footer-main-block__links-header'
    )
    let i

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener('click', function () {
        this.classList.toggle('accordion-active')
        const panel = this.nextElementSibling
        if (panel.style.maxHeight === '400px') {
          panel.style.maxHeight = '0px'
          panel.style.paddingTop = '0'
        } else {
          panel.style.maxHeight = '400px'
          panel.style.paddingTop = '10px'
        }
      })
    }
  },
  methods: {
    toggleAccordion() {
      this.classList.toggle('active')
      const panel = this.nextElementSibling
      if (panel.style.maxHeight === '400px') {
        panel.style.maxHeight = '0px'
      } else {
        panel.style.maxHeight = '400px'
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.accordion-active {
  .footer-main-block__list-links {
  }
  .footer-main-block__icon-header {
    rotate: 90deg;
  }
}
.footer-main-block {
  border-top: 5px solid #ebebeb;
  border-bottom: 12px solid $color-pink;

  &__container {
    padding: 40px 20px 30px 20px;
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-around;
    gap: 27px;
    margin: auto;
  }

  &__links-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    padding: 20px 0;
    border-bottom: 1px solid #f0f0f0;
  }

  &__icon-header {
    height: 12px;
    width: 7px;
    transition: 0.3s;
  }

  &__follow-us-large-screen {
    display: none !important;
  }

  &__follow-us-small-screen {
    margin-bottom: 16px;
  }

  &__social-networks-link {
    font-size: 12px;
    cursor: pointer;

    &:hover {
      color: $color-pink;
    }
  }

  &__list-links {
    display: flex;
    flex-direction: column;
    max-height: 0px;
    transition: 0.5s ease-in-out;
    overflow: hidden;
    gap: 4px;
  }

  &__newsletter {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  &__box-email-newsletter {
    position: relative;
    margin-top: 10px;
  }

  &__link-title {
    font-family: $font-secondary;
    font-style: normal;
    font-weight: 460;
    font-size: 16px;
    text-transform: uppercase;
  }

  &__email-icon {
    position: absolute;
    width: 20px;
    height: 15px;
    top: 16px;
    left: 15px;
    border: 14px;
  }

  &__input-email-newsletter {
    height: 45px;
    border: 1px solid $color-black;
    width: 100%;
    padding-left: 50px;
  }
  &__link {
    font-weight: 400;
    font-size: 12px;
    cursor: pointer;

    &:hover {
      color: $color-pink;
    }
  }
  &__contact-title {
    font-family: $font-secondary;
    font-style: normal;
    font-weight: 480;
    font-size: 20px;
    text-transform: uppercase;
    text-align: center;
  }

  &__newsletter-text {
    text-align: center;
    font-size: 12px;
  }

  &__follow-us {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 0 18px;
  }

  &__social-networks {
    display: flex;
    gap: 16px;
    justify-content: center;
  }
  &__links {
    border-top: 1px solid #f0f0f0;
    display: flex;
    flex-direction: column;
  }
  &__box-link {
    display: flex;
    flex-direction: column;
  }
}

@include media-md {
  .footer-main-block {
    &__container {
      width: 100%;
      max-width: 1200px;
      gap: 50px;
    }
    &__links {
      flex-direction: row;
      justify-content: space-evenly;
      border: none;
    }

    &__box-email-newsletter {
      width: 500px;
      margin-left: auto;
      margin-right: auto;
    }

    &__box-link {
      gap: 12px;
    }

    &__links-header {
    }

    &__icon-header {
      display: none;
    }

    &__follow-us {
      margin-top: 30px;
    }

    &__links-header {
      border: none;
      cursor: unset;
      padding: 0 0;
    }

    &__list-links {
      max-height: none !important;
      padding-top: 0 !important;
      gap: 7px;
    }
  }
}

@include media-xl {
  .footer-main-block {
    &__container {
      flex-direction: row;
      justify-content: space-between;
      padding: 50px 20px 45px 20px;
    }

    &__contact {
      display: flex;
      flex-direction: column;
      width: 46%;
      gap: 25px;
    }

    &__box-email-newsletter {
      width: unset;
      margin-left: 0;
      margin-right: 0;
    }

    &__follow-us-large-screen {
      display: flex !important;
      padding: 0;
    }

    &__follow-us-small-screen {
      display: none;
    }

    &__links {
      gap: 69px;
    }

    &__newsletter-text {
      text-align: left;
    }

    &__contact-title {
      text-align: left;
    }

    &__social-networks {
      justify-content: unset;
    }
  }
}
</style>
