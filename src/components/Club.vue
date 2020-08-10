<template>
    <div class="d-flex justify-content-center m-1">
        <div>
            <h2 class="d-flex justify-content-center">
                <span>{{ club.name }}</span>
                <a class="close" href="#" @click.prevent="selectClub">(close)</a>
            </h2>
            <Statistics></Statistics>
            <LastMatches></LastMatches>
        </div>
    </div>
</template>

<script>
import Statistics from './club/Statistics';
import LastMatches from './club/LastMatches';
import { mapMutations } from 'vuex';

export default {
    props: ['club'],
    components: {
        Statistics,
        LastMatches
    },
    methods: {
        ...mapMutations([
            'selectClub'
        ])
    }
}
</script>