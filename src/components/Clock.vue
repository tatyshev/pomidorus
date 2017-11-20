<template>
  <div :class="classes.clock">
    <div :class="classes.minutes">{{ clock.minutes | zeroify }}</div>
    <div :class="classes.seconds">{{ clock.seconds | zeroify }}</div>
    <div :class="classes.pauses">{{ pauseClock }}</div>
  </div>
</template>

<script>
  import { zeroify } from '@/lib/utils';

  export default {
    props: {
      elapsed: {
        type: Number,
        default: 0,
      },
      pauses: {
        type: Number,
        default: 0,
      },

      paused: {
        type: Boolean,
        default: false,
      },
    },

    filters: {
      zeroify,
    },

    computed: {
      clock() {
        const left = Math.floor(this.elapsed / 1000);
        const seconds = left % 60;
        const minutes = (left - seconds) / 60;

        return { seconds, minutes };
      },

      pause() {
        const left = Math.floor(this.pauses / 1000);
        const seconds = left % 60;
        const minutes = (left - seconds) / 60;

        return { seconds, minutes };
      },

      pauseClock() {
        const { minutes } = this.pause;
        const seconds = zeroify(this.pause.seconds);

        if (minutes === 0) return seconds;
        return `${minutes}:${seconds}`;
      },

      classes() {
        return {
          clock: {
            'b-clock': true,
            'b-clock--paused': this.paused,
          },

          minutes: {
            'b-clock__minutes': true,
          },

          seconds: {
            'b-clock__seconds': true,
          },

          pauses: {
            'b-clock__pauses': true,
            'b-clock__pauses--hidden': this.pauses === 0,
            'b-clock__pauses--small': this.pause.minutes !== 0,
          },
        };
      },
    },
  };
</script>
