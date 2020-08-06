<template>
    <div style="background-color: #666" class="card m-1">
        <h3 class="card-title">Stastistics</h3>
        <div>
            <span>Position: {{ position }}</span><br/>
            <span>{{ scored }} goals for (average {{ scoredPerMatch }} - {{ rankedScore }} best attack)</span><br/>
            <span>{{ against }} goals against (against {{ againstPerMatch }} - {{ rankedAgainst }} best defense)</span><br/>
            <span>Top score of team in a match {{ topScored }}</span><br/>
            <span>Top scored total in a match {{ topScoredMatch }}</span><br/>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters([
            'club'
        ])
    },
    asyncComputed: {
        async position() {
            return await this.club.position();
        },
        async winInLast6() {
            return await this.club.winInLast6();
        },
        async scored() {
            return await this.club.scored();
        },
        async scoredPerMatch() {
            return await this.club.scoredPerMatch();
        },
        async rankedScore() {
            return await this.club.rankedScore();
        },
        async against() {
            return await this.club.against();
        },
        async againstPerMatch() {
            return await this.club.againstPerMatch();
        },
        async rankedAgainst() {
            return await this.club.rankedAgainst();
        },
        async topScored() {
            return await this.club.topScored();
        },
        async topScoredMatch() {
            return await this.club.topScoredMatch();
        }
    }
}
</script>