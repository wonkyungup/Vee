import Constants from './Constants'
import Security from '@/assets/js/security'

const Defs = Constants.state

const state = {
    arrTunneling: [],
    curDrawer: Defs.DRAWER_DIRECTION_PAGE || 0,
    session: {
        id: null,
        host: '',
        port: null,
        username: '',
        password: '',
        direction: Defs.STR_LOCAL,
        source_host: '',
        source_port: null,
        destination_host: '',
        destination_port: null
    }
}

const getters = {
    isWelcomePage: state => () => {
      if (state.arrTunneling.length > 0) {
        return false
      }

      return true
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
    },
    isDrawerDirection: state => () => {
      return state.curDrawer === Defs.DRAWER_DIRECTION_PAGE
    },
    isDrawerSource: state => () => {
      return state.curDrawer === Defs.DRAWER_SOURCE_PAGE
    },
    isDrawerServer: state => () => {
      return state.curDrawer === Defs.DRAWER_SERVER_PAGE
    },
    isDrawerDestination: state => () => {
      return state.curDrawer === Defs.DRAWER_DESTINATION_PAGE
    },
    getTunnelingBodyTitleIcon: () => (session) => {
      const direction = session.direction

      if (direction !== null & direction.length > 0) {
          switch (direction) {
              case Defs.STR_LOCAL:
                  return Defs.ICON_ALPHA_L_BOX
              case Defs.STR_REMOTE:
                  return Defs.ICON_ALPHA_R_BOX
              case Defs.STR_SOCKSV5:
                  return Defs.ICON_ALPHA_S_BOX
              default:
                  break
          }
      }
    },
    getTunnelingBodyText: () => (session) => {
        const direction = session.direction

        if (direction !== null & direction.length > 0) {
            switch (direction) {
                case Defs.STR_LOCAL:
                    return `From ${session.host}:${session.source_port} to ${session.destination_host}:${session.destination_port}`
                case Defs.STR_REMOTE:
                    return `From ${session.host}:${session.destination_port} to ${session.source_host}:${session.source_port}`
                case Defs.STR_SOCKSV5:
                    return `From ${session.host}:${session.source_port}`
                default:
                    break
            }
        }
    }
}

const mutations ={
    CLEAR_SESSION_VALUE (state) {
      state.curDrawer = Defs.DRAWER_DIRECTION_PAGE || 0
      state.session = {
          id: null,
          direction: Defs.STR_LOCAL,
          source_host: '',
          source_port: null,
          destination_host: '',
          destination_port: null,
          host: '',
          port: null,
          username: '',
          password: ''
      }
    },
    SET_SESSION_VALUE (state, payload) {
      const session = state.session

      switch (state.curDrawer) {
        case Defs.DRAWER_DIRECTION_PAGE:
          session.direction = payload
          break
        case Defs.DRAWER_SOURCE_PAGE:
          if (session.direction === Defs.STR_LOCAL || session.direction === Defs.STR_SOCKSV5) {
            session.source_host = payload.hostname
            session.source_port = payload.port
          }

          if (session.direction === Defs.STR_REMOTE) {
            session.destination_host = payload.hostname
            session.destination_port = payload.port
          }
          break
        case Defs.DRAWER_SERVER_PAGE:
          session.host = payload.hostname
          session.port = payload.port
          session.username = payload.username
          session.password = Security.encryption(payload.password)
          break
        case Defs.DRAWER_DESTINATION_PAGE:
          if (session.direction === Defs.STR_LOCAL || session.direction === Defs.STR_SOCKSV5) {
            session.destination_host = payload.hostname
            session.destination_port = payload.port
          }

          if (session.direction === Defs.STR_REMOTE) {
            session.source_host = payload.hostname
            session.source_port = payload.port
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
    },
    SET_DB_SESSION_ID (state, id) {
        const session = state.session
        const arrTunneling = state.arrTunneling

        if (id > 0) {
            session.id = id
            console.log(session)
            arrTunneling.push(session)
        }
    },
    SET_DB_ARR_TUNNELING (state, list) {
        const arrLowerCaseKey = list.map(value => Object.keys(value).reduce((acc, cur) => {
            acc[cur.toLowerCase()] = value[cur]
            return acc
        }, {}))

        if (arrLowerCaseKey.length > 0) {
            state.arrTunneling = arrLowerCaseKey
        }
    }
}

const actions = {
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
    },
    setDBSessionID ({ commit }, id) {
      commit('SET_DB_SESSION_ID', id)
    },
    setDBArrTunneling ({ commit }, list) {
      commit('SET_DB_ARR_TUNNELING', list)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
