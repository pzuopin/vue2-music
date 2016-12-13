import Vue from 'vue'

export default {
	state: {

    },
	mutations: {
        /**
         * 登录成功
         * 
         * @param {Object} state
         * @param {Object} qjUser
         */
        LOGIN(state, qjUser) {
            localStorage.setItem('qjUser', JSON.stringify(qjUser))
            Object.assign(state, qjUser)
        },
        /**
         * 退出登录
         * 
         * @param {Object} state
         */
        LOGOUT(state) {
            localStorage.removeItem('qjUser')
            Object.keys(state).forEach(k => Vue.delete(state, k))
        }
    },
    actions: {
        LOGIN({commit}, qjUser) {
            commit('LOGIN', qjUser)
        },
        LOGOUT({commit}) {
            commit('LOGOUT')
        }
    }
}