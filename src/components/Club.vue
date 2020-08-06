<template>
    <div class="d-flex justify-content-center m-1">
        <div>
            <h2 class="d-flex justify-content-center">
                <span>{{ club.name }}</span>
                <a class="close" href="#" @click.prevent="selectClub">(close)</a>
            </h2>
            <Statistics></Statistics>
            <NextMatch></NextMatch>
            <LastMatches></LastMatches>
        </div>
    </div>
</template>

<script>
import Statistics from './club/Statistics';
import NextMatch from './club/NextMatch';
import LastMatches from './club/LastMatches';
import { mapGetters, mapMutations } from 'vuex'

export default {
    components: {
        NextMatch,
        Statistics,
        LastMatches
    },
    computed: {
        ...mapGetters([
            'club'
        ])
    },
    methods: {
        ...mapMutations([
            'selectClub'
        ])
    }
}
</script>