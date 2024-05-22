import { defineStore } from 'pinia'

export const statsStore = defineStore('stats', {
  state: () => {
    return {
      data: {
        userRock: 0,
        userPaper: 0,
        userScissors: 0,
        computerRock: 0,
        computerPaper: 0,
        computerScissors: 0,
        roundsWon: 0,
        roundsLost: 0,
        drawn: 0,
        matchesWon: 0,
        matchesLost: 0
      }
    }
  },
  actions: {
    loadStats() {
      if (localStorage.stats) {
        this.data = JSON.parse(localStorage.getItem('stats'))
      }
    }
  }
})
