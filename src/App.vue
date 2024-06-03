<template>
  <header class="site-header">
    <h1>
      <span class="rock">{{ t('header-one') }}</span>
      <span class="paper">{{ t('header-two') }}</span>
      <span class="scissors">{{ t('header-three') }}</span>
    </h1>
    <LanguageSwitcher class="langSwitcher" />
  </header>

  <router-view />
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import LanguageSwitcher from './components/LanguageSwitcher.vue'
const { t } = useI18n()
</script>

<style scoped>
.site-header {
  font-family: 'Permanent Marker', cursive;
  font-size: 1.5rem;
  background-color: var(--main-color);
  width: 100vw;
  text-align: center;
}
.rock {
  display: inline-block;
  transform: rotate(-10deg);
}
.paper {
  display: inline-block;
  margin: 0 2rem;
  transform: rotate(8deg);
}
.scissors {
  display: inline-block;
  transform: rotate(-5deg);
}

.langSwitcher {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
</style>
