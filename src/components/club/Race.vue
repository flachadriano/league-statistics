<template>
    <div>
        <div v-for="(match, i) in matches" :key="i">
            <span :key="match.date" class="bg-secondary m-1 pr-2 pl-2 pt-1 pb-1 rounded" v-if="match.draw">D</span>
            <span :key="match.date" class="bg-success m-1 pr-2 pl-2 pt-1 pb-1 rounded" v-else-if="match.win">W</span>
            <span :key="match.date" class="bg-danger m-1 pr-2 pl-2 pt-1 pb-1 rounded" v-else>L</span>
        </div>
    </div>
</template>

<script>
export default {
    props: ['matches']
}
</script>