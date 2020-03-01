<template>
  <div>
    <nav
      class="navbar header has-shadow is-danger"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <img src="~assets/buefy/buefy.png" alt="Buefy" height="28">
        </a>

        <div class="navbar-burger burger" data-target="navMenu" :class="{'is-active': isOpen}" @click="isOpen = !isOpen">
          <span />
          <span />
          <span />
        </div>
      </div>
    </nav>

    <section class="main-content columns">
      <div class="container column ">
        <nuxt />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Default extends Vue {
  items = [
    {
      title: 'Home',
      icon: 'home',
      to: { name: 'index' }
    }
  ]

  isOpen = false
}
</script>
