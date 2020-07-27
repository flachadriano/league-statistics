<template>
  <div id="app">
    <Leagues @api="selectApi" @league="selectLeague" />
    <League v-if="Object.keys(club).length == 0" 
        :api="api" :league="league" 
        @club="selectedClub" />
    <div class="d-flex justify-content-center">
      <Club v-if="Object.keys(club).length > 0" 
          :club="club" 
          @compare-club="compareClubSelected"
          @clear="selectedClub" />
      <Club v-if="Object.keys(compareClub).length > 0" 
          :club="compareClub"
          @clear="compareClubSelected" />
    </div>
  </div>
</template>

<script>
import apis from './data/Apis';
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
      api: apis.footballdb,
      league: {},
      club: {},
      compareClub: {}
    }
  },
  methods: {
    selectApi(api) {
      this.api = api;
    },
    selectLeague(league) {
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
