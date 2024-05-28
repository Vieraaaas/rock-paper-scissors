<template>
  <main>
    <div class="scores">
      <p>Your Score: {{ this.scoreUser }}</p>
      <p>Computer's Score: {{ this.scoreComputer }}</p>
    </div>

    <div id="arena" aria-hidden="true">
      <div id="arenaDivLeft"></div>
      <img id="imgChoiceUser" src="@/assets/images/rock.svg" />
      <div id="arenaDivMiddle"></div>
      <img id="imgChoiceComputer" src="@/assets/images/scissors.svg" />
      <div id="arenaDivRight"></div>
    </div>

    <div class="input">
      <button choice="Rock" @click="playRound">
        ROCK
        <img class="button-img" src="@/assets/images/rock.svg" aria-hidden="true" />
      </button>
      <button choice="Paper" @click="playRound">
        PAPER
        <img class="button-img" src="@/assets/images/paper.svg" aria-hidden="true" />
      </button>
      <button choice="Scissors" @click="playRound">
        SCISSORS
        <img class="button-img" src="@/assets/images/scissors.svg" aria-hidden="true" />
      </button>
    </div>
    <div class="output">
      <p>{{ result }}</p>
      <dialog ref="match-end">
        <p>{{ this.endMsg }}</p>
        <button @click="playAgain">Again!</button>
        <router-link :to="{ name: 'Start' }">That's enough for now</router-link>
      </dialog>
    </div>

    <nav>
      <router-link :to="{ name: 'Start' }">Back</router-link>
    </nav>
  </main>
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
      endMsg: '',
      interval: null
    }
  },
  methods: {
    playRound(event) {
      this.choiceComputer = this.choices[Math.floor(Math.random() * this.choices.length)]
      this.choiceUser = event.target.getAttribute('choice')

      this.animateRound()

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
    },

    cycleImages() {
      const choiceImages = [
        'src/assets/images/rock.svg',
        'src/assets/images/paper.svg',
        'src/assets/images/scissors.svg'
      ]

      if (!this.interval) {
        this.interval = setInterval(changeImage, 1000)
      }
      function changeImage() {
        let imgChoiceUser = document.getElementById('imgChoiceUser')
        let imgChoiceComputer = document.getElementById('imgChoiceComputer')
        imgChoiceUser.src = choiceImages[Math.floor(Math.random() * choiceImages.length)]
        imgChoiceComputer.src = choiceImages[Math.floor(Math.random() * choiceImages.length)]
      }
    },

    animateRound() {
      const imgChoiceUser = document.getElementById('imgChoiceUser')
      const imgChoiceComputer = document.getElementById('imgChoiceComputer')
      const arenaDivLeft = document.getElementById('arenaDivLeft')
      const arenaDivMiddle = document.getElementById('arenaDivMiddle')
      const arenaDivRight = document.getElementById('arenaDivRight')

      arenaDivLeft.classList.remove('animateGrow')
      arenaDivRight.classList.remove('animateGrow')
      arenaDivMiddle.classList.remove('animateShrink')

      imgChoiceUser.src = `src/assets/images/${this.choiceUser.toLowerCase()}.svg`
      imgChoiceUser.style.opacity = 1

      imgChoiceComputer.src = `src/assets/images/${this.choiceComputer.toLowerCase()}.svg`
      imgChoiceComputer.style.opacity = 1

      //Force reflow to ensure that the animation works on successive rounds successive -> https://developer.mozilla.org/en-US/docs/Glossary/Reflow
      arenaDivLeft.offsetHeight
      arenaDivRight.offsetHeight
      arenaDivMiddle.offsetHeight

      clearInterval(this.interval)
      this.interval = null

      arenaDivLeft.classList.add('animateGrow')
      arenaDivRight.classList.add('animateGrow')
      arenaDivMiddle.classList.add('animateShrink')
    }
  },
  created() {
    this.state.loadStats()
    this.cycleImages()
  }
}
</script>

<style scoped>
main {
  width: 80vw;
}

.scores {
  display: flex;
  justify-content: space-between;
}

#arena {
  height: 10rem;
  display: flex;
  justify-content: space-between;
}

#imgChoiceUser,
#imgChoiceComputer {
  opacity: 0.2;
}

#arenaDivLeft,
#arenaDivRight {
  display: none;
}

#arenaDivLeft.animateGrow,
#arenaDivRight.animateGrow {
  width: 0%;
  display: flex;
}

#arenaDivMiddle {
  width: 100%;
}

.animateGrow {
  animation: 1s ease-in forwards grow;
}

.animateShrink {
  animation: 1s ease-in forwards shrink;
}

.input,
.output,
nav {
  width: fit-content;
  margin: 0 auto;
}

.button-img {
  display: block;
  pointer-events: none;
  height: 5rem;
}

@keyframes grow {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}

@keyframes shrink {
  0% {
    width: 100%;
  }
  100% {
    width: 0%;
  }
}
</style>
