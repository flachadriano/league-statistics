<template>
  <div id="app">
    <Leagues v-on:league="changedLeague" />
    <League v-if="Object.keys(club).length == 0" 
        v-bind:league="league" 
        v-on:club="selectedClub" />
    <div class="d-flex justify-content-center">
      <Club v-if="Object.keys(club).length > 0" 
          v-bind:league="league" 
          v-bind:club="club" 
          v-on:compare-club="compareClubSelected"
          v-on:clear="selectedClub" />
      <Club v-if="Object.keys(compareClub).length > 0" 
          v-bind:league="league" 
          v-bind:club="compareClub"
          v-on:clear="compareClubSelected" />
    </div>
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
      league: {},
      club: {},
      compareClub: {}
    }
  },
  methods: {
    changedLeague(league) {
      this.league = league;
      this.club = {};
      this.compareClub = {};
    },
    selectedClub(club) {
      this.club = club;
      this.compareClub = {};
    },
    compareClubSelected(club) {
      this.compareClub = club;
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
}
</style>
