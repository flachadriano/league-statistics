<template>
  <div id="app">
    <Leagues></Leagues>
    <League v-if="!hasSelectedClub"></League>
    <div class="d-flex justify-content-center">
      <Club v-if="hasSelectedClub"></Club>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
  computed: {
      ...mapGetters([
        'hasSelectedClub',
      ])
  },
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
