<template>
    <div class="d-flex justify-content-center m-1">
        <div>
            <h2 class="d-flex justify-content-center">
                <span>{{ club.name }}</span>
                <a class="close" href="#" v-on:click.prevent="clear">(close)</a>
            </h2>
            <Statistics v-bind:league="league" v-bind:club="club" v-bind:matches="matches" />
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
import Match from './club/Match';
import Statistics from './club/Statistics';
import { loadRounds } from '../data/League';

export default {
    props: ['league', 'club'],
    components: {
        Match,
        Statistics
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
        compareClub(club) {
            this.$emit('compare-club', club);
        },
        clear() {
            this.$emit('clear', {});
        }
    },
    asyncComputed: {
        matches: {
            get() {
                if (this.club && Object.keys(this.club).length > 0) {
                    return loadRounds(this.league).then(rounds => rounds.map(r => r.matches.filter(m => m.team1.code == this.club.code || m.team2.code == this.club.code)))
                        .then(d => d.reduce((a, b) => a.concat(b), []).filter(m => m.score1 != null).reverse());
                }
            },
            default() {
                return [];
            }
        },
        async nextMatch() {
            if (this.club && Object.keys(this.club).length > 0) {
                return await loadRounds(this.league).then(rounds => rounds.map(r => r.matches.filter(m => m.team1.code == this.club.code || m.team2.code == this.club.code)))
                    .then(d => d.reduce((a, b) => a.concat(b), []).filter(m => m.score1 == null).slice(0, 1));
            }
        }
    }
}
</script>