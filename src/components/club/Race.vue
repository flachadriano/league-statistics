<template>
    <div class="d-flex justify-content-center">
        <div v-for="(match, i) in matches" :key="i">
            <div :key="match.date" style="width: 24px; margin-right: 3px" class="bg-secondary rounded" v-if="match.draw">D</div>
            <div :key="match.date" style="width: 24px; margin-right: 3px" class="bg-success rounded" v-else-if="match.win">W</div>
            <div :key="match.date" style="width: 24px; margin-right: 3px" class="bg-danger rounded" v-else>L</div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['matches']
}
</script>