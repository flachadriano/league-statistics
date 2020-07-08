<template>
    <div class="card m-1">
        <h3>Next match</h3>
        <div v-if="isHome(match)">
            <span>{{ match.date }}</span>
            <span> {{ match.team1.name }}</span>
            <span> X </span>
            <a href="#" v-on:click.prevent="selectClub(match.team2)">{{ match.team2.name }}</a>
        </div>
        <div v-else>
            <span>{{ match.date }}</span>
            <a href="#" v-on:click.prevent="selectClub(match.team1)"> {{ match.team1.name }}</a>
            <span> X </span>
            <span>{{ match.team2.name }}</span>
        </div>
    </div>
</template>

<script>
import { loadMatches } from '../../data/League';

export default {
    props: ['league', 'club'],
    methods: {
        isHome(match) {
            console.log(match)
            return match.team1.code == this.club.code;
        },
        selectClub(club) {
            this.$emit('select-club', club);
        }
    },
    asyncComputed: {
        match: {
            get() {
                if (Object.keys(this.club).length > 0) {
                    return loadMatches(this.league, this.club).then(matches => matches.filter(m => m.scored1 == null && m.scored2 == null)).then(m => {console.log(m); return m[0]});
                }
            },
            default() {
                console.log('foi')
                return {team1: {}, team2: {}};
            }
        }
    }
}
</script>