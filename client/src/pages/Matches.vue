<template>
<md-layout md-column md-flex-xsmall="100" md-flex-small="50" md-flex-medium="33" 
  v-if="users" class="users-match-screen">
    <div md-gutter class="phone-viewport users-list" id="users-list">
      <md-list class="custom-list md-double-line" v-for="user in users" :key="user.id" @click="openChat(user.id)">
        <md-list-item class="user-photo single-match">
          <md-avatar>
            <img v-if="user.photos" class="matchImg" :src="user.photos[0]">
          </md-avatar>
          <div class="md-list-text-container">
            <span> {{ user. name }}</span>
            <span>{{ user.lastLine }}</span>
          </div>
          <div md-column>
            <md-button class="md-icon-button md-list-action" @click.stop="openChat(user)">
              <md-icon class="md-accent"> sms</md-icon>
            </md-button>
            <md-button class="md-icon-button md-list-action" @click="userDislike(user.id)">
              <md-icon class="material-icons">highlight_off</md-icon>
            </md-button>
          <!--<md-divider/>-->
          </div>
        </md-list-item>
      </md-list>
    </div >
    <div v-if="users.length === 0" class="no-match">
      <h2> You have no matches (yet)! </h2>
    </div>
  </md-layout>
</template>


<script>
import { GET_MATCHED } from '../store/store'
import { LIKE } from '../store/store'
import { SET_CHAT_USER } from '../store/store'

export default {
  name: 'matches',
  data() {
    return {
      msg: 'Matches screen',
      users22: [
        { id: 1, name: 'lora', gender: 'f', description: 'like to love', userName: '111', password: '111', likes: [2], dislikes: [11], matches: [], lastLine: "whatsapp??", photos: ['http://dreamatico.com/data_images/woman/woman-1.jpg'] },
        { id: 2, name: 'chen', gender: 'f', description: 'love to love', userName: '222', password: '222', likes: [], dislikes: [45], matches: [], lastLine: "hola??", photos: ['http://dreamatico.com/data_images/woman/woman-2.jpg'] },
        { id: 3, name: 'keren', gender: 'f', description: 'love to love', userName: '333', password: '333', likes: [], dislikes: [45], matches: [], lastLine: "daaa??", photos: ['http://dreamatico.com/data_images/woman/woman-3.jpg'] },
        { id: 4, name: 'inbar', gender: 'f', description: 'love to love', userName: '444', password: '444', likes: [], dislikes: [45], matches: [], lastLine: "dooo??", photos: ['http://dreamatico.com/data_images/woman/woman-4.jpg'] },
        { id: 11, name: 'assaf', gender: 'm', description: 'love is in the air', userName: '555', password: '555', likes: [2], dislikes: [1, 5], matches: [], lastLine: "whatsapp??", photos: ['http://dreamatico.com/data_images/woman/woman-1.jpg'] },
        { id: 12, name: 'ilan', gender: 'm', description: 'like to lora', userName: '666', password: '666', likes: [1, 2], dislikes: [3], matches: [], lastLine: "whatsapp??", photos: ['http://dreamatico.com/data_images/woman/woman-1.jpg'] }
      ]
    }
  },
   created(){
  this.$store.dispatch({type: GET_MATCHED});
        console.log('browse: created - after GET_MATCHED');

  },
 computed: {
      users() {
      var users11 =  this.$store.getters.fetchUsersMatched;
      console.log('Matched: computed - users:', this.users11);
      return users11;
    }
  },
  methods: {
    moveToBrowse() {
      console.log('Matches: move to browse ')
      this.$router.push('Browse')
    },
    openChat(user) {
      console.log('Matches: open CHAT with user: ', user);
      this.$store.commit({ type: SET_CHAT_USER, user })
      this.$router.push('Chat')
    },
   
    userDislike(id) {
      console.log('Matches: before DISLIKE! id:', id)
      const msg = { id1: this.$store.state.user.currUser.id, id2: id, bul: false }
      this.$store.dispatch({ type: LIKE, data: msg })
    },
  }
}

</script>

<style lang="scss" scoped>
a {
  color: #652456;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 20px;
  &:hover {
    color: #FE761C;
  }
}

a:hover {
  transition: all 0.3s ease-in-out;
}

.users-list {
  border: {
    left: 2px solid lightgrey;
    right: 2px solid lightgrey;
  };
  background-color: rgba(239, 237, 234, 0.2);
  width: 100%;
  margin: auto;
  .no-match {
    border: none;
  };
}
.md-list-text-container span {
  font-size: 1.3em;
} 
.md-accent, .material-icons {
  font-size: 2em;
}

.matchImg{
  width: 100%;
}

</style>
