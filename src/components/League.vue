<template>
    <div>
        <div v-for="club in clubs" v-bind:key="club.code">
            <a href='#' v-on:click.prevent="selectClub(club)">{{ club.name }}</a>
        </div>
    </div>
</template>

<script>
export default {
    props: ['league'],
    methods: {
        selectClub(club) {
            this.$emit('club', club);
        }
    },
    asyncComputed: {
        async clubs() {
            if (this.league) {
                const sortByName = (a, b) => {
                    var x = a.name.toLowerCase();
                    var y = b.name.toLowerCase();
                    if (x < y) return -1;
                    if (x > y) return 1;
                    return 0;
                };
                let url = `https://raw.githubusercontent.com/openfootball/football.json/master/${this.league.year}/${this.league.file}`;
                
                return await fetch(url).then(r => r.json()).then(data => data.clubs).then(clubs => clubs.sort(sortByName));
            } else {
                return [];
            }
        }
    }
}
</script>