<template>
  <!--<div v-if="user">-->
  <div v-if="user" class = "main">
    <div id="browse-div" class="browse" ref="playground">

      <!--users[1]-->
          <div v-if="drageVals.showUser && users[nextUser]"  :user='users[nextUser]' class="img-frame"  >
                <div class="img-container">
                  <img v-if="users[nextUser].photos" 
                        :src="users[nextUser].photos && users[nextUser].photos[0]">
                </div>
                <div class="user-details">
                      <!--<h4 class = "photo-txt">{{ users[nextUser].name }}, {{ users[nextUser].age }}</h4>-->
                      <h4 class = "photo-txt">.</h4>


                    <div class="description" v-show="expand">
                      <h4>{{ users[nextUser].name }}, 1{{ newDate - users[nextUser].birth }}nextUser</h4>
                      <p> {{users[nextUser].description}}
                        <div class="expand">
                          <p @click="expand = !expand">
                            <md-icon>keyboard_arrow_down</md-icon>
                          </p>
                        </div>
                    </div>
                </div>
        </div>



      <!--users[0]  v-if="drageVals.showUser"    && users[userIdx]               -->
       <transition name="fade">
        <div v-if="drageVals.showUser "  :user='users[userIdx]' class="img-frame" 
              v-draggable v-draggable-touch 
              @mousemove="touchMove"  @touchmove="touchMove" 
              @mousedown="dragModeTrue" @mouseup="dragModeFalse" 
               @touchstart ="dragModeTrue" @touchend ="dragModeFalse" >
                <div class="img-container">
                  <!--<img v-if="users[userIdx].photos" :src="users[userIdx].photos && users[userIdx].photos[userIdx]">-->
                  <img  :src="users[userIdx].photos && users[userIdx].photos[0]">
                </div>
                <div class="user-details">
                      <h4 class = "photo-txt">{{ users[userIdx].name }}, {{ users[userIdx].age }}userIdx</h4>


                    <div class="description" v-show="expand">
                      <h4>{{ users[userIdx].name }}, {{ newDate - users[userIdx].birth }}</h4>
                      <!--<p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non, voluptas eius illo quas, saepe voluptate pariatur in deleniti minus sint. Excepturi. </p>-->
                      <p> {{users[userIdx].description}}
                        <div class="expand">
                          <p @click="expand = !expand">
                            <md-icon>keyboard_arrow_down</md-icon>
                          </p>
                        </div>
                    </div>
                </div>
        </div>
      </transition>

  
    </div>
  
    <!--<section class="actions" v-if="!newMatch">-->
    <section class="actions">
      <a href="#" @click.prevent="userDislike">
        <md-icon class="material-icons md-size-2x dislike">highlight_off</md-icon>
      </a>
      <a @click.prevent="userLike">
        <md-icon class="material-icons md-size-2x like heart">favorite</md-icon>
      </a>
    </section>
    
    <transition name="fade">
          <div v-if="newMatch" transition="fade"  class="match-popup">
            <h1>Congratulations! </h1>
            <h1> You have a NEW MATCH! </h1>
            <img class="popup-image" :src="this.newMatch.photos[0]"></img>
            <h2>You and {{this.newMatch.name}} like each other</h2>
            <div class="popup-buttons">
              <el-button class="button" @click="closePopup">CLOSE</el-button>
              <el-button class="button" @click="viewMatches">View Matches</el-button>
            </div>
          </div>
    </transition>


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
import Vue from 'vue'
import Sortable from 'vue-sortable'

Vue.use(Sortable)

export default {
  name: 'browse',
  data() {
    return {
      msg: 'Browse screen',
      expand: false,
      newMatchFlag: false,
      newDate: 2017,
      currentId: 'TBD - need to grab ID from click',
      userIdx: 0,
      nextUser: 1,
      
      drageVals:{
        totalXDist : 0,
        isFirstRound:true,
        clientWidth:0,
        diff:50,
        initialLeft:null,
        initialTop:null,
        xLeft:0,
        xRight:0,
        xMid:0,
        xPersent:0,
        xDistFromInitial:0,
        xRightParent:0,
        // distToLeft: 0,
        // distToRight: 0,
        showUser : true,
        isDraged:false,
        opacity:1,
        rotate:0
      }
    }
  },
  mounted() {
  },
  created() {
    this.$store.dispatch({ type: GET_BROWSED });
    console.log('browse: created - after GET_BROWSED');
    this.$router.push('Browse')
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
    
    dragModeTrue(e){
            this.drageVals.isDraged = true;
            this.drageVals.showUser = true;
        // console.log('toggleDragModeTrue.isDrag:',this.drageVals.isDraged , 'isDraged', this.drageVals.isDraged)
        // console.log('toggleDragModeTrue.initialTop:',this.drageVals.initialTop , 'initialLeft', this.drageVals.initialLeft)
        this.calculateCardPos(e);
  },
    dragModeFalse(e){
        console.log('dragModeFalse.e.path[2].offsetLeft.left',  e.path[2].style.top )
            e.path[2].style.left =this.drageVals.initialLeft +'px';
        console.log('dragModeFalse.1.555555555555555' )
            this.calculateCardPos(e);
            this.goHome(e);
        console.log('dragModeFalse.1.666666666666666' )
            this.isDraged = false;
            this.showUser = false;
        console.log('dragModeFalse.end' )
    },
    //===================================
    goHome(e){
          // console.log( '----------------------goHome.e.path[2]', e.path[2].style.left );
          console.log( '------------goHome.this.drageVals.initialTop',
                 this.drageVals.initialTop, e.path[2].style.top );
            e.path[2].style.left =this.drageVals.initialLeft +'px';
            e.path[2].style.top =this.drageVals.initialTop +'px';
            e.path[2].style.transform  =`rotate(0deg)`;
    },
    //===================================
    touchMove(e){
          this.calculateCardPos(e)
          // console.log('touchMove.e.target', e.target.x , e.target.clientWidth );
          // console.log(this.users[0] );
    },
    //===================================
    calculateCardPos(e){
        var vals = this.drageVals;
        var el = e.target;

      if(!vals.showUser || !vals.isDraged) return;
      // console.log('calculateCardPos.showUser', this.drageVals.showUser,'isDraged', this.drageVals.isDraged);
      if (e.target.x + e.target.clientWidth > e.path[3].clientWidth+ vals.diff ){
          this.userLike(e);
          console.log( "calculateCardPos.like");
      }
      if (e.target.x < -vals.diff ){
          this.userDislike(e);
          console.log( "calculateCardPos.dislike");
      }
      if( !vals.initialLeft ){       //init vals
          vals.initialLeft =   e.target.x;
          vals.initialTop =   e.target.y;
          vals.totalXDist  =   e.target.x +  vals.diff;
      }

      
      // get dist from wall
        var vals = this.drageVals;
        var el = e.target;
        vals.clientWidth  =e.target.clientWidth;
        vals.xLeft        =e.target.x;
        vals.xRight       =e.target.x + e.target.clientWidth;
        vals.xMid         =(vals.xRight + vals.xLeft)/2;
        // vals.xRightParent =e.path[3].clientWidth;  //set parent width
        // vals.distToRight  =vals.xRightParent - vals.xRight ;
        // vals.distToLeft   =vals.xLeft  //set parent width
        // vals.xDistFromInitial = vals.xLeft-vals.xMid ;
      
          vals.xPersent = (vals.xLeft - vals.initialLeft)/ (vals.initialLeft+  vals.diff)
           vals.opacity = 1-(Math.abs(vals.xPersent)/2)
          
          vals.rotate =70 * vals.xPersent
          // e.path[2].style.opacity  = vals.opacity;
          // e.path[2].target.style.transform  =`rotate(${  this.drageVals.rotate}deg)`;
          e.path[2].style.transform  =`rotate(${  vals.rotate}deg)`;
          // console.log( "111111111.drageVals.xPersent:",vals.rotate )
          // console.log( "111111111.drageVals.e.opacity:", e.path[1].target.style.opacity,
          //                                '/transform', e.path[1].target.style.transform );
          
          
  
},



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
    userDislike(e) {
      console.log('Browse: before DISLIKE! id:', this.userIdx, this.users.length)
      const msg = { id1: this.$store.state.user.currUser.id, id2: this.user.id, bul: false }
      this.$store.dispatch({ type: LIKE, data: msg })
          
          // this.userIdx  = (this.userIdx === this.users.length - 1) ? 0 : this.userIdx + 1;
          // this.nextUser = (this.nextUser === this.users.length - 1) ? 0 : this.userIdx + 1;
      
      console.log('Browse:  DISLIKE! id:', this.userIdx, this.users.length)
      
      this.drageVals.isDraged =false;
      this.drageVals.showUser =false;
      var that = this;
      // e.path[2].classList.add("fly-out")
      // e.path[2].style.left ='-210px';

      
      setTimeout(function() {
            that.drageVals.showUser =true;
            that.userIdx  = (that.userIdx === that.users.length - 1) ? 0 : that.userIdx + 1;
            that.nextUser = (that.nextUser === that.users.length - 1) ? 0 : that.userIdx + 1;
            // e.path[2].classList.remove("fly-out")
      },1);
  
},
    userLike(e) {
      console.log( "888888888888888888userLike");
      this.newMatchFlag = true;
      console.log('Browse: before LIKE! id:', this.userIdx, this.users.length)
      const msg = { id1: this.$store.state.user.currUser.id, id2: this.user.id, bul: true }
      this.$store.dispatch({ type: LIKE, data: msg })
      this.drageVals.isDraged =false;
      this.drageVals.showUser =false;
      var that = this;
      // e.path[2].classList.add("fly-out")
      // e.path[2].style.left ='-210px';

      
      setTimeout(function() {
            that.drageVals.showUser =true;
            that.userIdx  = (that.userIdx === that.users.length - 1) ? 0 : that.userIdx + 1;
            that.nextUser = (that.nextUser === that.users.length - 1) ? 0 : that.userIdx + 1;
            // e.path[2].classList.remove("fly-out")
      },1);
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
      // console.log('Browse: before LIKE! id:', this.userIdx, this.users.length)
      // const msg = { id1: this.$store.state.user.currUser.id, id2: this.user.id, bul: true }
      // this.drageVals.isDraged =false;
      // this.drageVals.showUser =false;
      // var that = this;
      // // e.path[2].classList.add("fly-out")
      // e.path[2].style.left ='-210px';

      
      // setTimeout(function() {
      //       that.drageVals.showUser =true;
      //       that.userIdx  = (that.userIdx === that.users.length - 1) ? 0 : that.userIdx + 1;
      //       that.nextUser = (that.nextUser === that.users.length - 1) ? 0 : that.userIdx + 1;
      //       // e.path[2].classList.remove("fly-out")
      // },1);
  

</script>

<style scoped lang="scss">
.fly-out{
  transition: 0.2 all;
}

.main{
    overflow: hidden;
  }
  .browse{
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 150px);
}
.card {
  background-color: rgba(250, 230, 230, 0.9);
  overflow: hidden;
}
.user-details {
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: clip ellipsis;
    z-index: 5;
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
.img-frame{
    // transition: all 0.2s;
    background: lightgrey;
}

.img-container {
  margin:auto;
  width: 20em;
  height: 18em;
  overflow: hidden;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  position: relative;
  display:flex;
  flex-direction: column;
.photo-txt{
  font-size: 1em;
  color:red;
}
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

.fade-enter-active, .fade-leave-active {
  transition: opacity .01s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}
</style>
 