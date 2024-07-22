<template>
  <nav>
    <a
      rel="noopener"
      target="_blank"
      class="link-elsewhere"
      href="https://github.com/Vieraaaas/rock-paper-scissors"
      ><img src="/images/github.svg" alt="github logo" /> {{ t('github-link') }}</a
    >
    <a
      rel="noopener"
      target="_blank"
      class="link-elsewhere"
      href="https://www.linkedin.com/in/claas-paaschburg/"
      >{{ t('linkedin-link') }} <img src="/images/linkedin.png" alt="linkedin logo"
    /></a>
    <router-link class="back" :to="{ name: 'Start' }">{{ t('back') }}</router-link>
  </nav>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<style scoped>
nav {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.link-elsewhere {
  margin-top: 1rem;
  width: 100%;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5rem;
}

.link-elsewhere + .link-elsewhere {
  margin: 1rem;
}

.link-elsewhere img {
  height: 4rem;
}
.back {
  max-width: fit-content;
}
</style>
