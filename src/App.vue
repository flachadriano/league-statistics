<template>
  <div id="app">
    <Leagues v-on:league="changedLeague" />
    <League v-if="Object.keys(club).length == 0" v-bind:league="league" v-on:club="selectedClub" />
    <Club v-bind:club="club" />
  </div>
</template>

<script>
import Leagues from './components/Leagues';
import League from './components/League';
import Club from './components/Club';

export default {
  name: 'App',
  components: {
    Leagues,
    League,
    Club
  },
  data() {
    return {
      league: '--',
      club: {}
    }
  },
  methods: {
    changedLeague(league) {
      this.league = league;
      this.club = {};
    },
    selectedClub(club) {
      this.club = club;
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
</style>
