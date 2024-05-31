<template>
  <main>
    <h2>{{ t('your-statistics') }}</h2>

    <h3>{{ t('you') }}</h3>
    <ul>
      <li v-if="!showPercentages">{{ t('rock') }}: {{ state.data.userRock }}</li>
      <li v-else-if="showPercentages">{{ t('rock') }}: {{ ~~percentageUserRock }}%</li>

      <li v-if="!showPercentages">{{ t('paper') }}: {{ state.data.userPaper }}</li>
      <li v-else-if="showPercentages">{{ t('paper') }}: {{ ~~percentageUserPaper }}%</li>

      <li v-if="!showPercentages">{{ t('scissors') }}: {{ state.data.userScissors }}</li>
      <li v-else-if="showPercentages">{{ t('scissors') }}: {{ ~~percentageUserScissors }}%</li>
    </ul>
    <h3>{{ t('computer') }}</h3>
    <ul>
      <li v-if="!showPercentages">{{ t('rock') }}: {{ state.data.computerRock }}</li>
      <li v-else-if="showPercentages">{{ t('rock') }}: {{ ~~percentageComputerRock }}%</li>

      <li v-if="!showPercentages">{{ t('paper') }}: {{ state.data.computerPaper }}</li>
      <li v-else-if="showPercentages">{{ t('paper') }}: {{ ~~percentageComputerPaper }}%</li>

      <li v-if="!showPercentages">{{ t('scissors') }}: {{ state.data.computerScissors }}</li>
      <li v-else-if="showPercentages">{{ t('scissors') }}: {{ ~~percentageComputerScissors }}%</li>
    </ul>
    <h3>{{ t('matches') }}</h3>
    <ul>
      <li v-if="!showPercentages">
        {{ t('matches') }} {{ t('won') }}: {{ state.data.matchesWon }}
      </li>
      <li v-else-if="showPercentages">
        {{ t('matches') }} {{ t('won') }}: {{ ~~percentageMatchesWon }}%
      </li>

      <li v-if="!showPercentages">
        {{ t('matches') }} {{ t('lost') }}: {{ state.data.matchesLost }}
      </li>
      <li v-else-if="showPercentages">
        {{ t('matches') }} {{ t('lost') }}: {{ ~~percentageMatchesLost }}%
      </li>

      <br />
      <li v-if="!showPercentages">{{ t('rounds') }} {{ t('won') }}: {{ state.data.roundsWon }}</li>
      <li v-else-if="showPercentages">
        {{ t('rounds') }} {{ t('won') }}: {{ ~~percentageRoundsWon }}%
      </li>

      <li v-if="!showPercentages">
        {{ t('rounds') }} {{ t('lost') }}: {{ state.data.roundsLost }}
      </li>
      <li v-else-if="showPercentages">
        {{ t('rounds') }} {{ t('lost') }}: {{ ~~percentageRoundsLost }}%
      </li>

      <li v-if="!showPercentages">{{ t('rounds') }} {{ t('drawn') }}: {{ state.data.drawn }}</li>
      <li v-else-if="showPercentages">
        {{ t('rounds') }} {{ t('drawn') }}: {{ ~~percentageRoundsDrawn }}%
      </li>
    </ul>

    <button @click="toggleStats">{{ toggleText }}</button>
    <br />

    <button @click="resetStats">{{ t('reset-all-stats') }}</button>
    <router-link :to="{ name: 'Start' }">{{ t('back') }}</router-link>
  </main>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<script>
import { statsStore } from '@/stores/stats.js'

export default {
  data() {
    return {
      state: statsStore(),
      showPercentages: false,
      toggleText: this.$t('show-percentages')
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
      this.toggleText = this.showPercentages
        ? this.$t('show-integers')
        : this.$t('show-percentages')
    },

    resetStats() {
      localStorage.removeItem('stats')
      window.location.reload()
    }
  },

  created() {
    this.state.loadStats()
  }
}
</script>
