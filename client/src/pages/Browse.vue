<template>
  <div>
      <md-card class="browse">
        <md-card-media>
          <!--swiper -->
          <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide v-for="user in users" :key="user" class="grid-content card" onSlideChangeEnd="onSwipe">
              <div class="img-container" >
                <img class="img-in-swiper" :src="user.photos && user.photos[0]">
              </div>
              <div class="user-details">
                <h3>{{ user.name }}, {{ user.age }}</h3>
                <p> {{ user.description }} </p>
              </div>
            </swiper-slide>
          </swiper>
        </md-card-media>
      </md-card>
    
      <section class="actions">
        <a href="#" @click.prevent="userDislike">
          <md-icon class="material-icons md-size-2x dislike">highlight_off</md-icon>
        </a>
        <a @click.prevent="userLike">
          <md-icon class="material-icons md-size-2x like">favorite</md-icon>
        </a>
      </section>
 
 
 
 
  <!--<md-dialog-alert
    :md-title="match.title"
    :md-content-html="match.contentHtml"
    @open="onOpen"
    @close="onClose"
    ref="match">
  </md-dialog-alert>-->
    </div>
  <!--
  <section v-if="users" class="browse-screen">
  
    <div class="app-header">
      <div class="app-header-buttons">
        <button @click="moveToEdit">Edit</button>
        <button @click="moveToMatches">Matches</button>
      </div>
    </div>
  
    <div class="user-image-container">
      {{this.currentUser.src}}
      <img v-if="currentUser.photos" class='user-image' :src="this.currentUser.photos[0]"> 
      <img v-if="currentUser.photos" class='user-image' :src="this.currentUser.photos[0]"></img>
    </div>
    <div> {{this.currentUser.name}}, {{this.currentUser.birth}}</div>
    <div v-if="newMatch" class="match-popup">
      <h1>Congratulations - You have a NEW MATCH! </h1>
      <h2>You and {{this.newMatch.name}} like each other</h2>
      <img class="popup-image" :src="this.newMatch.photos[0]"></img>
      <div class="popup-buttons">
        <button @click="closePopup">CLOSE</button>
        <button @click="viewMatches">View Matches</button>
      </div>
    </div>
    <div class="app-footer-buttons">
      <button @click="userDislike">DISLIKE</button>
      <button @click="userLike">LIKE</button>
    </div>
  </section>
  -->
</template>

<script>
import { LOG_IN } from '../store/store'
import { LOG_OUT } from '../store/store'
import { SND_MSG } from '../store/store'
import { GET_BROWSED } from '../store/store'
import { ADD_USER } from '../store/store'
import { LIKE } from '../store/store'
import { RESTART_USERS } from '../store/store'
import { GET_USER } from '../store/store'

export default {
  name: 'browse',
  data() {
    return {
      msg: 'Browse screen',
      newMatchFlag: false,
      currentId: 'TBD - need to grab ID from click',
      users22: [
        { id: 1, name: 'lora', gender: 'f', birth: '1990', description: 'like to love', userName: '111', password: '111', likes: [2], dislikes: [11], matches: [], lastLine: "whatsapp??", photos: ['http://dreamatico.com/data_images/woman/woman-1.jpg'] },
        { id: 2, name: 'chen', gender: 'f', birth: '1991', description: 'love to love', userName: '222', password: '222', likes: [], dislikes: [45], matches: [], lastLine: "hola??", photos: ['http://dreamatico.com/data_images/woman/woman-2.jpg'] },
        { id: 3, name: 'keren', gender: 'f', birth: '1992', description: 'love to love', userName: '333', password: '333', likes: [], dislikes: [45], matches: [], lastLine: "daaa??", photos: ['http://dreamatico.com/data_images/woman/woman-3.jpg'] },
        { id: 4, name: 'inbar', gender: 'f', birth: '1993', description: 'love to love', userName: '444', password: '444', likes: [], dislikes: [45], matches: [], lastLine: "dooo??", photos: ['http://dreamatico.com/data_images/woman/woman-4.jpg'] },
        { id: 11, name: 'assaf', gender: 'm', birth: '1994', description: 'love is in the air', userName: '555', password: '555', likes: [2], dislikes: [1, 5], matches: [], lastLine: "whatsapp??", photos: ['http://dreamatico.com/data_images/woman/woman-5.jpg'] },
        { id: 12, name: 'ilan', gender: 'm', birth: '1995', description: 'like to lora', userName: '666', password: '666', likes: [1, 2], dislikes: [3], matches: [], lastLine: "whatsapp??", photos: ['http://dreamatico.com/data_images/woman/woman-6.jpg'] }
      ],
      currentUserIdx: 0,
      swiperOption: {
        effect: 'coverflow',
        grabCursor: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        loop: true,
        coverflow: {
          rotate: 100,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false
        },
        onTransitionStart: (swiper) => {
          console.log(swiper.realIndex)
          this.currentUserIdx = swiper.realIndex;
        },
      },
      // users1: ''
      //currentUser:''
    }
  },
  created() {
    this.$store.dispatch({ type: GET_BROWSED });
    console.log('browse: created - after GET_BROWSED');

  },
  computed: {
    users() {
      var users11 = this.$store.getters.fetchUsersBrowsed;
      console.log('browse: computed - users:', users11);
      return users11;
    },
    currentUser() {
      return this.users[this.currentUserIdx];
    },
    newMatch() {
      return this.newMatchFlag && this.$store.getters.fetchLastMatch;
    }
  },

  methods: {
    onSwipe(sw) {
      console.log(sw);
    },
    moveToMatches() {
      console.log('Browse: move to MATCHES ')
      this.$router.push('Matches')
    },
    moveToEdit() {
      console.log('Browse: MOVE to edit')
      this.$router.push('Edit')
    },
    userDislike() {
      console.log('Browse: before DISLIKE! id:', this.currentUser.id, this.currentUserIdx, this.users.length)
      const msg = { id1: this.$store.state.user.currUser.id, id2: this.currentUser.id, bul: false }
      this.$store.dispatch({ type: LIKE, data: msg })
      this.currentUserIdx = (this.users.length - 1 === this.currentUserIdx) ? 0 : this.currentUserIdx + 1;
      this.$refs.mySwiper.swiper.slideTo(this.currentUserIdx+1);
    },
    userLike() {
      this.newMatchFlag = true;
      console.log('Browse: BEFORE LIKE state:', this.$store.getters.fetchLastMatch)
      const msg = { id1: this.$store.state.user.currUser.id, id2: this.currentUser.id, bul: true }
      this.$store.dispatch({ type: LIKE, data: msg })
      this.currentUserIdx = (this.users.length - 1 === this.currentUserIdx) ? 0 : this.currentUserIdx + 1;
      this.$refs.mySwiper.swiper.slideTo(this.currentUserIdx+1);
    },
    viewMatches() {
      console.log('Browse: clicked on "VEIW MATCHES"')
      this.newMatchFlag = false;
      this.moveToMatches();
    },
    closePopup() {
      console.log('Browse: clicked on "CLOSE POPUP"')
      this.newMatchFlag = false;
    }

  }
}



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.browse {
  background: transparent;
}

.swiper-container {
  width: 25em!important;
  max-height: 100%;
  margin: auto;
}

.card {
  background-color: rgba(230, 230, 230, 0.9);
  box-shadow: 0 0 30px 10px rgba(220, 220, 220, 0.6); // box-shadow: 0 0 15px 10px rgba(165,154,154,0.9) ;  
  .user-details>p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: clip ellipsis;
  }
}

.like {
  color: red;
  opacity: 0.9;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
}

.actions {
  padding: 1em;
  margin: {
    left: 5em;
    right: 5em;
  }
  display: flex;
  justify-content: space-around;
}

.img-container {
  width: 25em;
  height: 25em;
  ;
  overflow: hidden;
  margin-top: 1em;
  position: relative;

  img {
    position: absolute;
    margin: auto;
    min-height: 100%;
    min-width: 100%;

    /* For the following settings we set 100%, but it can be higher if needed 
    See the answer's update */
    left: -100%;
    right: -100%;
    top: -100%;
    bottom: -100%;
  }
}
</style>
