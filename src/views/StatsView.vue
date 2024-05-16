<template>
  <h2>Your Statistics</h2>

  <h3>You</h3>
  <ul>
    <li>Rock: {{ this.state.data.userRock }}</li>
    <li>Paper: {{ this.state.data.userPaper }}</li>
    <li>Scissors: {{ this.state.data.userScissors }}</li>
  </ul>
  <h3>Computer</h3>
  <ul>
    <li>Rock: {{ this.state.data.computerRock }}</li>
    <li>Paper: {{ this.state.data.computerPaper }}</li>
    <li>Scissors: {{ this.state.data.computerScissors }}</li>
  </ul>
  <h3>Matches</h3>
  <ul>
    <li>Rounds won: {{ this.state.data.roundsWon }}</li>
    <li>Rounds lost: {{ this.state.data.roundsLost }}</li>
    <li>Rounds drawn: {{ this.state.data.drawn }}</li>
  </ul>

  <button @click="resetStats">Reset All Stats</button>
  <router-link :to="{ name: 'Start' }">Back</router-link>
</template>

<script>
import { statsStore } from '@/stores/stats.js'

export default {
  data() {
    return {
      state: statsStore()
    }
  },
  methods: {
    resetStats() {
      localStorage.clear()
      window.location.reload()
    }
  },

  created() {
    this.state.loadStats()
  }
}
</script>
