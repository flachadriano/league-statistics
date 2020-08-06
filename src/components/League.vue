<template>
    <div>
        <div v-for="club in clubs" :key="club.code">
            <a href='#' @click.prevent="selectClub(club)">{{ club.name }}</a>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
    computed: {
        ...mapGetters([
            'clubs'
        ])
    },
    methods: {
        ...mapMutations([
            'selectClub'
        ])
    }
}
</script>