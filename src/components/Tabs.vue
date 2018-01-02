<template>
  <ul class="b-tabs">
    <li class="b-tabs__item" :class="active(0)" @click="goTo(0)">Timer</li>
    <li class="b-tabs__item" :class="active(1)" @click="goTo(1)">Settings</li>
    <li class="b-tabs__item" :class="active(2)" @click="goTo(2)">About</li>
  </ul>
</template>

<script>
  export default {
    name: 'Tabs',
    props: ['current'],

    methods: {
      active(index) {
        if (this.current === index) {
          return { 'b-tabs__item--active': true };
        }

        return {};
      },

      goTo(index) {
        this.$emit('go-to', index);
      },
    },
  };
</script>
