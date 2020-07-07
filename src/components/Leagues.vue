<template>
    <div>
        <span class="mr-2">League</span>
        <select v-model="selected">
            <option v-for="league in leagues" :key="league.key" v-bind:value="league.key">{{ league.value }}</option>
        </select>
    </div>
</template>

<script>
import { leagues, findLeague } from '../data/Leagues';

export default {
    data() {
        return {
            selected: null,
            leagues: [
                {code: null, value: ''},
                ...leagues
            ]
        }
    },
    watch: {
        selected(value) {
            this.$emit('league', findLeague(value));
        }
    }
}
</script>
