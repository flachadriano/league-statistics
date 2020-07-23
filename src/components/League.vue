<template>
    <div>
        <div v-for="club in clubs" v-bind:key="club.code">
            <a href='#' v-on:click.prevent="selectClub(club)">{{ club.name }}</a>
        </div>
    </div>
</template>

<script>
import { loadClubResources } from '../data/Club';

export default {
    props: ['api', 'league'],
    methods: {
        selectClub(club) {
            this.$emit('club', loadClubResources(this.api, this.league, club));
        }
    },
    asyncComputed: {
        clubs: {
            get() {
                if (this.league && Object.keys(this.league).length > 0) {
                    return this.league.loadClubs();
                }
            },
            default() {
                return [];
            }
        }
    }
}
</script>