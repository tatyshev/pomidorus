<template>
  <div class="b-controls">
    <div class="b-controls__body">
      <a class="b-controls__action" @click.prevent="reset">Reset</a>

      <button class="b-controls__button" v-if="!focus.isActive" @click="focus.play()">
        Start
      </button>

      <button class="b-controls__button" v-if="focus.isActive && !focus.isPaused" @click="focus.pause()">
        Pause
      </button>

      <button class="b-controls__button" v-if="focus.isPaused" @click="focus.unpause()">
        Resume
      </button>

      <a class="b-controls__action" @click.prevent="stop">Stop</a>
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
      stop() {
        // eslint-disable-next-line no-alert
        if (confirm('Current timer will be stopped.')) this.focus.stop();
      },

      reset() {
        // eslint-disable-next-line no-alert
        if (confirm('Today\'s completed pomodoros will be reset.')) this.focus.reset();
      },
    },
  };
</script>
