<template>    
    <div class="card m-1">
        <h3>Last 6 matches</h3>
        <table class="table">
            <tbody>
                <tr v-for="match in (matches||[])" :key="match.date">
                    <td>{{ match.date }}</td>
                    <td :class="home(match)"> {{ match.team1 }}</td>
                    <td> {{ match.score1 }}</td>
                    <td> X </td>
                    <td> {{ match.score2 }}</td>
                    <td :class="visitor(match)"> {{ match.team2 }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: ['club'],
    methods: {
        home(match) {
            if (match.home && !match.draw) {
                return match.win ? 'bg-primary' : 'bg-secondary';
            }
        },
        visitor(match) {
            if (!match.home && !match.draw) {
                return match.win ? 'bg-secondary' : 'bg-primary';
            }
        },
    },
    asyncComputed: {
        async matches() {
            return await this.club.lastMatches();
        }
    }
}
</script>