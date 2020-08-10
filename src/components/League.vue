<template>
    <table class="table">
        <tbody>
            <tr v-for="club in clubs" :key="club.code">
                <td>
                    <a href='#' @click.prevent="selectClub(club)">{{ club.name }}</a>
                </td>
            </tr>
        </tbody>
    </table>
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
