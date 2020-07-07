<template>
    <div class="d-flex justify-content-center m-1">
        <div>
            <h2 class="d-flex justify-content-center">
                <span>{{ club.name }}</span>
                <a class="close" href="#" v-on:click.prevent="clear">(close)</a>
            </h2>
            <div class="card m-1">
                <h3 class="card-title">Stastistics</h3>
                <div>
                    <span>Win {{ winInLast6(matches||[]) }} in last 6 matches</span><br/>
                    <span>{{ scored(matches||[]) }} goals for</span><br/>
                    <span>{{ against(matches||[]) }} goals against</span><br/>
                    <span>Top score in a match {{ topScored(matches||[]) }}</span><br/>
                    <span>Top scored match {{ topScoredMatch(matches||[]) }}</span>
                </div>
            </div>
            <div class="card m-1">
                <h3>Next match</h3>
                <div v-for="(match, index) in nextMatch" v-bind:key="index"> 
                    <Match v-bind:club="club" v-bind:match="match" v-on:select-club="compareClub" />
                </div>
            </div>
            <div class="card m-1">
                <h3>Last 6 matches</h3>
                <table class="table">
                    <tbody>
                        <tr v-for="match in (matches||[]).slice(0, 6) " v-bind:key="match.date">
                            <td>{{ match.date }}</td>
                            <td v-bind:class="home(match)"> {{ match.team1.name }}</td>
                            <td> {{ match.score1 }}</td>
                            <td> X </td>
                            <td> {{ match.score2 }}</td>
                            <td v-bind:class="visitor(match)"> {{ match.team2.name }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import Match from './Match';

export default {
    props: ['league', 'club'],
    components: {
        Match
    },
    methods: {
        isHome(match) {
            return match.team1.code == this.club.code;
        },
        home(match) {
            const home = match.team1.code == this.club.code;
            if (home) {
                const win = match.score1 > match.score2;
                return win ? 'bg-primary' : 'bg-secondary';
            }
        },
        visitor(match) {
            const home = match.team1.code == this.club.code;
            if (!home) {
                const win = match.score1 < match.score2;
                return win ? 'bg-primary' : 'bg-secondary';
            }
        },
        winInLast6(matches) {
            const last6matches = matches.slice(0, 6);
            return last6matches.filter(match => {
                const home = match.team1.code == this.club.code;
                if (home) {
                    return match.score1 > match.score2;
                } else {
                    return match.score1 < match.score2;
                }
            }).length;
        },
        scored(matches) {
            return matches.reduce((acc, match) => this.isHome(match) ? acc + match.score1 : acc + match.score2, 0);
        },
        against(matches) {
            return matches.reduce((acc, match) => this.isHome(match) ? acc + match.score2 : acc + match.score1, 0);
        },
        topScored(matches) {
            return Math.max(...matches.map(match => this.isHome(match) ? match.score1 : match.score2));
        },
        topScoredMatch(matches) {
            return Math.max(...matches.map(match => match.score1 + match.score2));
        },
        compareClub(club) {
            this.$emit('compare-club', club);
        },
        clear() {
            this.$emit('clear', {});
        }
    },
    asyncComputed: {
        async matches() {
            if (this.club && Object.keys(this.club).length > 0) {
                let url = `https://raw.githubusercontent.com/openfootball/football.json/master/${this.league.year}/${this.league.matches}`;
                
                return await fetch(url).then(r => r.json()).then(data => data.rounds)
                    .then(rounds => rounds.map(r => r.matches.filter(m => m.team1.code == this.club.code || m.team2.code == this.club.code)))
                    .then(d => d.reduce((a, b) => a.concat(b), []).filter(m => m.score1 != null).reverse());
            } else {
                return [];
            }
        },
        async nextMatch() {
            if (this.club && Object.keys(this.club).length > 0) {
                let url = `https://raw.githubusercontent.com/openfootball/football.json/master/${this.league.year}/${this.league.matches}`;
                
                return await fetch(url).then(r => r.json()).then(data => data.rounds)
                    .then(rounds => rounds.map(r => r.matches.filter(m => m.team1.code == this.club.code || m.team2.code == this.club.code)))
                    .then(d => d.reduce((a, b) => a.concat(b), []).filter(m => m.score1 == null).slice(0, 1));
            }
        }
    }
}
</script>