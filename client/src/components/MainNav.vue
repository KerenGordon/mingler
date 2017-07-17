<template>
  <div>
    <el-row >
      <el-col class="grid-content " :lg="{span: 2, offset: 1}" :md="{span: 2, offset: 1}" :sm="{span: 2, offset: 1}" :xs="{span: 2, offset: 1}">
          <router-link to="/edit" class="edit-btn">
            <img src="../assets/settings.png"> </router-link>
           <div class="registered-user">{{this.currUser.name}}</div>
      </el-col>
      <el-col class="grid-content " :lg="{span: 6, offset: 6}" :md="{span: 6, offset: 6}" :sm="{span: 6, offset: 6}" :xs="{span: 8, offset: 5}">
          <router-link to="/browse">        
          <h2 class="logo">
            Mingler
          </h2>
          </router-link>
      </el-col>
      <el-col class="grid-content match-btn" :lg="{span: 2, offset: 6}" :md="{span: 2, offset: 6}" :sm="{span: 2, offset: 6}" :xs="{span: 2, offset: 5}">
        <div v-if="!isBrowseScreen" @click="navigate">
          <router-link to="/browse">
            <img src="../assets/browse.png"> 
            
            </router-link>
        </div>
        <div v-else @click="navigate" class="nav-back">
          <router-link to="/matches">          
            <img src="../assets/matched.png"> </router-link>
          </div>
      </el-col>
  
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'mainnav',
  data() {
    return {
      msg: 'Browse screen',
    //  currUser:  this.$store.state.user.currUser
    }
  },
  // watch: {
  //   '$route': function(window) {
  //     console.log('MainNav-watch: in ' , window, 'screen')
  //   }
  // },
  computed: {
    isBrowseScreen(){
     return ( this.$route.name === "Browse" )
    },
    currUser() {return this.$store.state.user.currUser } 

  },
  methods: {
    navigate() {
      this.isBrowseScreen = !this.isBrowseScreen;
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.edit-btn img {
  width: 3em;
  margin: {
    top: 1.5em;
  }
}

.match-btn img {
  width: 3em;
  margin: {
    top: 1.5em;
  }
}
.registered-user{
  max-height: 1.3em;
  overflow:hidden;
}
.logo {
  color: rgba(124, 1, 87, 1);
  text-transform: uppercase;
  font-size: 2em;
  text-shadow: -1px -1px 2px rgba(89, 89, 89, 0.66);
  font-family: 'Kurale', Helvetica, Arial, sans-serif;
  line-height: 1em;

  img {
    max-width: 1.5em;
    position: absolute;
  }
}
</style>
-