<template>
  <section>
    <h1> SPLASH SCREEN </h1>
    <h2> need to check if loggedin and move to login screen </h2>
    <img src="http://10steps.sg/wp-content/uploads/article141/funnycouple_24.jpg">
  </section>
</template>


<script>
export default {
  name: 'splash',
  mounted() {
    console.log('splash: waiting 3 seconds')
    // this.$router.push('Browse');
  },
  data() {
    return {
      msg: 'splash screen',

    }
  },
  computed: {
    //  users() {
    //       console.log('this.$store.usersMatched', this.$store.state.usersMatched);
    //       return this.$store.usersMatched;
    //     }
  },

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

.users-list {
  display: flex;
}

.users-list-item {
  background-color: lightgray;
  display: flex;
  flex-direction: row;
  width: 80%;
  margin-bottom: 2px;
  justify-content: space-between;
}

.user-photo {
  display: flex;
  flex-direction: column;
}

.last-chat-line {
  color: purple;
}

.buttons-zone {
  display: flex;
  flex-direction: column;
}
</style>
