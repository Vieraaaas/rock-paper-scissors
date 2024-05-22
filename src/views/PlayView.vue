<template>
  <p>Your Score: {{ this.scoreUser }}</p>
  <p>Computer's Score: {{ this.scoreComputer }}</p>
  <button choice="Rock" @click="playRound">ROCK</button>
  <button choice="Paper" @click="playRound">PAPER</button>
  <button choice="Scissors" @click="playRound">SCISSORS</button>
  <p>{{ result }}</p>
  <dialog ref="match-end">
    <p>{{ this.endMsg }}</p>
    <button @click="playAgain">Again!</button>
    <router-link :to="{ name: 'Start' }">That's enough for now</router-link>
  </dialog>
  <router-link :to="{ name: 'Start' }">Back</router-link>
</template>

<script>
import { statsStore } from '@/stores/stats.js'

export default {
  data() {
    return {
      state: statsStore(),
      scoreUser: 0,
      scoreComputer: 0,
      choices: ['Rock', 'Paper', 'Scissors'],
      choiceUser: '',
      choiceComputer: '',
      result: '',
      endMsg: ''
    }
  },
  methods: {
    playRound(event) {
      this.choiceComputer = this.choices[Math.floor(Math.random() * this.choices.length)]
      this.choiceUser = event.target.getAttribute('choice')

      if (this.choiceComputer === this.choiceUser) {
        this.result = `It's a draw! You both chose ${this.choiceUser}`
        this.state.data.drawn += 1
      } else if (
        (this.choiceComputer === 'Rock' && this.choiceUser === 'Paper') ||
        (this.choiceComputer === 'Paper' && this.choiceUser === 'Scissors') ||
        (this.choiceComputer === 'Scissors' && this.choiceUser === 'Rock')
      ) {
        this.result = `You've scored a point! You chose ${this.choiceUser} and the computer chose ${this.choiceComputer}`
        this.scoreUser++
        this.state.data.roundsWon += 1
      } else if (
        (this.choiceComputer === 'Rock' && this.choiceUser === 'Scissors') ||
        (this.choiceComputer === 'Paper' && this.choiceUser === 'Rock') ||
        (this.choiceComputer === 'Scissors' && this.choiceUser === 'Paper')
      ) {
        this.result = `You've lost this round! You chose ${this.choiceUser} and the computer chose ${this.choiceComputer}`
        this.scoreComputer++
        this.state.data.roundsLost += 1
      } else {
        this.result = 'Uh-oh! Looks like something went wrong.'
      }

      this.state.data[`user${this.choiceUser}`] += 1
      this.state.data[`computer${this.choiceComputer}`] += 1

      if (this.scoreUser >= 3) {
        this.state.data.matchesWon += 1
        this.endMsg = "You've won! Congratulations!"
        this.openDialog()
      }

      if (this.scoreComputer >= 3) {
        this.state.data.matchesLost += 1
        this.endMsg = "You've lost! Better luck next time!"
        this.openDialog()
      }

      localStorage.setItem('stats', JSON.stringify(this.state.data))
    },

    openDialog() {
      this.$refs['match-end'].showModal()
    },

    playAgain() {
      window.location.reload()
    }
  },
  created() {
    this.state.loadStats()
  }
}
</script>
