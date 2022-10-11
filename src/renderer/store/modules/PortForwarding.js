import Constants from './Constants'

const Defs = Constants.state 

const state = {
    isWelcomePage: true,
    curDrawer: Defs.DRAWER_DIRECTION_PAGE || 0,
    session: {
      id: null,
      direction: Defs.STR_LOCAL,
      localHost: '',
      localPort: null,
      remoteHost: '',
      remotePort: null,
      serverHost: '',
      serverPort: null,
      serverUsername: '',
      serverPassword: ''
    }
}

const getters = {
    isWelcomePage: state => () => {
      return state.isWelcomePage
    },
    getDirectionTitle: state => () => {
      return state.session.direction.replace(/\b[a-z]/, value => value.toUpperCase())
    },
    isLocal: state => () => {
      return state.session.direction === Defs.STR_LOCAL
    },
    isRemote: state => () => {
      return state.session.direction === Defs.STR_REMOTE
    },
    isSocksv5: state => () => {
      return state.session.direction === Defs.STR_SOCKSV5
    }
}

const mutations ={
    SET_WELCOME_PAGE (state, payload) {
      state.isWelcomePage = payload
    },
    CLEAR_SESSION_VALUE (state) {
      state.curDrawer = Defs.DRAWER_DIRECTION_PAGE || 0
      state.session = {
          id: null,
          direction: Defs.STR_LOCAL,
          localHost: '',
          localPort: null,
          remoteHost: '',
          remotePort: null,
          serverHost: '',
          serverPort: null,
          serverUsername: '',
          serverPassword: ''
      }
    },
    SET_SESSION_VALUE (state, payload) {
      switch (state.curDrawer) {
        case Defs.DRAWER_DIRECTION_PAGE:
          state.session.direction = payload
          break
        case Defs.DRAWER_SOURCE_PAGE:
          if (getters.isLocal()) {
            state.session.localHost = payload.hostname
            state.session.localPort = payload.port            
          }

          if (getters.isRemote()) {
            state.session.remoteHost = payload.hostname
            state.session.remotePort = payload.port            
          }

          if (getters.isSocksv5()) {
            state.session.localHost = payload.hostname
            state.session.localPort = payload.port
            state.session.remoteHost = state.session.localHost
            state.session.remotePort = state.session.localPort            
          }
          break
        case Defs.DRAWER_SERVER_PAGE:
          state.session.serverHost = payload.hostname
          state.session.serverPort = payload.port
          state.session.serverUsername = payload.username
          state.session.serverPassword = payload.password
          break
        case Defs.DRAWER_DESTINATION_PAGE:
          if (getters.isLocal()) {
            state.session.remoteHost = payload.hostname
            state.session.remotePort = payload.port
          }
    
          if (getters.isRemote()) {
            state.session.localHost = payload.hostname
            state.session.localPort = payload.port
          }
          break
        default:
          break      
      }
    },
    MOVE_BACK_BUTTON (state) {
      if (state.curDrawer !== 0) {
        state.curDrawer--
      }
    },
    MOVE_NEXT_BUTTON (state) {
      state.curDrawer++
    }
}

const actions = {
    setWelcomePage ({ commit }, payload) {
      commit('SET_WELCOME_PAGE', payload)
    },
    clearSessionValue ({ commit }) {
      commit('CLEAR_SESSION_VALUE')
    },
    setSessionValue ({ commit }, payload) {
      commit('SET_SESSION_VALUE', payload)
    },
    moveBackButton ({ commit }) {
      commit('MOVE_BACK_BUTTON')
    },
    moveNextButton ({ commit }) {
      commit('MOVE_NEXT_BUTTON')
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
