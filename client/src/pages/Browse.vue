<template>
  <div>
    <md-card class="browse">
      <md-card-media>
        <swiper :options="swiperOption" ref="mySwiper">
          <swiper-slide v-for="user in users" :key="user" class="grid-content card" onSlideChangeEnd="onSwipe">
            <div class="img-container">
              <img :src="user.photos && user.photos[0]">
            </div>
            <div class="user-details">
              <h4>{{ user.name }}, {{ user.age }}</h4>
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
        <md-icon class="material-icons md-size-2x like heart">favorite</md-icon>
      </a>
    </section>
    </md-dialog-alert>
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
      newMatchFlag: false,
      currentId: 'TBD - need to grab ID from click',
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
      this.$refs.mySwiper.swiper.slideTo(this.currentUserIdx + 1);
    },
    userLike() {
      this.newMatchFlag = true;
      console.log('Browse: BEFORE LIKE state:', this.$store.getters.fetchLastMatch)
      const msg = { id1: this.$store.state.user.currUser.id, id2: this.currentUser.id, bul: true }
      this.$store.dispatch({ type: LIKE, data: msg })
      this.currentUserIdx = (this.users.length - 1 === this.currentUserIdx) ? 0 : this.currentUserIdx + 1;
      this.$refs.mySwiper.swiper.slideTo(this.currentUserIdx + 1);
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
  width: 25em!important;
  max-height: 100%;
  margin: auto;
}

.card {
  background-color: rgba(250, 230, 230, 0.9);
  border: 1px solid lightgrey;
  .user-details>p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: clip ellipsis;
  }
}
.actions {
  padding: {
    top: 1em;
    left: 3em;
    right: 3em;
    bottom: 1em;
  }
  display: flex;
  justify-content: space-between;
  flex-wrap:wrap;
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.35) inset;
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

.heart {
 cursor: pointer;
 height: 50px;
 width: 50px;
 background-image:url('https://abs.twimg.com/a/1446542199/img/t1/web_heart_animation.png');
 background-position: left;
 background-repeat:no-repeat;
 background-size:2900%;
}

</style>
