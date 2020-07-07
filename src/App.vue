<template>
  <div id="app">
    <Leagues v-on:league="changedLeague" />
    <Teams v-bind:league="league" />
  </div>
</template>

<script>
import Leagues from './components/Leagues';
import Teams from './components/Teams';

export default {
  name: 'App',
  components: {
    Leagues,
    Teams
  },
  data() {
    return {
      league: '--'
    }
  },
  methods: {
    changedLeague(league) {
      this.league = league;
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
