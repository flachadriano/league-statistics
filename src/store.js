import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        api: 'footballdb'
    },
    getters: {
        api: state => state.api
    }
});
