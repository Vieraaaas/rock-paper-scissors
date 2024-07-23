<template>
  <header class="site-header">
    <h1>
      <span class="rock">{{ t('header-one') }}</span>
      <span class="paper">{{ t('header-two') }}</span>
      <span class="scissors">{{ t('header-three') }}</span>
    </h1>
    <div class="header-interactive">
      <LanguageSwitcher />
      <router-link :to="{ name: 'Legal' }">{{ t('legal') }}</router-link>
    </div>
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

.header-interactive {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  font-family: 'Roboto Flex', sans-serif;
  font-size: 1rem;
  font-weight: bold;
}

.header-interactive a {
  outline: none;
  background-color: transparent;
  padding: 0;
  margin: 0;
}

@media (max-width: 800px) {
  .header-interactive {
    position: relative;
    margin-bottom: 1rem;
  }
}
</style>
