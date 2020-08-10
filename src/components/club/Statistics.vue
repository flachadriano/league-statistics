<template>
    <div style="background-color: #666" class="card m-1">
        <h3 class="card-title mt-2">This season</h3>
        <div>
            <span>Position: {{ position }}</span><br/>
            <span>{{ scored }} goals for (average {{ scoredPerMatch }} - {{ rankedScore }} best attack)</span><br/>
            <span>{{ against }} goals against (against {{ againstPerMatch }} - {{ rankedAgainst }} best defense)</span><br/>
        </div>
        <NextMatch></NextMatch>
    </div>
</template>

<script>
import NextMatch from './NextMatch';
import { mapGetters } from 'vuex'

export default {
    components: {
        NextMatch,
    },
    computed: {
        ...mapGetters([
            'club'
        ])
    },
    asyncComputed: {
        async position() {
            return await this.$store.state.club.position();
        },
        async scored() {
            return await this.$store.state.club.scored();
        },
        async scoredPerMatch() {
            return await this.$store.state.club.scoredPerMatch();
        },
        async rankedScore() {
            return await this.$store.state.club.rankedScore();
        },
        async against() {
            return await this.$store.state.club.against();
        },
        async againstPerMatch() {
            return await this.$store.state.club.againstPerMatch();
        },
        async rankedAgainst() {
            return await this.$store.state.club.rankedAgainst();
        },
    }
}
</script>