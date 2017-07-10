


export const SND_MSG = 'SND_MSG';
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const RESTART_USERS = 'RESTART_USERS';
export const ADD_USER = 'ADD_USER';
export const LIKE = 'LIKE';
export const GET_MATCHED = 'GET_MATCHED';
export const GET_BROWSED = 'GET_BROWSED';

export const GET_USER = 'GET_USER';
export const SET_CHAT_USER = 'SET_CHAT_USER';



// export const USERS_MATCHED = 'USERS_MATCHED';


//Id, name, birth, gender, description, photos[link to photos],likes[user ids],
// dislikes[user ids], matches[user ids], location{long,lat}, username, password,
import service from '../services/service'

const state = {
  usersMatched: [
    {
      id: 1, name: 'lora', gender: 'f', description: 'like to love',
      userName: '555', password: '555', likes: [2], dislikes: [36, 4, 5], matches: []
    },
    {
      id: 2, name: 'chen', gender: 'f', description: 'love to love',
      userName: '222', password: '222', likes: [], dislikes: [45], matches: []
    },
    {
      id: 36, name: 'asaf', gender: 'm', description: 'like assaf',
      userName: '333', password: '333', likes: [2], dislikes: [1, 5], matches: []
    },
    {
      id: 45, name: 'ilan', gender: 'm', description: 'like to lora',
      userName: '444', password: '444', likes: [2, 36], dislikes: [1, 45, 5], matches: []
    }
  ],
  usersBrowsed: [
    {
      id: 1, name: 'lora', gender: 'f', description: 'like to love',
      userName: '555', password: '555', likes: [2], dislikes: [36, 4, 5], matches: []
    },
    {
      id: 45, name: 'ilan', gender: 'm', description: 'like to lora',
      userName: '444', password: '444', likes: [2, 36], dislikes: [1, 45, 5], matches: []
    }
  ],

  currUser: {
    id: 1, name: 'lora', gender: 'f', description: 'like to love',
    userName: '111', password: '111', likes: { '1': true, '2': false }, dislikes: [11], matches: [],
    lastLine: "whatsapp??", photos: ['http://dreamatico.com/data_images/woman/woman-1.jpg']
  },
  // currUser: {},
  user2: null,
  lastMatch: {},
  chatUser: {},

  // lastMatch: []
};

const getters = {
  fetchUsersMatched(state) {
    console.log('store.getters.USERS_MATCHED', state.usersMatched)
    return state.usersMatched;
  },
  fetchUsersBrowsed(state) {
    console.log('store.getters.USERS_BROWSED', state.usersBrowsed)
    return state.usersBrowsed;
  },

  fetchLastMatch(state) {
    console.log('store.getters. last Match', state.lastMatch)
    return state.lastMatch;
  }



}

const mutations = {

  [LOG_OUT](state, { data }) {
    console.log('store.mutation.LOG_Out1: ', data)
    state.currUser = null;
    console.log('store.mutation.LOG_Out2: ', state.currUser)
  },
  [LIKE](state, payload) {
    console.log('store.mutation.LIKE1a CURRUSER BEFORE: ', state.currUser, state.currUser.likes)
    console.log('store.mutation.LIKE1b LAST MATCH BEFORE: ', state.lastMatch)

    console.log('store.mutation.LIKE2a payload: ', payload)
    console.log('store.mutation.LIKE2b payload USER: ', payload.user, payload.user.likes)

    state.currUser = payload.user.user1;

    //state.lastMatch = payload.user.user2;
    // state.lastMatch = (payload.user.user2)?payload.user.user2:null;
    if (payload.user.user2) state.lastMatch = payload.user.user2; else state.lastMatch = null;
    // if(payload.user.user2) state.lastMatch.push(payload.user.user2);
    console.log('store.mutation.LIKE3a CURRUSER AFTER: ', state.currUser)
    console.log('store.mutation.LIKE3b LAST MATCH AFTER: ', state.lastMatch)
  },
  [LOG_IN](state, { user }) {
    console.log('store.mutation.LOG_IN: ', user)
    state.currUser = user;
    console.log('store.currUser: ', state.currUser)
  },
  [SND_MSG](state, { data }) {
    console.log('store.mutation.SND_MSG: ', data)
    state.users.push(data);
    console.log('store.users: ', state.users)
  },
  [ADD_USER](state, { data }) {
    console.log('store.mutation.ADD_USER: ', data)
    state.usersBrowsed.push(data);
    console.log('store.usersBrowsed: ', state.usersBrowsed)
  },
  [GET_MATCHED](state, { users }) {
    console.log('store.mutation.GET_MATCHED1: ', users)
    state.usersMatched = users
    // state.usersMatched.splice(0,usersMatched.length,users)
    console.log('store.usersMatched2: ', state.usersMatched)
  },//
  [GET_BROWSED](state, { users }) {
    console.log('store.mutation.GET_BROWSED1: ', users)
    state.usersBrowsed = users
    // state.usersMatched.splice(0,usersMatched.length,users)
    console.log('store.mutation.GET_BROWSED2: ', state.usersBrowsed)
  },//

 [SET_CHAT_USER](state, { user }) {
    console.log('store.mutation.SET_CHAT_USER: ', user)
    state.chatUser = user;
    console.log('store.mutation.SET_CHAT_USER in store: ', state.chatUser)

  },//

  [RESTART_USERS](state, payload) {
    console.log('store.mutation.RESTART_USERS: ', payload.user)
    state.usersMatched = payload.user
    console.log('store.usersBrowsed: ', state.usersMatched)
  },
  [GET_USER](state, { data }) {
    console.log('store.mutation.GET_USER: ', data)
    state.user2 = data
    console.log('store.user2: ', state.user2)
  },



  SET_FILTER(state, { filter }) {
    state.filterBy = filter;
  }
}

const actions = {
  [LOG_OUT](context, payload) {
    console.log('store.actions.LOG_OUT1:', payload.data)
    context.commit(payload);
    // var prm = service.logOut(payload);
    // prm.then(res => {
    //   payload.user = res;
    //   console.log('store.actions.LOG_OUT1:' , payload.data)
    //   context.commit(payload);
    // })
  },
  [LOG_IN](context, payload) {
    console.log('store.LOG_IN:', payload)
    var prm = service.logIn(payload);
    prm.then(res => {
      payload.user = res;
      context.commit(payload);
    })
  },
  [GET_USER](context, payload) {
    console.log('store.GET_USER:', payload.data)
    var prm = service.getUser(payload);
    prm.then(res => {
      payload.user = res;
      context.commit(payload);
    })
  },



  [RESTART_USERS](context, payload) {
    console.log('store.RESTART_USERS:', payload.data)
    var prm = service.restartUsers(payload);
    prm.then(res => {
      payload.user = res;
      context.commit(payload);
    })
  },
  [ADD_USER](context, payload) {
    console.log('store.ADD_USER:', payload.data)
    // var prm = service.addUser(payload); //TODO: finish later
    // prm.then(res => {
    //   payload.user = res;
    //   context.commit(payload);
    // })
  },
  [LIKE](context, payload) {
    console.log('store.LIKE:', payload.data)
    var prm = service.like(payload);
    return prm.then(res => {
      console.log('store.LIKE: result', res)
      payload.user = res;
      console.log('store.LIKE: payload', payload)
      context.commit(payload);
      context.dispatch({ type: GET_MATCHED});

    })

  },

  // [LIKE](context, payload) {
  //   console.log('store.LIKE:', payload.data)
  //   var prm = service.like(payload);
  //   prm.then(res => {
  //   console.log('store.LIKE: result', res)
  //     payload.user = res;
  //    console.log('store.LIKE: payload', payload)
  //    context.commit(payload);
  //    // this.$store.dispatch({ type: GET_MATCHED});

  //   })

  // }

  [SND_MSG](context, payload) {
    console.log('store.SND_MSG:', payload.data)
    var prm = service.sendMsg(payload);
    prm.then(res => {
      payload.user = res;
      context.commit(payload);
    })
  },

  //  [GET_BROWSED](context, payload) {
  //     console.log('store.GET_BROWSED.actions1:', payload.data)
  //     var prm = service.getBrowsed(payload);
  //     prm.then(res => {
  //       console.log('store.GET_BROWSED.actions2:', res)
  //       payload.users = res;
  //       context.commit(payload);
  //     })
  //   },
  [GET_BROWSED](context, payload) {
    console.log('store.GET_BROWSED.actions1:', payload.data)
    var prm = service.getBrowsed(state.currUser.id);
    prm.then(res => {
      console.log('store.GET_BROWSED.actions2:', res)
      payload.users = res;
      context.commit(payload);
    })
  },
  [GET_MATCHED](context, payload) {
    console.log('store.GET_MATCHED.actions1:', payload.data)
    var prm = service.getMatched(state.currUser.id);
    prm.then(res => {
      console.log('store.GET_MATCHED.actions2:', res)
      payload.users = res;
      context.commit(payload);
    })
  },
  // [GET_MATCHED](context, payload) {
  //   console.log('store.GET_MATCHED.actions1:', payload.data)
  //   var prm = service.getMatched(payload);
  //   prm.then(res => {
  //     console.log('store.GET_MATCHED.actions2:', res)
  //     payload.users = res;
  //     context.commit(payload);
  //   })
  // },
}

export const userStore = {
  state,
  mutations,
  getters,
  actions
}


