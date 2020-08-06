<template>
    <div>
        <div v-for="club in clubs" v-bind:key="club.code">
            <a href='#' v-on:click.prevent="selectClub(club)">{{ club.name }}</a>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters([
            'clubs'
        ])
    },
    methods: {
        selectClub(club) {
            this.$emit('club', club);
        }
    }
}
</script>