<template>
  <h1>ROCK PAPER SCISSORS</h1>
  <main>
    <router-link :to="{ name: 'Play' }">Play</router-link>
    <router-link :to="{ name: 'Stats' }">Stats</router-link>
    <router-link :to="{ name: 'Settings' }">Settings</router-link>
  </main>
</template>
