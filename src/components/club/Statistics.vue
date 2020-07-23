<template>
    <div class="card m-1">
        <h3 class="card-title">Stastistics</h3>
        <div>
            <span>Position: {{ position }}</span><br/>
            <span>Win {{ winInLast6 }} in last 6 matches</span><br/>
            <span>{{ scored }} goals for (average {{ scoredPerMatch }} - {{ rankedScore }} best attack)</span><br/>
            <!-- <span>{{ against() }} goals against (against {{ (against() / matches.length).toFixed(2) }} - {{ rankedAgainst }} best defense)</span><br/>
            <span>Top score of team in a match {{ topScored() }}</span><br/>
            <span>Top scored total in a match {{ topScoredMatch() }}</span><br/> -->
        </div>
    </div>
</template>

<script>
export default {
    props: ['club', 'matches'],
    methods: {
        // isHome(match) {
        //     return match.team1.code == this.club.code;
        // },
        // against() {
        //     return this.matches.reduce((acc, match) => this.isHome(match) ? acc + match.score2 : acc + match.score1, 0);
        // },
        // topScored() {
        //     return Math.max(...this.matches.map(match => this.isHome(match) ? match.score1 : match.score2));
        // },
        // topScoredMatch() {
        //     return Math.max(...this.matches.map(match => match.score1 + match.score2));
        // }
    },
    asyncComputed: {
        async position() {
            return await this.club.position();
        },
        async winInLast6() {
            return await this.club.winInLast6();
        },
        async scored() {
            return this.club.scored();
        },
        async scoredPerMatch() {
            return this.club.scoredPerMatch();
        },
        async rankedScore() {
            return this.club.rankedScore();
        }
        // rankedScore: {
        //     async get() {
        //         const teams = await this.club.processClubs('goalsFor');
        //         return teams.find((team, i) => team.code == this.club.code ? team.index = i+1 : false).index;
        //     },
        //     default() {
        //         return '...'
        //     }
        // },
        // rankedAgainst: {
        //     async get() {
        //         const teams = await this.club.processClubs('goalsAgainst');
        //         return teams.reverse().find((team, i) => team.code == this.club.code ? team.index = i+1 : false).index;
        //     },
        //     default() {
        //         return '...'
        //     }
        // }
    }
}
</script>