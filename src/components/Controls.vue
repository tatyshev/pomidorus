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

    <button class="b-controls__button" @click="focus.reset()">
      Reset
    </button>
  </div>
</template>

<script>
  import Focus from '../lib/index';
  import Icon from './Icon';

  export default {
    components: {
      Icon,
    },

    props: {
      focus: {
        type: Focus,
        required: true,
      },
    },
  };
</script>
