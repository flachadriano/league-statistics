<template>    
    <div class="card m-1">
        <h3>Last 6 matches</h3>
        <table class="table">
            <tbody>
                <tr v-for="match in matches.slice(0, 6) " v-bind:key="match.date">
                    <td>{{ match.date }}</td>
                    <td v-bind:class="home(match)"> {{ match.team1.name }}</td>
                    <td> {{ match.score1 }}</td>
                    <td> X </td>
                    <td> {{ match.score2 }}</td>
                    <td v-bind:class="visitor(match)"> {{ match.team2.name }}</td>
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
            const home = match.team1.code == this.club.code;
            if (home) {
                const win = match.score1 > match.score2;
                return win ? 'bg-primary' : 'bg-secondary';
            }
        },
        visitor(match) {
            const home = match.team1.code == this.club.code;
            if (!home) {
                const win = match.score1 < match.score2;
                return win ? 'bg-primary' : 'bg-secondary';
            }
        },
    },
    asyncComputed: {
        matches: {
            get() {
                if (this.club && Object.keys(this.club).length > 0) {
                    return this.club.lastMatches();
                }
            },
            default() {
                return [{}];
            }
        }
    }
}
</script>