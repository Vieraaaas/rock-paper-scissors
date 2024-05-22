<template>
  <h2>Your Statistics</h2>

  <h3>You</h3>
  <ul>
    <li>Rock: {{ this.state.data.userRock }} - {{ this.percentageUserRock }}%</li>
    <li>Paper: {{ this.state.data.userPaper }} - {{ this.percentageUserPaper }}%</li>
    <li>Scissors: {{ this.state.data.userScissors }} - {{ this.percentageUserScissors }}%</li>
  </ul>
  <h3>Computer</h3>
  <ul>
    <li>Rock: {{ this.state.data.computerRock }} - {{ this.percentageComputerRock }}%</li>
    <li>Paper: {{ this.state.data.computerPaper }} - {{ this.percentageComputerPaper }}%</li>
    <li>
      Scissors: {{ this.state.data.computerScissors }} - {{ this.percentageComputerScissors }}%
    </li>
  </ul>
  <h3>Matches</h3>
  <ul>
    <li>Matches won: {{ this.state.data.matchesWon }} - {{ this.percentageMatchesWon }}%</li>
    <li>Matches lost: {{ this.state.data.matchesLost }} - {{ this.percentageMatchesLost }}%</li>
    <br />
    <li>Rounds won: {{ this.state.data.roundsWon }} - {{ this.percentageRoundsWon }}%</li>
    <li>Rounds lost: {{ this.state.data.roundsLost }} - {{ this.percentageRoundsLost }}%</li>
    <li>Rounds drawn: {{ this.state.data.drawn }} - {{ this.percentageRoundsDrawn }}%</li>
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

  computed: {
    totalRounds() {
      return this.state.data.userRock + this.state.data.userPaper + this.state.data.userScissors
    },
    percentageUserRock() {
      return (this.state.data.userRock / this.totalRounds) * 100
    },
    percentageUserPaper() {
      return (this.state.data.userPaper / this.totalRounds) * 100
    },
    percentageUserScissors() {
      return (this.state.data.userScissors / this.totalRounds) * 100
    },
    percentageComputerRock() {
      return (this.state.data.computerRock / this.totalRounds) * 100
    },
    percentageComputerPaper() {
      return (this.state.data.computerPaper / this.totalRounds) * 100
    },
    percentageComputerScissors() {
      return (this.state.data.computerScissors / this.totalRounds) * 100
    },
    percentageRoundsWon() {
      return (this.state.data.roundsWon / this.totalRounds) * 100
    },
    percentageRoundsLost() {
      return (this.state.data.roundsLost / this.totalRounds) * 100
    },
    percentageRoundsDrawn() {
      return (this.state.data.drawn / this.totalRounds) * 100
    },
    totalMatches() {
      return this.state.data.matchesWon + this.state.data.matchesLost
    },
    percentageMatchesWon() {
      return (this.state.data.matchesWon / this.totalMatches) * 100
    },
    percentageMatchesLost() {
      return (this.state.data.matchesLost / this.totalMatches) * 100
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
