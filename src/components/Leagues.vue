<template>
    <div class="d-flex justify-content-center m-2">
        <div class="d-flex">
            <select class="custom-select" v-model="api">
                <option selected :value="apis.footballdb">football.db</option>
                <option :value="apis.footballData">football-data.org</option>
            </select>
            <select class="custom-select" v-model="selected">
                <option selected value="0">Select the league</option>
                <option v-for="league in leagues" :key="league.key" :value="league.key">{{ league.value }}</option>
            </select>
        </div>
    </div>
</template>

<script>
import apis from '../data/Apis';
import footballdbLeagues from '../data/footballdb/Leagues';
import footballDataLeagues from '../data/football-data/Leagues';
import { loadLeagueResources } from '../data/League';

export default {
    data() {
        return {
            apis,
            api: apis.footballdb,
            selected: 0,
            leagues: [...footballdbLeagues]
        }
    },
    watch: {
        api(value) {
            if (value == apis.footballdb) {
                this.leagues = footballdbLeagues;
            } else {
                this.leagues = footballDataLeagues;
            }
            this.selected = 0;
            this.$emit('api', value);
        },
        selected(value) {
            const league = this.leagues.find(l => l.key == value);
            this.$emit('league', loadLeagueResources(this.api, league));
        }
    }
}
</script>
