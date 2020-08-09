import Vue from 'vue'
import Vuex from 'vuex'
import { apis, loadLeagues, loadLeagueResources, loadClubResources } from './data/apis'
import BaseLeague from './data/base-league';

Vue.use(Vuex);

const defaultLeague = {league: {key: 0}};

export default new Vuex.Store({
    state: {
        apis,
        api: [],
        leagues: [],
        league: defaultLeague,
        clubs: [],
        club: {},
    },
    getters: {
        apis: state => state.apis,
        api: state => state.api,
        leagues: state => state.leagues,
        league: state => state.league,
        leagueId: state => state.league.league.key,
        clubs: state => state.clubs,
        club: state => state.club,
        hasSelectedClub: state => Object.keys(state.club).length > 0
    },
    mutations: {
        changeApi: (state, apiEl) => {
            const api = apiEl.target.value;
            state.api = api;
            state.leagues = loadLeagues(api);
            state.league = defaultLeague;
            state.club = {};
        },
        changeLeague: (state, leagueEl) => {
            const league = leagueEl.target.value;
            const foundLeague = state.leagues.find(l => l.key == league);
            const loadedLeague = loadLeagueResources(state.api, foundLeague);
            loadedLeague.loadClubs().then(clubs => state.clubs = BaseLeague.validateClubs(clubs));
            state.league = loadedLeague;
            state.club = {};
        },
        selectClub: (state, club) => {
            console.log(club);
            if (typeof club == 'object' && club.name) {
                const loadedClub = loadClubResources(state.api, state.league, club);
                state.club = loadedClub;
            } else {
                state.club = {};
            }
        }
    }
});
