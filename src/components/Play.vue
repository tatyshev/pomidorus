<template>
  <button class="b-play" @click="action()">
    <inline-svg :src="icon"/>
  </button>
</template>

<script>
  import InlineSvg from './InlineSvg.vue';

  export default {
    props: {
      focus: true,
    },

    components: {
      InlineSvg,
    },

    computed: {
      icon() {
        return `${this.state}.svg`;
      },

      state() {
        if (this.focus.isPaused) {
          return 'play';
        }

        if (this.focus.isActive) {
          return 'pause';
        }

        return 'forward';
      },
    },

    methods: {
      action() {
        if (this.focus.isPaused) {
          this.focus.unpause();
          return;
        }

        if (this.focus.isActive) {
          this.focus.pause();
          return;
        }

        this.focus.play();
      },
    },
  };
</script>

