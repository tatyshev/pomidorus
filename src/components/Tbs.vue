<template>
  <ul class="b-tabs">
    <li class="b-tabs__item" :class="active(0)" @click="goTo(0)">Timer</li>
    <li class="b-tabs__item" :class="active(1)" @click="goTo(1)">Stats</li>
    <li class="b-tabs__item" :class="active(2)" @click="goTo(2)">Settings</li>
  </ul>
</template>

<script>
  export default {
    name: 'tbs',
    props: ['siema'],

    methods: {
      active(index) {
        if (this.siema.currentSlide === index) {
          return { 'b-tabs__item--active': true };
        }

        return {};
      },

      goTo(index) {
        this.siema.goTo(index);
      },
    },
  };
</script>
