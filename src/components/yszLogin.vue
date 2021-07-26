<template>
  <div class="wrap">
    <div class="container">
    <div class="backbox">
      <div class="loginMsg" ref="loginMsg" v-if="_show_login">
        <div class="textcontent">
          <p class="title">Don't have an account?</p>
          <p>Sign up to save all your graph.</p>
          <button @click="onShowSignUp">Sign Up</button>
        </div>
      </div>
      <div class="signupMsg visibility" ref="signupMsg" v-if="_show_sign">
        <div class="textcontent">
          <p class="title">Have an account?</p>
          <p>Log in to see all your collection.</p>
          <button @click="onShowSignIn">LOG IN</button>
        </div>
      </div>
    </div>
    <!-- backbox -->

    <div class="frontbox" ref="frontbox">
      <div class="login" ref="login" v-if="_show_login">
        <h2>LOG IN</h2>
        <div class="inputbox">
          <input type="text" name="email" placeholder="  EMAIL">
          <input type="password" name="password" placeholder="  PASSWORD">
        </div>
        <p>FORGET PASSWORD?</p>
        <button>LOG IN</button>
      </div>

      <div class="signup hide" ref="signup" v-if="_show_sign">
        <h2>SIGN UP</h2>
        <div class="inputbox">
          <input type="text" name="fullname" placeholder="  FULLNAME">
          <input type="text" name="email" placeholder="  EMAIL">
          <input type="password" name="password" placeholder="  PASSWORD">
        </div>
        <button>SIGN UP</button>
      </div>

    </div>
    <!-- frontbox -->
  </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../sass/login.scss";
</style>

<script lang="jsx">
export default {
    name: "yszLogin",
    data(){
      return {sign: false}
    },
    props: {
      single: {type: String}
    },
    computed: {
      _single(){
        return ["login", "sign", ""].includes(this.single) ? this.single : ""
      },
      _show_login(){
        return ["", "login"].includes(this._single)
      },
      _show_sign(){
        return ["", "sign"].includes(this._single)
      }
    },
    methods: {
      toggleClass(dom, c){
        dom.classList.contains(c)
          ? dom.classList.remove(c)
          : dom.classList.add(c)
      },
      onShowSignUp(){
        this.sign = true
        this.toggleClass(this.$refs.loginMsg, "visibility")
        this.$refs.frontbox.classList.add("moving")
        this.toggleClass(this.$refs.signupMsg, "visibility")

        this.toggleClass(this.$refs.signup, "hide")
        this.toggleClass(this.$refs.login, "hide")
      },
      onShowSignIn() {
        this.sign = false
        this.toggleClass(this.$refs.loginMsg, "visibility")
        this.$refs.frontbox.classList.remove("moving")
        this.toggleClass(this.$refs.signupMsg, "visibility")

        this.toggleClass(this.$refs.signup, "hide")
        this.toggleClass(this.$refs.login, "hide")
      }
    }
}
</script>