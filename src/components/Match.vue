<template>
    <div>
        <div v-if="isHome()">
            <span>{{ match.team1.name }}</span>
            <span> X </span>
            <a href="#" v-on:click.prevent="selectClub(match.team2)">{{ match.team2.name }}</a>
        </div>
        <div v-else>
            <a href="#" v-on:click.prevent="selectClub(match.team1)">{{ match.team1.name }}</a>
            <span> X </span>
            <span>{{ match.team2.name }}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: ['club', 'match'],
    methods: {
        isHome() {
            return this.match.team1.code == this.club.code;
        },
        selectClub(club) {
            this.$emit('select-club', club);
        }
    }
}
</script>