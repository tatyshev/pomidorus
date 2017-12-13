<template>
  <div class="b-controls">
    <div class="b-controls__body">
      <a class="b-controls__action" @click.prevent="clear">Clear</a>

      <button class="b-controls__button" v-if="!focus.isActive" @click="focus.play()">
        Start
      </button>

      <button class="b-controls__button" v-if="focus.isActive && !focus.isPaused" @click="focus.pause()">
        Pause
      </button>

      <button class="b-controls__button" v-if="focus.isPaused" @click="focus.unpause()">
        Resume
      </button>

      <a class="b-controls__action" @click.prevent="reset">Reset</a>
    </div>
  </div>
</template>

<script>
  /* eslint no-restricted-globals: 0 */

  import Focus from '@/lib/index';

  export default {
    props: {
      focus: {
        type: Focus,
        required: true,
      },
    },

    methods: {
      reset() {
        // eslint-disable-next-line no-alert
        if (confirm('Are you sure?')) this.focus.reset();
      },

      clear() {
        // eslint-disable-next-line no-alert
        if (confirm('Are you sure?')) this.focus.clear();
      },
    },
  };
</script>
