<template>
    <div class="card m-1">
        <h3 class="card-title">Stastistics</h3>
        <div>
            <span>Win {{ winInLast6() }} in last 6 matches</span><br/>
            <span>{{ scored() }} goals for</span><br/>
            <span>{{ against() }} goals against</span><br/>
            <span>Top score in a match {{ topScored() }}</span><br/>
            <span>Top scored match {{ topScoredMatch() }}</span><br/>
            <!-- <span>Best in {{ rankedScore }}</span> -->
        </div>
    </div>
</template>

<script>
import { processClubs } from '../../data/League';

export default {
    props: ['league', 'club', 'matches'],
    methods: {
        isHome(match) {
            return match.team1.code == this.club.code;
        },
        winInLast6() {
            const last6matches = this.matches.slice(0, 6);
            return last6matches.filter(match => {
                const home = match.team1.code == this.club.code;
                if (home) {
                    return match.score1 > match.score2;
                } else {
                    return match.score1 < match.score2;
                }
            }).length;
        },
        scored() {
            return this.matches.reduce((acc, match) => this.isHome(match) ? acc + match.score1 : acc + match.score2, 0);
        },
        against() {
            return this.matches.reduce((acc, match) => this.isHome(match) ? acc + match.score2 : acc + match.score1, 0);
        },
        topScored() {
            return Math.max(...this.matches.map(match => this.isHome(match) ? match.score1 : match.score2));
        },
        topScoredMatch() {
            return Math.max(...this.matches.map(match => match.score1 + match.score2));
        }
    },
    asyncComputed: {
        rankedScore: {
            async get() {
                const teams = await processClubs(this.league);
                return teams.find(team => team.code == this.club.code).goalsFor;
            },
            default() {
                return '...'
            }
        }
    }
}
</script>