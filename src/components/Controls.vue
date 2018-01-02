<template>
  <div class="b-controls">
    <div class="b-controls__body">
      <a class="b-controls__action" @click.prevent="skip">Skip</a>

      <button class="b-controls__button" @click.prevent="buttonAction">
        {{ buttonText }}
      </button>

      <a class="b-controls__action" @click.prevent="stop">Stop</a>
    </div>
  </div>
</template>

<script>
  /* eslint no-restricted-globals: 0 */

  import Focus from '@/lib/index';

  const SPACE_KEY = 32;

  export default {
    props: {
      focus: {
        type: Focus,
        required: true,
      },
    },

    computed: {
      buttonText() {
        if (this.focus.isActive && !this.focus.isPaused) {
          return 'Pause';
        }

        if (this.focus.isPaused) {
          return 'Resume';
        }

        return 'Start';
      },
    },

    created() {
      this.hotkeys = this.hotkeys.bind(this);
    },

    mounted() {
      window.addEventListener('keyup', this.hotkeys);
    },

    destroyed() {
      window.removeEventListener('keyup', this.hotkeys);
    },

    methods: {
      buttonAction() {
        if (this.focus.isActive && !this.focus.isPaused) {
          this.focus.pause();
          return;
        }

        if (this.focus.isPaused) {
          this.focus.unpause();
          return;
        }

        this.focus.play();
      },

      hotkeys(event) {
        if (event.keyCode === SPACE_KEY) {
          this.buttonAction();
        }
      },

      stop() {
        // eslint-disable-next-line no-alert
        if (confirm('Current timer will be stopped.')) {
          this.focus.stop();
        }
      },

      skip() {
        // eslint-disable-next-line no-alert
        if (confirm('Current timer will be skipped.')) {
          this.focus.skip();
        }
      },
    },
  };
</script>
