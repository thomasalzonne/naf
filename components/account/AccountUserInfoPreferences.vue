<template>
  <AppContentCard>
    <template #header>
      <p class="account-card-header user-info__heading">
        {{ $t('Account.edit_email_title') }}
      </p>
    </template>
    <template #body>
      <div class="user-info__content">
        <form id="user-info-form" @submit.prevent.stop="submit">
          <div class="user-info__row">
            <AppInput
              v-model="form.firstName"
              class="page-preferences-information__input"
              :label="$t('Common.first_name')"
              :invalid="
                (v$.firstName.$dirty && v$.firstName.$invalid) ||
                isResponseError
              "
              :validation="true"
              :error="v$.firstName.$errors"
              :dirty="v$.firstName.$dirty"
              name="given-name"
              @blur="touchField('firstName')"
              @input="touchField('firstName')"
            />

            <AppInput
              v-model="form.lastName"
              class="page-preferences-information__input"
              :label="$t('Common.last_name')"
              :invalid="
                (v$.lastName.$dirty && v$.lastName.$invalid) || isResponseError
              "
              :validation="true"
              :error="v$.lastName.$errors"
              :dirty="v$.lastName.$dirty"
              name="family-name"
              @blur="touchField('lastName')"
              @input="touchField('lastName')"
            />
          </div>

          <div class="user-info__row">
            <AppInput
              v-model="form.email"
              :label="$t('AddressForm.email_label')"
              class="preference-email__input"
              :validation="true"
              :invalid="
                (v$.email.$dirty && v$.email.$invalid) || isResponseError
              "
              :error="v$.email.$errors"
              :dirty="v$.email.$dirty"
              name="email"
              @blur="touchField('email')"
              @input="touchField('email')"
            />

            <AppInput
              id="phone_input"
              v-model="form.phoneNumber"
              class="page-preferences-information__input"
              :label="$t('Common.phone_number')"
              :invalid="
                (v$.phoneNumber.$dirty && v$.phoneNumber.$invalid) ||
                isResponseError
              "
              :validation="true"
              :error="v$.phoneNumber.$errors"
              :dirty="v$.phoneNumber.$dirty"
              type="tel"
              name="tel"
              @blur="touchField('phoneNumber')"
              @input="touchField('phoneNumber')"
            />
          </div>

          <div class="user-info__row">
            <AppInput
              id="date_input"
              v-model="form.birthday"
              class="page-preferences-information__input"
              :label="$t('Common.birthday')"
              :invalid="
                (v$.birthday.$dirty && v$.birthday.$invalid) || isResponseError
              "
              :validation="!!form.birthday"
              :error="v$.birthday.$errors"
              :dirty="v$.birthday.$dirty"
              type="birthday"
              name="birthday"
              @blur="touchField('birthday')"
            />

            <AppButton
              class="user-info__button"
              :title="$t('Common.update')"
              btn-style="light"
              size="small"
              :pending="isPending"
              :disabled="isDisabled"
            />
          </div>
        </form>
      </div>
    </template>
  </AppContentCard>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { Mask } from 'maska'

import { useVuelidate } from '@vuelidate/core'
import { email, helpers, required } from '@vuelidate/validators'

import AppContentCard from '~/components/common/AppContentCard.vue'

import { NAME_REGEX } from '~~/constants/auth'
import { EStatus } from '~~/constants/status'
import { useProfileStore } from '~~/store/profile'
import { IProfileEditForm } from '~~/types/profile.interface'

import AppInput from '~/components/common/AppInput.vue'
import AppButton from '~/components/common/AppButton.vue'
import { MOBILE_REGEX } from '~~/constants/regex'

const { t } = useI18n()
const { $dayjs } = useNuxtApp()
const profileStore = useProfileStore()

const form: IProfileEditForm = reactive({
  firstName: '',
  lastName: '',
  birthday: '',
  phoneNumber: '',
  email: '',
})

const isButtonClicked = ref(false)

watch(
  () => profileStore.profile,
  () => {
    Object.keys(form).forEach((key) => {
      if (form[key] !== profileStore.profile[key]) {
        if (key === 'birthday') {
          form.birthday = $dayjs(profileStore.profile[key]).format('DD/MM/YYYY')
        } else {
          form[key] = profileStore.profile[key]
        }
      }
    })
  }
)

const isValidDate = (value: string) => {
  return $dayjs(value, 'DD/MM/YYYY').isValid()
}

const isCompletedBirthdayMask = (value: string) => {
  return mask.completed(value)
}

const mask = new Mask({ mask: '##/##/####' })

const rules = computed(() => {
  const localRules: any = {
    firstName: {
      required: helpers.withMessage(
        t('Validations.name_required').toString(),
        required
      ),
      name_rule: helpers.withMessage(
        t('Validations.name_invalid').toString(),
        helpers.regex(NAME_REGEX)
      ),
    },
    lastName: {
      required: helpers.withMessage(
        t('Validations.surname_required').toString(),
        required
      ),
      name_rule: helpers.withMessage(
        t('Validations.surname_invalid').toString(),
        helpers.regex(NAME_REGEX)
      ),
    },
    email: {
      required: helpers.withMessage(
        t('Validations.name_required').toString(),
        required
      ),
      email: helpers.withMessage(
        t('Validations.email_invalid').toString(),
        email
      ),
    },
    phoneNumber: {},
    birthday: {},
  }

  if (form.phoneNumber.length) {
    localRules.phoneNumber = {
      isValidPhone: helpers.withMessage(
        t('Validations.phone_invalid').toString(),
        helpers.regex(MOBILE_REGEX)
      ),
    }
  }

  if (form.birthday.length) {
    localRules.birthday = {
      isValidDate: helpers.withMessage(
        t('Validations.invalid_birthday').toString(),
        isValidDate
      ),
    }

    if (isValidDate(form.birthday)) {
      localRules.birthday = {
        isCompleted: helpers.withMessage(
          t('Validations.invalid_mask_birthday').toString(),
          isCompletedBirthdayMask
        ),
      }
    }
  }

  return localRules
})
const v$ = useVuelidate(rules, form)

const isPending = computed<boolean>(() => {
  return isButtonClicked.value && profileStore.status === EStatus.PENDING
})

const isDisabled = computed<boolean>(() => {
  return !v$.value.$anyDirty || v$.value.$invalid || !isWasChanges.value
})

const error = computed<string>(() => {
  return profileStore.error?.data?.detail || ''
})

const isResponseError = computed<boolean>(() => {
  return !!error.value
})

const isWasChanges = computed<boolean>(() => {
  const body: IProfileEditForm = { ...form }

  Object.keys(body).forEach((key) => {
    const time = '00:00:00'

    if (key === 'birthday' && !body[key].includes(time)) {
      body[key] = body[key] + ` ${time}`
    }

    if (body[key] === profileStore.profile[key]) delete body[key]
  })

  return !!Object.keys(body).length
})

const submit = async (e) => {
  e.preventDefault()

  v$.value.$touch()

  if (v$.value.$invalid) return

  isButtonClicked.value = true

  const body: IProfileEditForm = { ...form }

  Object.keys(body).forEach((key) => {
    if (body[key] === profileStore.profile[key]) delete body[key]
  })

  if (Object.keys(body).length) {
    if ('birthday' in body && !body.birthday?.length) {
      body.birthday = null
    }

    await profileStore.editProfile(body)

    if (profileStore.status === EStatus.SUCCESS) {
      v$.value.$reset()
      profileStore.clear()
    }
  }

  isButtonClicked.value = false
}

const touchField = (field: string) => {
  v$.value[field].$touch()
}

onMounted(() => {
  profileStore.clear()

  form.firstName = profileStore.profile?.firstName || ''
  form.lastName = profileStore.profile?.lastName || ''

  if (profileStore.profile?.birthday) {
    form.birthday = $dayjs(profileStore.profile?.birthday).format('DD/MM/YYYY')
  }
  form.phoneNumber = profileStore.profile?.phoneNumber || ''

  const isFakeEmail = !!profileStore.profile?.user?.isFakeEmail

  form.email = isFakeEmail ? '' : profileStore.profile?.email || ''
})
</script>

<style lang="scss" scoped>
.user-info {
  &__heading {
    padding: 20px 22px;
  }

  &__content {
    padding: 20px 22px 34px 22px;
  }

  &__row {
    display: flex;
    gap: 24px;
    margin-bottom: 24px;
  }
}
</style>
