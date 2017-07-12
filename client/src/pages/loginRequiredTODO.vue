<div id="app">
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
  <el-form-item label="Activity name" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="Activity zone" prop="region">
    <el-select v-model="ruleForm.region" placeholder="Activity zone">
      <el-option label="Zone one" value="shanghai"></el-option>
      <el-option label="Zone two" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="Activity time" required>
    <el-col :span="11">
      <el-form-item prop="date1">
        <el-date-picker type="date" placeholder="Pick a date" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
      </el-form-item>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
    <el-col :span="11">
      <el-form-item prop="date2">
        <el-time-picker type="fixed-time" placeholder="Pick a time" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
      </el-form-item>
    </el-col>
  </el-form-item>
  <el-form-item label="Instant delivery" prop="delivery">
    <el-switch on-text="" off-text v-model="ruleForm.delivery"></el-switch>
  </el-form-item>
  <el-form-item label="Activity type" prop="type">
    <el-checkbox-group v-model="ruleForm.type">
      <el-checkbox label="Online activities" name="type"></el-checkbox>
      <el-checkbox label="Promotion activities" name="type"></el-checkbox>
      <el-checkbox label="Offline activities" name="type"></el-checkbox>
      <el-checkbox label="Simple brand exposure" name="type"></el-checkbox>
    </el-checkbox-group>
  </el-form-item>
  <el-form-item label="Resources" prop="resource">
    <el-radio-group v-model="ruleForm.resource">
      <el-radio label="Sponsorship"></el-radio>
      <el-radio label="Venue"></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="Activity form" prop="desc">
    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">Create</el-button>
    <el-button @click="resetForm('ruleForm')">Reset</el-button>
  </el-form-item>
</el-form>
</div>















<md-card>
  <md-card-area>
    <md-card-media>
      <img src="assets/card-image-1.jpg" alt="People">
    </md-card-media>

    <md-card-header>
      <div class="md-title">Title goes here</div>
      <div class="md-subhead">Subtitle here</div>
    </md-card-header>

    <md-card-content>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non, voluptas eius illo quas, saepe voluptate pariatur in deleniti minus sint. Excepturi.
    </md-card-content>
  </md-card-area>

  <md-card-actions>
    <md-button>Action</md-button>
    <md-button>Action</md-button>
  </md-card-actions>
</md-card>

<md-card>
  <md-card-media>
    <img src="assets/card-image-1.jpg" alt="People">
  </md-card-media>

  <md-card-header>
    <div class="md-title">Title goes here</div>
    <div class="md-subhead">Subtitle here</div>
  </md-card-header>

  <md-card-expand>
    <md-card-actions>
      <md-button>Action</md-button>
      <md-button>Action</md-button>
      <span style="flex: 1"></span>
      <md-button class="md-icon-button" md-expand-trigger>
        <md-icon>keyboard_arrow_down</md-icon>
      </md-button>
    </md-card-actions>

    <md-card-content>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non, voluptas eius illo quas, saepe voluptate pariatur in deleniti minus sint. Excepturi.
    </md-card-content>
  </md-card-expand>
</md-card>










// TODO -- DESCRIPTION FIELD


<template>
  <div class="browse">
    <md-card class="swiper-container">
      <md-card-media class="swiper-container2" v-if="!newMatch">
        <swiper :options="swiperOption" ref="mySwiper">
          <swiper-slide v-for="(user, idx) in users" :key="idx" class="grid-content card" onSlideChangeEnd="onSwipe">
            <div class="img-container">
              <img :src="user.photos && user.photos[0]">
            </div>
            <div class="user-details">
              <h4>{{ user.name }}, {{ newDate - user.birth }}</h4>
            </div>
            <div class="description" v-show="expand">
              <h4>{{ user.name }}, {{ newDate - user.birth }}</h4>
              <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non, voluptas eius illo quas, saepe voluptate pariatur in deleniti minus sint. Excepturi. </p>
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
  
    <section class="actions" v-if="!newMatch">
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
      console.log('Browse: before DISLIKE! id:', this.user.id, this.userIdx, this.users.length)
      const msg = { id1: this.$store.state.user.currUser.id, id2: this.user.id, bul: false }
      this.$store.dispatch({ type: LIKE, data: msg })
      this.userIdx = (this.users.length - 1 === this.userIdx) ? 0 : this.userIdx + 1;
      this.$refs.mySwiper.swiper.slideTo(this.userIdx + 1);
    },
    userLike() {
      this.newMatchFlag = true;
      console.log('Browse: BEFORE LIKE state:', this.$store.getters.fetchLastMatch)
      const msg = { id1: this.$store.state.user.currUser.id, id2: this.user.id, bul: true }
      this.$store.dispatch({ type: LIKE, data: msg })
      this.userIdx = (this.users.length - 1 === this.userIdx) ? 0 : this.userIdx + 1;
      this.$refs.mySwiper.swiper.slideTo(this.userIdx + 1);
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
  }
}
</script>

<style scoped lang="scss">

.browse {
  display: flex;
  flex-direction: column;
  padding: {
    top:2em;
    bottom: 0;
  }
  border-bottom: 1px solid lightgray;
}

.swiper-container2 {
  width: 25em!important;
  margin: auto;
  position: relative;
  
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
  height: 2em;
  padding: {
    top: 1em;
    left: 2em;
    right: 2em;
    bottom: 1em;
  }
  display: flex;
  justify-content: space-between;
  flex-wrap:wrap;
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
  text-align: center;
  overflow: hidden;
  margin-top: 1em;
  img {
    position: relative;
    left: 50%;
    transform: translate(-50%, 0)
  }
}

.match-popup {
  position: relative;
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
  bottom: 0;
}
</style>













<template>
  <div>
    <md-card class="browse">
      <md-card-media v-if="!newMatch">
        <swiper :options="swiperOption" ref="mySwiper">
          <swiper-slide v-for="(user, idx) in users" :key="idx" class="grid-content card" onSlideChangeEnd="onSwipe">
            <div class="img-container">
              <img :src="user.photos && user.photos[0]">
            </div>
            <div class="user-details">
              <h4>{{ user.name }}, {{ user.age }}</h4>
              <!--<p> {{ user.description }} </p>-->
            </div>
          </swiper-slide>
        </swiper>
      </md-card-media>
    </md-card>
  
    <section class="actions" v-if="!newMatch">
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
      newMatchFlag: false,
      currentId: 'TBD - need to grab ID from click',
      userIdx: 0,
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
        },
      },
    }
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
      console.log('Browse: before DISLIKE! id:', this.user.id, this.userIdx, this.users.length)
      const msg = { id1: this.$store.state.user.currUser.id, id2: this.user.id, bul: false }
      this.$store.dispatch({ type: LIKE, data: msg })
      this.userIdx = (this.users.length - 1 === this.userIdx) ? 0 : this.userIdx + 1;
      this.$refs.mySwiper.swiper.slideTo(this.userIdx + 1);
    },
    userLike() {
      this.newMatchFlag = true;
      console.log('Browse: BEFORE LIKE state:', this.$store.getters.fetchLastMatch)
      const msg = { id1: this.$store.state.user.currUser.id, id2: this.user.id, bul: true }
      this.$store.dispatch({ type: LIKE, data: msg })
      this.userIdx = (this.users.length - 1 === this.userIdx) ? 0 : this.userIdx + 1;
      this.$refs.mySwiper.swiper.slideTo(this.userIdx + 1);
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
@import url('https://fonts.googleapis.com/css?family=Kurale');

.swiper-container {
  width: 25em!important;
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
    top: 3em;
    left: 2em;
    right: 2em;
    bottom: 1em;
  }
  display: flex;
  justify-content: space-between;
  flex-wrap:wrap;
  // box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.35) inset;
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
  position: relative;
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

</style>



