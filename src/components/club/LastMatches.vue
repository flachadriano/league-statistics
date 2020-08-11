<template>    
    <div style="background-color: #666" class="card p-2">
        <h3>Last 6 matches</h3>
        <div class="mb-2">
            <template v-for="match in (matches||[])">
                <span :key="match.date" class="bg-secondary m-1 pr-2 pl-2 pt-1 pb-1 rounded" v-if="match.draw">D</span>
                <span :key="match.date" class="bg-success m-1 pr-2 pl-2 pt-1 pb-1 rounded" v-else-if="match.win">W</span>
                <span :key="match.date" class="bg-danger m-1 pr-2 pl-2 pt-1 pb-1 rounded" v-else>L</span>
            </template>
        </div>
        <table class="mb-1">
            <thead class="border-bottom">
                <td></td>
                <td>Scored goals</td>
                <td>Goals against</td>
            </thead>
            <tbody>
                <tr>
                    <td>First half</td>
                    <td>{{ (matches||[]).reduce((acc, m) => acc + (m.teamScoreFirstHalf > 0 ? 1 : 0), 0) }}/6</td>
                    <td>{{ (matches||[]).reduce((acc, m) => acc + (m.teamAgainstFirstHalf > 0 ? 1 : 0), 0) }}/6</td>
                </tr>
                <tr class="border-bottom">
                    <td>Max in first half</td>
                    <td>{{ Math.max(...(matches||[]).map(m => m.teamScoreFirstHalf)) }}</td>
                    <td>{{ Math.max(...(matches||[]).map(m => m.teamAgainstFirstHalf)) }}</td>
                </tr>
                <tr>
                    <td>Second half</td>
                    <td>{{ (matches||[]).reduce((acc, m) => acc + ((m.teamScored - m.teamScoreFirstHalf) > 0 ? 1 : 0), 0) }}/6</td>
                    <td>{{ (matches||[]).reduce((acc, m) => acc + ((m.teamAgainst - m.teamAgainstFirstHalf) > 0 ? 1 : 0), 0) }}/6</td>
                </tr>
                <tr class="border-bottom">
                    <td>Max in second half</td>
                    <td>{{ Math.max(...(matches||[]).map(m => m.teamScored - m.teamScoreFirstHalf)) }}</td>
                    <td>{{ Math.max(...(matches||[]).map(m => m.teamAgainst - m.teamAgainstFirstHalf)) }}</td>
                </tr>
                <tr>
                    <td>Full time</td>
                    <td>{{ (matches||[]).reduce((acc, m) => acc + (m.teamScored > 0 ? 1 : 0), 0) }}/6</td>
                    <td>{{ (matches||[]).reduce((acc, m) => acc + (m.teamAgainst > 0 ? 1 : 0), 0) }}/6</td>
                </tr>
                <tr class="border-bottom">
                    <td>Max in a match</td>
                    <td>{{ Math.max(...(matches||[]).map(m => m.teamScored)) }}</td>
                    <td>{{ Math.max(...(matches||[]).map(m => m.teamAgainst)) }}</td>
                </tr>
            </tbody>
        </table>
        <div class="border-bottom">
            <span>Over 2.5 goals in {{ matches.reduce((acc, m) => acc + (m.score1 + m.score2 > 2 ? 1 : 0), 0) }}/6 matches</span>
        </div>
        <table style="color: #ddd">
            <tbody>
                <tr v-for="match in (matches||[])" :key="match.date">
                    <td>{{ match.date }}</td>
                    <td> {{ match.team1 }}</td>
                    <td> {{ match.score1 }}</td>
                    <td> X </td>
                    <td> {{ match.score2 }}</td>
                    <td> {{ match.team2 }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import BaseMatch from '../../data/base-match';

export default {
    props: ['club'],
    asyncComputed: {
        async matches() {
            const lastMatches = await this.club.lastMatches(6);
            if (lastMatches.length > 0) {
                BaseMatch.validatePlayed(lastMatches[0]);
            }
            return lastMatches;
        }
    }
}
</script>