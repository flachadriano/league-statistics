<template>
    <div class="d-flex justify-content-center m-2">
        <div class="d-flex">
            <select class="custom-select" v-model="api">
                <option selected value="1">football.db</option>
                <option value="2">football-data.org</option>
            </select>
            <select class="custom-select" v-model="selected">
                <option selected value="0">Select the league</option>
                <option v-for="league in leagues" :key="league.key" v-bind:value="league.key">{{ league.value }}</option>
            </select>
        </div>
    </div>
</template>

<script>
import footballdbLeagues from '../data/footballdb/Leagues';
import footballDataLeagues from '../data/football-data/Leagues';

export default {
    data() {
        return {
            api: 1,
            selected: 0,
            leagues: [...footballdbLeagues]
        }
    },
    watch: {
        api(value) {
            if (value == 1) {
                this.leagues = footballdbLeagues;
            } else {
                this.leagues = footballDataLeagues;
            }
        },
        selected(value) {
            const league = this.leagues.find(l => l.key == value);
            this.$emit('league', league);
        }
    }
}
</script>
