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
export default {
    props: ['club'],
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
                    return this.club.nextMatch();
                }
            },
            default() {
                return {team1: {}, team2: {}};
            }
        }
    }
}
</script>