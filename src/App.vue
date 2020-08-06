<template>
  <div id="app">
    <Leagues></Leagues>
    <League v-if="Object.keys(club).length == 0"></League>
    <div class="d-flex justify-content-center">
      <Club v-if="Object.keys(club).length > 0" 
          :club="club" 
          @club="selectedClub"
          @compare-club="compareClubSelected"
          @clear="selectedClub" />
      <Club v-if="Object.keys(compareClub).length > 0" 
          :club="compareClub"
          @clear="compareClubSelected" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Leagues from './components/Leagues';
import League from './components/League';
import Club from './components/Club';
import { loadClubResources } from './data/Club';

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
      compareClub: {},
      ...mapGetters([
        'api',
        'league',
      ])
    }
  },
  methods: {
    selectLeague(league) {
      this.league = league;
      this.club = {};
      this.compareClub = {};
    },
    selectedClub(club) {
      let loadedClub = club;
      if (club) {
        loadedClub = loadClubResources(this.api, this.league, club)
      }
      this.club = loadedClub;
      this.compareClub = {};
    },
    compareClubSelected(club) {
      let loadedClub = club;
      if (club) {
        loadedClub = loadClubResources(this.api, this.league, club)
      }
      this.compareClub = loadedClub;
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
}
</style>
