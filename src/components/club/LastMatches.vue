<template>    
    <div class="card m-1">
        <h3>Last 6 matches</h3>
        <div>
            <template v-for="match in (matches||[])">
                <span :key="match.date" v-if="match.draw"> D</span>
                <span :key="match.date" v-else-if="match.win"> W</span>
                <span :key="match.date" v-else> L</span>
            </template>
        </div>
        <table>
            <thead>
                <td></td>
                <td>Scored</td>
                <td>Against</td>
            </thead>
            <tbody>
                <tr>
                    <td>First half</td>
                    <td>{{ (matches||[]).reduce((acc, m) => acc + (m.teamScoreFirstHalf > 0 ? 1 : 0), 0) }}</td>
                    <td>{{ (matches||[]).reduce((acc, m) => acc + (m.teamAgainstFirstHalf > 0 ? 1 : 0), 0) }}</td>
                </tr>
                <tr>
                    <td>Second half</td>
                    <td>{{ (matches||[]).reduce((acc, m) => acc + ((m.teamScored - m.teamScoreFirstHalf) > 0 ? 1 : 0), 0) }}</td>
                    <td>{{ (matches||[]).reduce((acc, m) => acc + ((m.teamAgainst - m.teamAgainstFirstHalf) > 0 ? 1 : 0), 0) }}</td>
                </tr>
                <tr>
                    <td>In the match</td>
                    <td>{{ (matches||[]).reduce((acc, m) => acc + (m.teamScored > 0 ? 1 : 0), 0) }}</td>
                    <td>{{ (matches||[]).reduce((acc, m) => acc + (m.teamAgainst > 0 ? 1 : 0), 0) }}</td>
                </tr>
            </tbody>
        </table>
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
                return match.win ? 'bg-primary' : 'bg-secondary';
            }
        },
    },
    asyncComputed: {
        async matches() {
            return await this.club.lastMatches(6);
        }
    }
}
</script>