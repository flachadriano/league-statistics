<template>
    <div class="d-flex justify-content-center m-2">
        <div>
            <select class="custom-select" v-model="selected">
                <option selected value="0">Select the league</option>
                <option v-for="league in leagues" :key="league.key" v-bind:value="league.key">{{ league.value }}</option>
            </select>
        </div>
    </div>
</template>

<script>
import { leagues, findLeague } from '../data/Leagues';

export default {
    data() {
        return {
            selected: 0,
            leagues: [...leagues]
        }
    },
    watch: {
        selected(value) {
            this.$emit('league', findLeague(value));
        }
    }
}
</script>
