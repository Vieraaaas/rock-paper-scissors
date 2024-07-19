<template>
  <nav>
    <router-link :to="{ name: 'Start' }">{{ t('back') }}</router-link>
  </nav>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
