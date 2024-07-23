<template>
  <main>
    <address>
      <h2>{{ t('contact') }}</h2>
      Claas Paaschburg <br />
      Hauptstr. 11b <br />
      23911 Einhaus <br />
      E-Mail: <a href="mailto:claas@paaschburg.de">claas@paaschburg.de</a>
    </address>

    <p>{{ t('disclaimer') }}</p>
    <router-link class="back" :to="{ name: 'Start' }">{{ t('back') }}</router-link>
  </main>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h2 {
  margin: 1rem 0 0;
}
address {
  font-style: normal;
}

address a {
  font-style: italic;
  font-weight: bold;
  background-color: transparent;
  outline: none;
  margin: 0;
  padding: 0;
}

p {
  max-width: 60%;
  font-style: italic;
}
</style>
