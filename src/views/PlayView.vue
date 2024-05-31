<template>
  <main>
    <div class="scores">
      <p>{{ t('your-score') }}: {{ this.scoreUser }}</p>
      <p>{{ t('computers-score') }} {{ this.scoreComputer }}</p>
    </div>

    <div id="arena" aria-hidden="true">
      <div id="arenaDivLeft"></div>
      <img id="imgChoiceUser" src="@/assets/images/rock.svg" />
      <div id="arenaDivMiddle"></div>
      <img id="imgChoiceComputer" src="@/assets/images/scissors.svg" />
      <div id="arenaDivRight"></div>
    </div>

    <div class="input">
      <button :choice="rock" @click="playRound">
        {{ t('rock').toUpperCase() }}
        <img class="button-img" src="@/assets/images/rock.svg" aria-hidden="true" />
      </button>
      <button :choice="paper" @click="playRound">
        {{ t('paper').toUpperCase() }}
        <img class="button-img" src="@/assets/images/paper.svg" aria-hidden="true" />
      </button>
      <button :choice="scissors" @click="playRound">
        {{ t('scissors').toUpperCase() }}
        <img class="button-img" src="@/assets/images/scissors.svg" aria-hidden="true" />
      </button>
    </div>
    <div class="output">
      <p>{{ result }}</p>
      <dialog ref="match-end">
        <p>{{ this.endMsg }}</p>
        <button @click="playAgain">{{ t('again') }}!</button>
        <router-link :to="{ name: 'Start' }">{{ t('enough') }}</router-link>
      </dialog>
    </div>

    <nav>
      <router-link :to="{ name: 'Start' }">{{ t('back') }}</router-link>
    </nav>
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
      scoreUser: 0,
      scoreComputer: 0,
      rock: this.$t('rock'),
      paper: this.$t('paper'),
      scissors: this.$t('scissors'),
      choices: [],
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
        this.result = this.$t('result-draw') + ` ${this.choiceUser}`
        this.state.data.drawn += 1
      } else if (
        (this.choiceComputer === this.rock && this.choiceUser === this.paper) ||
        (this.choiceComputer === this.paper && this.choiceUser === this.scissors) ||
        (this.choiceComputer === this.scissors && this.choiceUser === this.rock)
      ) {
        this.result =
          this.$t('result-win-start') +
          ` ${this.choiceUser} ` +
          this.$t('result-end') +
          ` ${this.choiceComputer}`
        this.scoreUser++
        this.state.data.roundsWon += 1
      } else if (
        (this.choiceComputer === this.rock && this.choiceUser === this.scissors) ||
        (this.choiceComputer === this.paper && this.choiceUser === this.rock) ||
        (this.choiceComputer === this.scissors && this.choiceUser === this.paper)
      ) {
        this.result =
          this.$t('result-loss-start') +
          ` ${this.choiceUser} ` +
          this.$t('result-end') +
          ` ${this.choiceComputer}`
        this.scoreComputer++
        this.state.data.roundsLost += 1
      } else {
        this.result = this.$t('error')
      }

      this.state.data[`user${this.choiceUser}`] += 1
      this.state.data[`computer${this.choiceComputer}`] += 1

      if (this.scoreUser >= 3) {
        this.state.data.matchesWon += 1
        this.endMsg = this.$t('win-message')
        this.openDialog()
      }

      if (this.scoreComputer >= 3) {
        this.state.data.matchesLost += 1
        this.endMsg = this.$t('loss-message')
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

    resetAnimation() {
      const imgChoiceUser = document.getElementById('imgChoiceUser')
      const imgChoiceComputer = document.getElementById('imgChoiceComputer')
      const arenaDivLeft = document.getElementById('arenaDivLeft')
      const arenaDivMiddle = document.getElementById('arenaDivMiddle')
      const arenaDivRight = document.getElementById('arenaDivRight')

      arenaDivLeft.classList.remove('animateGrow')
      arenaDivRight.classList.remove('animateGrow')
      arenaDivMiddle.classList.remove('animateShrink')
      imgChoiceUser.classList.remove('animateRotateUser')
      imgChoiceComputer.classList.remove('animateRotateComputer')

      imgChoiceUser.style.opacity = 0.2
      imgChoiceComputer.style.opacity = 0.2
    },

    animateRound() {
      const imgChoiceUser = document.getElementById('imgChoiceUser')
      const imgChoiceComputer = document.getElementById('imgChoiceComputer')
      const arenaDivLeft = document.getElementById('arenaDivLeft')
      const arenaDivMiddle = document.getElementById('arenaDivMiddle')
      const arenaDivRight = document.getElementById('arenaDivRight')

      this.resetAnimation()

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
      imgChoiceUser.classList.add('animateRotateUser')
      imgChoiceComputer.classList.add('animateRotateComputer')
    }
  },
  created() {
    this.state.loadStats()
    this.cycleImages()
    this.choices = [this.rock, this.paper, this.scissors]
  },
  mounted() {
    this.resetAnimation()
  },

  unmounted() {
    clearInterval(this.interval)
    this.interval = null
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
  margin-bottom: 1rem;
}

#imgChoiceUser,
#imgChoiceComputer {
  opacity: 0.2;
  transition: rotate 1s;
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

.animateRotateUser {
  animation: 1s ease-in forwards rotate-user;
}

.animateRotateComputer {
  animation: 1s ease-in forwards rotate-computer;
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

@keyframes rotate-user {
  0% {
    rotate: 0deg;
  }
  100% {
    rotate: 75deg;
  }
}
@keyframes rotate-computer {
  0% {
    rotate: 0deg;
  }
  100% {
    rotate: -75deg;
  }
}
</style>
