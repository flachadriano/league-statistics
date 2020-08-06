import Vue from 'vue'
import Vuex from 'vuex'
import apis from './data/Apis'
import footballdbLeagues from './data/footballdb/Leagues'
import footballDataLeagues from './data/football-data/Leagues'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        apis,
        api: apis.footballdb,
        leagues: footballdbLeagues,
        league: 0,
    },
    getters: {
        apis: state => state.apis,
        api: state => state.api,
        leagues: state => state.leagues,
        league: state => state.league,
    },
    mutations: {
        changeApi: (state, apiEl) => {
            const api = apiEl.target.value;
            state.api = api;

            if (api == apis.footballdb) {
                state.leagues = footballdbLeagues;
            } else {
                state.leagues = footballDataLeagues;
            }

            state.league = 0;
        },
        changeLeague: (state, leagueEl) => {
            const league = leagueEl.target.value;
            state.league = league;
        },
    }
});
