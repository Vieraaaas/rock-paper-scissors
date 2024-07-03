<template>
  <main>
    <div class="scores">
      <p>{{ t('your-score') }}: {{ scoreUser }}</p>
      <p>{{ t('computers-score') }} {{ scoreComputer }}</p>
    </div>

    <div id="arena" aria-hidden="true">
      <div id="arenaDivLeft"></div>
      <img id="imgChoiceUser" src="/images/rock.svg" />
      <div id="arenaDivMiddle"></div>
      <img id="imgChoiceComputer" src="/images/scissors.svg" />
      <div id="arenaDivRight"></div>
    </div>

    <div class="input">
      <button choice="Rock" @click="playRound">
        {{ t('rock').toUpperCase() }}
        <img class="button-img" src="/images/rock.svg" aria-hidden="true" />
      </button>
      <button choice="Paper" @click="playRound">
        {{ t('paper').toUpperCase() }}
        <img class="button-img" src="/images/paper.svg" aria-hidden="true" />
      </button>
      <button choice="Scissors" @click="playRound">
        {{ t('scissors').toUpperCase() }}
        <img class="button-img" src="/images/scissors.svg" aria-hidden="true" />
      </button>
    </div>
    <div class="output">
      <p>{{ result }}</p>
      <dialog ref="match-end">
        <p>{{ endMsg }}</p>
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
      let resultChoiceUser = ''
      let resultChoiceComputer = ''
      if (localStorage.getItem('lang') === 'ger') {
        resultChoiceUser = this.$t(this.choiceUser.toLowerCase())
        resultChoiceComputer = this.$t(this.choiceComputer.toLowerCase())
      } else {
        resultChoiceUser = this.choiceUser
        resultChoiceComputer = this.choiceComputer
      }

      this.animateRound()

      if (this.choiceComputer === this.choiceUser) {
        this.result = this.$t('result-draw') + ` ${resultChoiceUser}`
        this.state.data.drawn += 1
      } else if (
        (this.choiceComputer === 'Rock' && this.choiceUser === 'Paper') ||
        (this.choiceComputer === 'Paper' && this.choiceUser === 'Scissors') ||
        (this.choiceComputer === 'Scissors' && this.choiceUser === 'Rock')
      ) {
        this.result =
          this.$t('result-win-start') +
          ` ${resultChoiceUser} ` +
          this.$t('result-end') +
          ` ${resultChoiceComputer}`
        this.scoreUser++
        this.state.data.roundsWon += 1
      } else if (
        (this.choiceComputer === 'Rock' && this.choiceUser === 'Scissors') ||
        (this.choiceComputer === 'Paper' && this.choiceUser === 'Rock') ||
        (this.choiceComputer === 'Scissors' && this.choiceUser === 'Paper')
      ) {
        this.result =
          this.$t('result-loss-start') +
          ` ${resultChoiceUser} ` +
          this.$t('result-end') +
          ` ${resultChoiceComputer}`
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
      const choiceImages = ['/images/rock.svg', '/images/paper.svg', '/images/scissors.svg']

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

      imgChoiceUser.src = `/images/${this.choiceUser.toLowerCase()}.svg`
      imgChoiceUser.style.opacity = 1

      imgChoiceComputer.src = `/images/${this.choiceComputer.toLowerCase()}.svg`
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

.output {
  text-align: center;
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

@media (max-width: 480px) {
  #imgChoiceUser,
  #imgChoiceComputer {
    max-height: 8rem;
  }
}

@media (max-width: 360px) {
  .input {
    display: flex;
    flex-direction: column;
  }
  #imgChoiceUser,
  #imgChoiceComputer {
    max-height: 6rem;
  }
  #arena {
    height: 5rem;
  }
}

@media (max-width: 280px) {
  .scores {
    text-align: center;
  }
}
</style>
