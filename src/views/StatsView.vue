<template>
  <main>
    <h2>Your Statistics</h2>

    <h3>You</h3>
    <ul>
      <li v-if="!this.showPercentages">Rock: {{ this.state.data.userRock }}</li>
      <li v-else-if="this.showPercentages">Rock: {{ ~~this.percentageUserRock }}%</li>

      <li v-if="!this.showPercentages">Paper: {{ this.state.data.userPaper }}</li>
      <li v-else-if="this.showPercentages">Paper: {{ ~~this.percentageUserPaper }}%</li>

      <li v-if="!this.showPercentages">Scissors: {{ this.state.data.userScissors }}</li>
      <li v-else-if="this.showPercentages">Scissors: {{ ~~this.percentageUserScissors }}%</li>
    </ul>
    <h3>Computer</h3>
    <ul>
      <li v-if="!this.showPercentages">Rock: {{ this.state.data.computerRock }}</li>
      <li v-else-if="this.showPercentages">Rock: {{ ~~this.percentageComputerRock }}%</li>

      <li v-if="!this.showPercentages">Paper: {{ this.state.data.computerPaper }}</li>
      <li v-else-if="this.showPercentages">Paper: {{ ~~this.percentageComputerPaper }}%</li>

      <li v-if="!this.showPercentages">Scissors: {{ this.state.data.computerScissors }}</li>
      <li v-else-if="this.showPercentages">Scissors: {{ ~~this.percentageComputerScissors }}%</li>
    </ul>
    <h3>Matches</h3>
    <ul>
      <li v-if="!this.showPercentages">Matches won: {{ this.state.data.matchesWon }}</li>
      <li v-else-if="this.showPercentages">Matches won: {{ ~~this.percentageMatchesWon }}%</li>

      <li v-if="!this.showPercentages">Matches lost: {{ this.state.data.matchesLost }}</li>
      <li v-else-if="this.showPercentages">Matches lost: {{ ~~this.percentageMatchesLost }}%</li>

      <br />
      <li v-if="!this.showPercentages">Rounds won: {{ this.state.data.roundsWon }}</li>
      <li v-else-if="this.showPercentages">Rounds won: {{ ~~this.percentageRoundsWon }}%</li>

      <li v-if="!this.showPercentages">Rounds lost: {{ this.state.data.roundsLost }}</li>
      <li v-else-if="this.showPercentages">Rounds lost: {{ ~~this.percentageRoundsLost }}%</li>

      <li v-if="!this.showPercentages">Rounds drawn: {{ this.state.data.drawn }}</li>
      <li v-else-if="this.showPercentages">Rounds drawn: {{ ~~this.percentageRoundsDrawn }}%</li>
    </ul>

    <button @click="toggleStats">{{ this.toggleText }}</button>
    <br />

    <button @click="resetStats">Reset All Stats</button>
    <router-link :to="{ name: 'Start' }">Back</router-link>
  </main>
</template>

<script>
import { statsStore } from '@/stores/stats.js'

export default {
  data() {
    return {
      state: statsStore(),
      showPercentages: false,
      toggleText: 'Show Percentages'
    }
  },

  computed: {
    totalRounds() {
      return this.state.data.userRock + this.state.data.userPaper + this.state.data.userScissors
    },
    percentageUserRock() {
      return ((this.state.data.userRock / this.totalRounds) * 100).toFixed(0)
    },
    percentageUserPaper() {
      return ((this.state.data.userPaper / this.totalRounds) * 100).toFixed(0)
    },
    percentageUserScissors() {
      return ((this.state.data.userScissors / this.totalRounds) * 100).toFixed(0)
    },
    percentageComputerRock() {
      return ((this.state.data.computerRock / this.totalRounds) * 100).toFixed(0)
    },
    percentageComputerPaper() {
      return ((this.state.data.computerPaper / this.totalRounds) * 100).toFixed(0)
    },
    percentageComputerScissors() {
      return ((this.state.data.computerScissors / this.totalRounds) * 100).toFixed(0)
    },
    percentageRoundsWon() {
      return ((this.state.data.roundsWon / this.totalRounds) * 100).toFixed(0)
    },
    percentageRoundsLost() {
      return ((this.state.data.roundsLost / this.totalRounds) * 100).toFixed(0)
    },
    percentageRoundsDrawn() {
      return ((this.state.data.drawn / this.totalRounds) * 100).toFixed(0)
    },
    totalMatches() {
      return this.state.data.matchesWon + this.state.data.matchesLost
    },
    percentageMatchesWon() {
      return ((this.state.data.matchesWon / this.totalMatches) * 100).toFixed(0)
    },
    percentageMatchesLost() {
      return ((this.state.data.matchesLost / this.totalMatches) * 100).toFixed(0)
    }
  },

  methods: {
    toggleStats() {
      this.showPercentages = !this.showPercentages
      this.toggleText = this.showPercentages ? 'Show Integers' : 'Show Percentages'
    },

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
