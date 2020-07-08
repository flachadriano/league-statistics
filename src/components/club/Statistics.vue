<template>
    <div class="card m-1">
        <h3 class="card-title">Stastistics</h3>
        <div>
            <span>Position: {{ position }}</span><br/>
            <span>Win {{ winInLast6() }} in last 6 matches</span><br/>
            <span>{{ scored() }} goals for (average {{ (scored() / matches.length).toFixed(2) }} - {{ rankedScore }} best attack)</span><br/>
            <span>{{ against() }} goals against (against {{ (against() / matches.length).toFixed(2) }} - {{ rankedAgainst }} best defense)</span><br/>
            <span>Top score of team in a match {{ topScored() }}</span><br/>
            <span>Top scored total in a match {{ topScoredMatch() }}</span><br/>
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
        position: {
            async get() {
                const teams = await processClubs(this.league, 'points');
                return teams.find((team, i) => team.code == this.club.code ? team.index = i+1 : false).index;
            },
            default() {
                return '...'
            }
        },
        rankedScore: {
            async get() {
                const teams = await processClubs(this.league, 'goalsFor');
                return teams.find((team, i) => team.code == this.club.code ? team.index = i+1 : false).index;
            },
            default() {
                return '...'
            }
        },
        rankedAgainst: {
            async get() {
                const teams = await processClubs(this.league, 'goalsAgainst');
                return teams.reverse().find((team, i) => team.code == this.club.code ? team.index = i+1 : false).index;
            },
            default() {
                return '...'
            }
        }
    }
}
</script>