<template>
  <main>
    <router-link :to="{ name: 'Play' }">{{ t('play') }}</router-link>
    <router-link :to="{ name: 'Stats' }">{{ t('stats') }}</router-link>
  </main>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
