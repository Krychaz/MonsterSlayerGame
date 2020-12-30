function getRandValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({

  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null
    };
  },
  computed: {
    monsterStyleBar() {
      return {width: this.monsterHealth + '%'};
    },
    playerStyleBar() {
      return {width: this.playerHealth + '%'};
    },
    allowSpecialAttack() {
      return this.currentRound % 3 !== 0;
    },
    allowPlayerHeal() {
      return this.currentRound % 3 !== 0;
    }
  },
  watch:{
    playerHealth(value) {
      if(value <= 0 && this.monsterHealth <= 0) {
        this.winner = 'draw';
      } else if (value <= 0) {
        this.winner = 'monster';
      } 
    },
    monsterHealth(value){
      if(value <= 0 && this.playerHealth <= 0) {
        this.winner = 'draw';
      } else if (value <= 0) {
        this.winner = 'player';
      }
    }
},

  methods: {
    playerAttack() {
      this.currentRound++;
      const attackValue = getRandValue(5, 17);
      this.monsterHealth -= attackValue;
      this.monsterAttack();
    },

    monsterAttack() {
      const attackValue = getRandValue(5, 20);
      this.playerHealth -= attackValue;
    },

    playerSpecialAttack() {
      this.currentRound++;
      const attackValue = getRandValue(10, 30);
      this.monsterHealth -= attackValue;
      this.monsterAttack();
    },

    playerHeal() {
      this.currentRound++;
      const healValue = getRandValue(5, 15);
      if(this.playerHealth + healValue > 100){
        this.playerHealth = 100;
      }else{
        this.playerHealth += healValue;
      }
      this.monsterAttack();
    },

    surrender() {

    }
  }
});

app.mount('#game');