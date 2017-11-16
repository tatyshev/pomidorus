<template>
  <div class="b-controls">
    <button class="b-controls__button" v-if="!focus.isActive" @click="focus.play()">
      Start
    </button>

    <button class="b-controls__button" v-if="focus.isActive && !focus.isPaused" @click="focus.pause()">
      Pause
    </button>

    <button class="b-controls__button" v-if="focus.isPaused" @click="focus.unpause()">
      Resume
    </button>

    <button class="b-controls__button" @click="reset()">
      Reset
    </button>
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
    },
  };
</script>
