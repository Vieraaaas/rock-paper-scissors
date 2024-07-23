<template>
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis dolor aliquam excepturi
    repellendus amet necessitatibus animi iste doloremque, distinctio ipsum inventore nesciunt
    eaque. Numquam id atque, excepturi autem quos nesciunt?
  </p>

  <router-link :to="{ name: 'Start' }">{{ t('back') }}</router-link>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
