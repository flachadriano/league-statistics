<template>
    <div class="d-flex justify-content-center m-1">
        <div>
            <h2 class="d-flex justify-content-center">
                <span>{{ club.name }}</span>
                <a class="close" href="#" @click.prevent="clear">(close)</a>
            </h2>
            <Statistics :club="club" />
            <NextMatch :club="club" @select-club="compareClub" />
            <LastMatches :club="club" />
        </div>
    </div>
</template>

<script>
import Statistics from './club/Statistics';
import NextMatch from './club/NextMatch';
import LastMatches from './club/LastMatches';
import { mapGetters } from 'vuex'

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
    }
}
</script>