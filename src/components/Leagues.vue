<template>
    <div>
        <span class="mr-2">League</span>
        <select v-model="selected">
            <option v-for="(league, index) in leagues" :key="index">{{ league }}</option>
        </select>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selected: '--',
            leagues: ['--', 'Premier League']
        }
    },
    watch: {
        selected(value) {
            this.$emit('league', value);
        }
    }
}
</script>
