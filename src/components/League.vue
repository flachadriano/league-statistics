<template>
    <div>
        <div v-for="club in clubs" v-bind:key="club.code">
            <a href='#' v-on:click.prevent="selectClub(club)">{{ club.name }}</a>
        </div>
    </div>
</template>

<script>
import { loadClubs } from '../data/League';

export default {
    props: ['league'],
    methods: {
        selectClub(club) {
            this.$emit('club', club);
        }
    },
    asyncComputed: {
        async clubs() {
            if (Object.keys(this.league).length > 0) {
                const sortByName = (a, b) => {
                    var x = a.name.toLowerCase();
                    var y = b.name.toLowerCase();
                    if (x < y) return -1;
                    if (x > y) return 1;
                    return 0;
                };

                return await loadClubs(this.league).then(clubs => clubs.sort(sortByName));
            } else {
                return [];
            }
        }
    }
}
</script>