<template>
  <div>
    <md-card class="browse">
      <!--<md-card-media v-if="!newMatch">-->
      <md-card-media >
        <swiper :options="swiperOption" ref="mySwiper">
          <swiper-slide v-for="(user, idx) in users" :key="idx" class="grid-content card" onSlideChangeEnd="onSwipe">
            <div class="img-container">
              <img :src="user.photos && user.photos[0]">
              <div class= "kkk"> tttttt</div>

            </div>
            <div class="user-details">
              <h4>{{ user.name }}, {{ user.age }}</h4>
            </div>
            <div class="description" v-show="expand">
              <h4>{{ user.name }}, {{ newDate - user.birth }}</h4>
              <!--<p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non, voluptas eius illo quas, saepe voluptate pariatur in deleniti minus sint. Excepturi. </p>-->
              <p> {{user.description}}
              <div class="expand">
                <p @click="expand = !expand">
                  <md-icon>keyboard_arrow_down</md-icon>
                </p>
              </div>
            </div>
            <div class="expand">
              <p @click="expand = !expand">
                <md-icon>keyboard_arrow_up</md-icon>
              </p>
            </div>
          </swiper-slide>
        </swiper>
      </md-card-media>
    </md-card>
  
    <!--<section class="actions" v-if="!newMatch">-->
    <section class="actions" >
      <a href="#" @click.prevent="userDislike">
        <md-icon class="material-icons md-size-2x dislike">highlight_off</md-icon>
      </a>
      <a @click.prevent="userLike">
        <md-icon class="material-icons md-size-2x like heart">favorite</md-icon>
      </a>
    </section>
     <div v-if="newMatch" class="match-popup">
      <h1>Congratulations! </h1><h1> You have a NEW MATCH! </h1>
      <img class="popup-image" :src="this.newMatch.photos[0]"></img>
      <h2>You and {{this.newMatch.name}} like each other</h2>
      <div class="popup-buttons">
        <el-button class="button" @click="closePopup">CLOSE</el-button>
        <el-button class="button" @click="viewMatches">View Matches</el-button>
      </div>
    </div>
  
  </div>
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
      expand: false,
      newMatchFlag: false,
      newDate: 2017,
      currentId: 'TBD - need to grab ID from click',
      userIdx: 1,
      swiperOption: {
        effect: 'coverflow',
        grabCursor: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        loop: true,
        coverflow: {
          rotate: 100,
          stretch: 20,
          depth: 100,
          modifier: 1,
          slideShadows: false
        },
        onTransitionStart: (swiper) => {
          this.userIdx = swiper.realIndex;
          if (this.expand) this.expand = false;
        },
      },
    }
  },//      

  created() {
    this.$store.dispatch({ type: GET_BROWSED });
    console.log('browse: created - after GET_BROWSED');
    this.$router.push('Browse');
    this.swipeTo(0)

  },
  computed: {
    users() {
      var users11 = this.$store.getters.fetchUsersBrowsed;
      console.log('browse: computed - users:', users11);
      return users11;
    },
    user() {
      return this.users[this.userIdx];
    },
    newMatch() {
      return this.newMatchFlag && this.$store.getters.fetchLastMatch;
    }
  },

  methods: {
    onSwipe(sw) {
      console.log('browse.methods.onSwipe:',sw);
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
      console.log('Browse: before DISLIKE! id:', this.user.id, this.userIdx, this.users.length)
      const msg = { id1: this.$store.state.user.currUser.id, id2: this.user.id, bul: false }
      this.$store.dispatch({ type: LIKE, data: msg })
      this.userIdx = (this.users.length - 1 === this.userIdx) ? 0 : this.userIdx + 1;
      this.$refs.mySwiper.swiper.slideTo(this.userIdx + 1);
      localStorage.setItem("browseUserIdx", this.userIdx);
    },
    swipeTo(idx){
      // this.$refs.mySwiper.swiper.slideTo(idx);
    },
    userLike() {
      this.newMatchFlag = true;
      console.log('Browse: BEFORE LIKE state:', this.$store.getters.fetchLastMatch)
      console.log('Browse: currUser:', this.$store.state.user.currUser)

      
      const msg = { id1: this.$store.state.user.currUser.id, id2: this.user.id, bul: true }
      this.$store.dispatch({ type: LIKE, data: msg })
      this.userIdx = (this.users.length - 1 === this.userIdx) ? 0 : this.userIdx + 1;
      this.$refs.mySwiper.swiper.slideTo(this.userIdx + 1);
      localStorage.setItem("browseUserIdx", this.userIdx);
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

<style scoped lang="scss">

.swiper-container {
  width: 22em!important;
  max-height: 100%;
  margin: auto;
}

.card {
  background-color: rgba(250, 230, 230, 0.9);
  overflow: hidden;
  .user-details>p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: clip ellipsis;
  }
}

.actions {
  padding: {
    top: 0.5em;
    left: 2em;
    right: 2em;
    bottom: 1em;
  }
  display: flex;
  justify-content: space-between;
  flex-wrap:wrap;
  background: lightgrey;
  .like {
    color: red;
    opacity: 0.9;
    cursor: pointer;
    &:hover {
      opacity: 1;
    }
  }
  .dislike {
    color: rgba(124, 1, 87, 1);
    opacity: 0.8;
    cursor: pointer;
    &:hover {
      opacity: 1;
    }
  }
}

.img-container {
  width: 30em;
  height: 23em;
  overflow: hidden;
  margin-top: 1em;
  position: relative;

  img {
    position: absolute;
    margin: auto;
    min-height: 100%;
    min-width: 100%;
    left: -100%;
    right: -100%;
    top: -100%;
    bottom: -100%;
  }
}

.match-popup {
  position: fixed;
  top:0;
  left:0;
  background-color: gray;
  z-index: 1000;
  width: 100%;
  height: 100%;
  line-height: 3em;
  color: white;
  text-shadow: -1px -1px 2px rgba(89, 89, 89, 0.66);
  // background-color: lightseagreen;
  display:flex;
  flex-direction:column;
  justify-content: space-around;
  align-items: center;
}

.popup-image {
  max-width: 15em;
  max-height: 15em;;
}

.popup-buttons{
    width: 100%;
  .button {
    font-family: 'Kurale', Helvetica, Arial, sans-serif;
    text-transform: uppercase;    
    margin-bottom: 1.5em;
  }
  }
  .description {
  background: rgba(252, 217, 217, 1);
  position: absolute;
  display: block;
  width: 100%;
  bottom: 0;
  }
  .expand {
    cursor: pointer;
  }
.kkk{
  background-color: black;
  font-size:30px;
  float:left;
}

</style>
