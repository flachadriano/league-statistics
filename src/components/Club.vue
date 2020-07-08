<template>
    <div class="d-flex justify-content-center m-1">
        <div>
            <h2 class="d-flex justify-content-center">
                <span>{{ club.name }}</span>
                <a class="close" href="#" v-on:click.prevent="clear">(close)</a>
            </h2>
            <Statistics v-bind:league="league" v-bind:club="club" v-bind:matches="matches" />
            <NextMatch v-bind:league="league" v-bind:club="club" v-on:select-club="compareClub" />
            <LastMatches v-bind:club="club" v-bind:matches="matches" />
        </div>
    </div>
</template>

<script>
import Statistics from './club/Statistics';
import NextMatch from './club/NextMatch';
import LastMatches from './club/LastMatches';
import { loadRounds } from '../data/League';

export default {
    props: ['league', 'club'],
    components: {
        NextMatch,
        Statistics,
        LastMatches
    },
    methods: {
        isHome(match) {
            return match.team1.code == this.club.code;
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
        }
    }
}
</script>