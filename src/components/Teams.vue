<template>
    <div>
        <div v-for="club in clubs" v-bind:key="club.code">{{ club.name }}</div>
    </div>
</template>

<script>
export default {
    props: ['league'],
    asyncComputed: {
        async clubs() {
            return await fetch('https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.clubs.json')
                .then(r => r.json())
                .then(data => data.clubs);
        }
    }
}
</script>