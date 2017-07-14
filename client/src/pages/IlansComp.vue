<template>
  <div>
    <h1>{{ msg }}</h1>
    <button @click="action1">action1</button>
    <button @click="getMatched">get matched users</button>
    <button @click="addUser">add user</button>
    <button @click="restartUsers">restart users</button>
    <button @click="like(3,true)">like!!</button>
    <button @click="like(3,false)">unlike!!</button>
    <button @click="getUser(1)">get user</button>
                    
    <input v-model="user.name" class="input-msg" name="input" placeholder="name" >
    <input v-model="user.password" class="input-msg" name="input" placeholder="password" >
    <button @click="logIn">log in</button>
    <button @click="logOut">log out</button>

    rrt-{{currUser.id}}-rrr
  </div>
</template>

<script>
//from '../store/todos.store'
import { LOG_IN } from '../store/store'
import { LOG_OUT } from '../store/store'
import { GET_MATCHED } from '../store/store'
import { ADD_USER } from '../store/store'
import { LIKE } from '../store/store'
import { RESTART_USERS } from '../store/store'
import { GET_USER } from '../store/store'
// import {state} from '../store/store'
import userService from '../services/service'




export default {
  name: 'ilans',
  // created() {
  //   currUser = this.$store.state.user.currUser;
  // },
  data() {
    return {
      msg: 'Ilans Component',
      currUser: this.$store.state.user.currUser,
      user : {}
    }
  },
  methods: {
    logOut() {
      console.log('ilanComp logOut');
      const msg = { userId :  this.$store.state.user.currUser.id }
      console.log(msg);
      this.$store.dispatch({ type: LOG_OUT, data: msg });
      // debugger;
    },
    logIn() {
      console.log('ilanComp logIn', this.user.name, '/',this.user.password);
      const msg = { user : this.user.name, password : this.user.password }
      console.log(msg);
      this.$store.dispatch({ type: LOG_IN, data: msg });
      // debugger;
    },
    action1() {
      console.log('ilanComp-in action1', this.$store.state.currUser)
      const msg = { actionType: 'addUser', id: 3, txt: 'go home!' }
      //this.$store.dispatch({ type: SND_MSG,data:msg });
    },
    addUser() {
      console.log('ilanComp-addUser')
      const msg = {
        name: 'chen', gender: 'f', description: 'love to love',
        userName: '222', passwoed: '222', likes: [1, 2], dislikes: [45], matches: [1]
      }
      this.$store.dispatch({ type: ADD_USER, data: msg });
    },
    like(id, bul) {
      console.log('ilanComp-like')
      const msg = { id1: this.currUser.id, id2: id, bul: bul }
      this.$store.dispatch({ type: LIKE, data: msg });
    },
    getUser(id) {
      console.log('ilanComp-get user-', id)
      const msg = { id: id }
      this.$store.dispatch({ type: GET_USER, data: msg });
    },
    getMatched() {
      console.log('ilanComp-getMatched')
      const msg = {
        name: 'chen', gender: 'f', description: 'love to love',
        userName: '222', passwoed: '222', likes: [], dislikes: [45], matches: []
      }
      this.$store.dispatch({ type: GET_MATCHED, data: msg });
    },
    restartUsers() {
      console.log('ilanComp-restartUsers')
      const msg = {}
      this.$store.dispatch({ type: RESTART_USERS, data: msg });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
