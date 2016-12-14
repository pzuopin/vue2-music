import Vue from 'vue'

export default {
    state: {
        song: {
            docid: "1603029554388155680",
            id: "102391966",
            mid: "000M3yim4cbxkc",
            name: "你离开了南京，从此没有人和我说话",
            singer: "李志"
        }
    },
    getters: {
        audioSrc: state => {
            return `http://ws.stream.qqmusic.qq.com/${state.song.id}.m4a?fromtag=46`
        }
    },
    mutations: {
        /**
         * 播放该歌曲
         * 
         * @param {Object} state
         * @param {Object} qjUser
         */
        PLAY(state, song) {
            state.song = song
        },
    },
    actions: {
        PLAY({commit}, song) {
            commit('PLAY', song)
        },
    }
}