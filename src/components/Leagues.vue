<template>
    <div class="d-flex justify-content-center m-2">
        <div class="d-flex">
            <select class="custom-select" :value="api" @input="changeApi">
                <option v-for="item in apis" :key="item" :value="item">{{ item }}</option>
            </select>
            <select class="custom-select" :value="league" @input="changeLeague">
                <option value="0">Select the league</option>
                <option v-for="item in leagues" :key="item.key" :value="item.key">{{ item.value }}</option>
            </select>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { loadLeagueResources } from '../data/League'

export default {
    computed: {
        ...mapGetters([
            'apis',
            'api',
            'leagues',
            'league',
        ])
    },
    methods: {
        ...mapMutations([
            'changeApi',
            'changeLeague',
        ])
    },
    watch: {
        api(api) {
            this.$emit('api', api);
        },
        league(value) {
            const league = this.$store.state.leagues.find(l => l.key == value);
            this.$emit('league', loadLeagueResources(this.api, league));
        }
    }
}
</script>
