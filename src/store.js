import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
    count: 0,
    showLoader: false,
}
const getters = {
    evenOrOdd: state => state.count % 2 === 0 ? 'even' : 'odd'
}
const mutations = {
    increment(state) {
        state.count++
    },
    decrement(state) {
       state.count--;
    },
    isShowLoader(state, payload){
        state.showLoader = payload
    }
}

const actions = {
    // increment: ({ commit }) =>   commit('decrement') ,
    // decrement: ({ commit }) =>  commit('decrement'),
    // incrementIfOdd({ commit, state }) {
    //     if ((state.count + 1) % 2 === 0) {
    //         commit('increment')
    //     }
    // },
    // incrementAsync({ commit }) {
    //     return new Promise((resolve) => {
    //         setTimeout(() => {
    //             commit('increment')
    //             resolve()
    //         }, 1000)
    //     })
    // }
}
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})