<template>
    <div style="background-color: #666" class="card m-1">
        <h3>Next match</h3>
        <div v-if="match && match.team1 == club.name">
            <span>{{ match && match.date }}</span>
            <span> {{ match && match.team1 }}</span>
            <span> X </span>
            <a href="#" @click.prevent="selectClub(match.team2)">{{ match && match.team2 }}</a>
        </div>
        <div v-else-if="match && match.date">
            <span>{{ match && match.date }}</span>
            <a href="#" @click.prevent="selectClub(match.team1)"> {{ match && match.team1 }}</a>
            <span> X </span>
            <span>{{ match && match.team2 }}</span>
        </div>
        <div v-else>
            <span>-- x --</span>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters([
            'club'
        ])
    },
    methods: {
        selectClub(club) {
            this.$emit('select-club', club);
        }
    },
    asyncComputed: {
        async match() {
            return await this.club.nextMatch();
        }
    }
}
</script>