<template>
  <div @mousemove="mouseMove" @mouseup="mouseUp">
    <md-card class="browse">
      <!--<md-card-media v-if="!newMatch">-->
      <md-card-media>
        <!--=={{this.$refs.mySwiper.swiper.realIndex}}==-->
        <!--<div v-if="this.$refs.mySwiper.swiper.realIndex">=={{ this.$refs.mySwiper.swiper.realIndex}}=====</div>-->
        <!--<div v-if="this.$refs.mySwiper.swiper.realIndex">io here </div>-->
  
        <swiper :options="swiperOption" ref="mySwiper">
          <swiper-slide v-for="(user, idx) in users" :key="idx" class="grid-content card" onSlideChangeEnd="onSwipe">
            <div class="img-container" @mousedown="mouseDown">
              <img class="img-centered" :src="user.photos && user.photos[0]">
            </div>
            <!--<div class="like-opt" >=={{mouseParams.xDirection}}==</div>-->
            <!--=={{sweeperIdx}}*{{idx}}==-->
            <!--<div v-if="idx=== sweeperIdx" :class="msgClass(mouseParams.xDirection)">{{mouseParams.status}}</div>-->
            <div :class="msgClass(mouseParams.xDirection)">{{mouseParams.status}}</div>
            `
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
    <section class="actions">
      <a href="#" @click.prevent="userDislike">
        <md-icon class="material-icons md-size-2x dislike">highlight_off</md-icon>
      </a>
      <a @click.prevent="userLike">
        <md-icon class="material-icons md-size-2x like heart">favorite</md-icon>
      </a>
    </section>
    <div v-if="newMatch" class="match-popup">
      <h1>Congratulations! </h1>
      <h1> You have a NEW MATCH! </h1>
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
// import $ from 'jquery'
var $ = require('jquery');

export default {
  name: 'browse',
  data() {
    return {
      // sweeperIdx: 2,
      prevSweeperIdx: 0,
      oldIdx: 0,
      mouseParams: {
        oldX: null,
        newX: null,
        xDirection: '',
        status: '',
        inDrag: false,
        elWidth: 0,
        movedByDrag: false
      },
      // msg: 'Browse screen',
      expand: false,
      newMatchFlag: false,
      newDate: 2017,
      currentId: 0,//'TBD - need to grab ID from click',
      userIdx: 0,
      swiperOption: {
        effect: 'coverflow',
        grabCursor: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        loop: true,
        coverflow: {
          rotate: 0,
          stretch: 0,
          depth: 0,
          modifier: 3,
          slideShadows: false
        },
        onTransitionStart: (swiper) => {
          this.userIdx = swiper.realIndex;
          if (this.expand) this.expand = false;
        },
      },
    }
  },//      
  //==================================================================
  created() {
    // this.msg= '';

    this.$store.dispatch({ type: GET_BROWSED });
    console.log('browse: created - after GET_BROWSED');
    this.$router.push('Browse');
    this.swipeTo(0);
    // this.mouseParams={
    //       oldX:null,
    //       newX:null,
    //       xDirection:''
    //   }
    // sweeperIdx= this.$refs.mySwiper.swiper.activeIndex;


  },
  //==================================================================
  mounted() {
    this.searchInterval();
  },
  //==================================================================
  computed: {
    sweeperIdx() {
      //console.log('browse:sweeper8888888888888888888888888888:', this.$refs.mySwiper.swiper.realIndex);
      /// return this.$refs.mySwiper.swiper.realIndex;
      return this.$refs.mySwiper.swiper.realIndex;
    },
    msg() {
      var msg1 = this.msg
      console.log('browse: computed.msg:', this.msg);
      return msg1
    },
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
  //==================================================================
  watch: {
    'mouseParams.xDirection': function () {
      this.msg = 'hi guys';
    },
    'sweeperIdx': function () {
      console.log('************browse: watch - idx change indicated*****', this.sweeperIdx);

      //  this.sweeperIdx = this.$refs.mySwiper.swiper.activeIndex ;
      if (this.sweeperIdx != this.prevSweeperIdx) {
        console.log('browse: watch - idx change:*********************************************', this.sweeperIdx);
      }
      else {
        console.log('browse: watch - idx no change:*********************************************', this.sweeperIdx);
      }
      this.prevSweeperIdx = this.sweeperIdx;
    },
  },

  //==================================================================
  methods: {
    searchInterval() {
      // this.currentId;
      var that = this;
      setInterval(function () {
        console.log('LIKE/DISLIKE BY interval - in ');
        var newIdx = that.$refs.mySwiper.swiper.realIndex;
        if (newIdx !== this.oldIdx) {
          //  oldIdx = newIdx;
          //  that.activateLikeAction();
          console.log('LIKE/DISLIKE BY interval - slide detected from:',
            this.oldIdx, ' to', newIdx);
          if (this.oldIdx > newIdx) {
            console.log('LIKE/DISLIKE BY interval - LIKE !!!!');
//console.log('prev index', that.mouseParams)

            }
          else {
            console.log('LIKE/DISLIKE BY interval - DISLIKE !!!!');

           }
        }
        this.oldIdx = newIdx;
      }, 500);

    },
    //===========================================================
    mouseDown(event) {
      var params = this.$refs.mySwiper.swiper;
      var el = document.getElementsByClassName("card")[0];
      //console.log("mouseDown.userIdx", params.realIndex);

      var rect = el.getBoundingClientRect();
      // console.log("mouseDown.rect", rect);
      this.mouseParams.elWidth = params.width;
      // console.log("mouseDown.el ", el );
      // console.log("mouseDown", event.clientX);
      this.mouseParams.oldX = event.clientX;
      this.mouseParams.inDrag = true
    },
    mouseMove(event) {
      // var rectObject = object.getBoundingClientRect();
    //  console.log("mouseMove.tempIdx:", this.sweeperIdx);
      var newX = this.mouseParams.newX;
      this.mouseParams.newX = event.clientX;
      if (!this.mouseParams.oldX) return
      if (newX > this.mouseParams.oldX) {
        this.mouseParams.xDirection = 'right';
        this.mouseParams.status = 'like';
        this.msg = 'like';
      } else {
        this.mouseParams.xDirection = 'left';
        this.mouseParams.status = 'dislike';
        this.msg = 'dislike';
      }
      var dif = Math.abs(this.mouseParams.newX - this.mouseParams.oldX);
      //console.log('mouseMove.dif,', dif, '/', this.mouseParams.xDirection, 'idx:', this.userIdx);
      // console.log('mouseMove.sweeper idx,', this.$refs.mySwiper.swiper);
      if (dif > this.mouseParams.elWidth) {
        //   console.log('we have a like/dislike');
        // this.activateLikeAction();
      }
      // console.log(this.mouseParams.xDirection);

    },
    mouseUp(event) {

      console.log("mouseUp", event.clientX);
      this.mouseParams.oldX = null;
      this.mouseParams.xDirection = '';
      this.mouseParams.status = '';
      this.mouseParams.inDrag = false;
    },
    //===========================
    activateLikeAction() {
      // console.log('browse.activateLikeAction! status:', this.mouseParams.status )

      if (this.mouseParams.status === 'like') {
        console.log('browse.activateLikeAction! like!!!!!!!!!!!!!:')
        // this.userLike()
      } else {
        console.log('browse.activateLikeAction! dislike!!!!!!!!!!!!!:')
        // this.userDislike();
      }
      this.mouseParams.oldX = this.mouseParams.newX;
      this.mouseParams.status = '';


    },
    //===========================
    msgClass(direction) {
      // if (this.mouseParams.xDirection = 'left') return 'server';
      console.log('browse999999999999: msgClass', direction)
      if (!direction) return;
      return (direction === 'right') ? 'like-action like-opt' : 'like-action dislike-opt';
    },

    //=================
    onSwipe(sw) {
      console.log('browse.methods.onSwipe:', sw);
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
      // console.log('Browse: before DISLIKE! id:', this.user.id, this.userIdx, this.users.length)
      console.log('Browse: DISLIKE! real:', this.$refs.mySwiper.swiper.realIndex,
        'snapIndex:', this.$refs.mySwiper.swiper.snapIndex,
        'previousIndex:', this.$refs.mySwiper.swiper.previousIndex,
        'activeIndex:', this.$refs.mySwiper.swiper.activeIndex,
        'prev index', this.prevSweeperIdx,
        'prev index', this.mouseParams
      );


      const msg = { id1: this.$store.state.user.currUser.id, id2: this.user.id, bul: false }
      this.$store.dispatch({ type: LIKE, data: msg })
      this.userIdx = (this.users.length - 1 === this.userIdx) ? 0 : this.userIdx + 1;
      this.$refs.mySwiper.swiper.slideTo(this.userIdx + 1);
      localStorage.setItem("browseUserIdx", this.userIdx);
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
    },
    swipeTo(idx) {
      // this.$refs.mySwiper.swiper.slideTo(idx);
    },


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
  // background-color: rgba(250, 230, 230, 0.9);
  overflow: hidden;
  .user-details>p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: clip ellipsis;
  }
}

.md-card-media {
  background-color: rgba(250, 230, 230, 0.9);
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

.like-action {
  font-size: 2em;
  position: absolute;
  top: 25px;
  padding: 5px;
  border-radius: 5px;
}

.like-opt {
  color: green;
  left: 10px;
  border: 2px solid green;
}

.dislike-opt {
  color: red;
  right: 10px;
  border: 2px solid red;
}

.img-container {

  width: 30em;
  height: 23em;
  overflow: hidden;
  margin-top: 1em;
  position: relative;
}

.img-centered {
  flex: none;

  position: absolute; //  left: 30%;
  //  top: 50%;
  //  transform: translateY(-10%) translateX(-10%);
  margin: auto;
  min-height: 100%;
  min-width: 100%;
  left: -100%;
  right: -100%;
  top: -100%;
  bottom: -100%;
}

.match-popup {
  position: fixed;
  top: 0;
  left: 0;
  background-color: gray;
  z-index: 1000;
  width: 100%;
  height: 100%;
  line-height: 3em;
  color: white;
  text-shadow: -1px -1px 2px rgba(89, 89, 89, 0.66); // background-color: lightseagreen;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.popup-image {
  max-width: 15em;
  max-height: 15em;
  ;
}

.popup-buttons {
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
</style>
