<template>
  <p>Your Score: {{ this.scoreUser }}</p>
  <p>Computer's Score: {{ this.scoreComputer }}</p>
  <p></p>
  <button choice="Rock" @click="playRound">ROCK</button>
  <button choice="Paper" @click="playRound">PAPER</button>
  <button choice="Scissors" @click="playRound">SCISSORS</button>
  <p>{{ result }}</p>
  <router-link :to="{ name: 'Start' }">Back</router-link>
</template>

<script>
export default {
  data() {
    return {
      scoreUser: 0,
      scoreComputer: 0,
      choices: ['Rock', 'Paper', 'Scissors'],
      choiceUser: '',
      choiceComputer: '',
      result: ''
    }
  },
  methods: {
    playRound(event) {
      this.choiceComputer = this.choices[Math.floor(Math.random() * this.choices.length)]
      this.choiceUser = event.target.getAttribute('choice')

      if (this.choiceComputer === this.choiceUser) {
        this.result = `It's a draw! You both chose ${this.choiceUser}`
      } else if (this.choiceComputer === 'Rock' && this.choiceUser === 'Paper') {
        this.result = `You've scored a point! You chose ${this.choiceUser} and the computer chose ${this.choiceComputer}`
        this.scoreUser++
      } else if (this.choiceComputer === 'Rock' && this.choiceUser === 'Scissors') {
        this.result = `You've lost this round! You chose ${this.choiceUser} and the computer chose ${this.choiceComputer}`
        this.scoreComputer++
      } else if (this.choiceComputer === 'Paper' && this.choiceUser === 'Rock') {
        this.result = `You've lost this round! You chose ${this.choiceUser} and the computer chose ${this.choiceComputer}`
        this.scoreComputer++
      } else if (this.choiceComputer === 'Paper' && this.choiceUser === 'Scissors') {
        this.result = `You've scored a point! You chose ${this.choiceUser} and the computer chose ${this.choiceComputer}`
        this.scoreUser++
      } else if (this.choiceComputer === 'Scissors' && this.choiceUser === 'Rock') {
        this.result = `You've scored a point! You chose ${this.choiceUser} and the computer chose ${this.choiceComputer}`
        this.scoreUser++
      } else if (this.choiceComputer === 'Scissors' && this.choiceUser === 'Paper') {
        this.result = `You've lost this round! You chose ${this.choiceUser} and the computer chose ${this.choiceComputer}`
        this.scoreComputer++
      } else {
        this.result = 'Uh-oh! Looks like something went wrong.'
      }
    }
  }
}
</script>
