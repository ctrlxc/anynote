<template>
  <div>
    <b-navbar>
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <!-- <img src="~assets/logo.png" alt="AnyNoteLogo" height="28"> -->
          AnyNote
        </b-navbar-item>
      </template>

      <template slot="end">
        <b-navbar-item tag="div">
          <v-flex v-if="user">
            <b-navbar-dropdown :label="`${user.displayName}さん`">
              <b-navbar-item href="#">
                My Notes
              </b-navbar-item>
              <b-navbar-item @click="signout">
                Sign Out
              </b-navbar-item>
            </b-navbar-dropdown>
          </v-flex>
          <v-flex v-else>
            <div class="buttons">
              <a class="button is-light" @click="signin">
                Sign In
              </a>
            </div>
          </v-flex>
        </b-navbar-item>
      </template>
    </b-navbar>

    <section class="main-content columns">
      <div class="container column">
        <nuxt />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { auth } from '~/plugins/firebase'

@Component
export default class Default extends Vue {
  isOpen = false
  signLabel = 'Sign In'
  user: firebase.User | null = null

  @Watch('user')
  onChangedUser () {
    this.signLabel = this.user ? 'Sign Out' : 'Sign In'
  }

  signin () {
    auth().signInWithPopup(new auth.GoogleAuthProvider())
  }

  signout () {
    auth().signOut()
  }

  signinout () {
    if (auth().currentUser) {
      this.signout()
    } else {
      this.signin()
    }
  }

  mounted () {
    auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user
      } else {
        this.user = null
      }
    })
  }
}
</script>
