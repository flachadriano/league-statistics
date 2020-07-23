<template>
    <div class="d-flex justify-content-center m-1">
        <div>
            <h2 class="d-flex justify-content-center">
                <span>{{ club.name }}</span>
                <a class="close" href="#" @click.prevent="clear">(close)</a>
            </h2>
            <Statistics :club="club" />
            <!-- <NextMatch v-bind:league="league" v-bind:club="club" v-on:select-club="compareClub" />
            <LastMatches v-bind:club="club" v-bind:matches="matches" /> -->
        </div>
    </div>
</template>

<script>
import Statistics from './club/Statistics';
// import NextMatch from './club/NextMatch';
// import LastMatches from './club/LastMatches';

export default {
    props: ['league', 'club'],
    components: {
        // NextMatch,
        Statistics,
        // LastMatches
    },
    methods: {
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
                    return this.club.loadMatches();
                }
            },
            default() {
                return [];
            }
        }
    }
}
</script>