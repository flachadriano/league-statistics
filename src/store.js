import Vue from 'vue'
import Vuex from 'vuex'
import apis from './data/Apis'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        apis,
        api: 'footballdb'
    },
    getters: {
        apis: state => state.apis,
        api: state => state.api
    },
    mutations: {
        changeApi: (state, api) => {
            state.api = api
            state.league = 0;
        }
    }
});
