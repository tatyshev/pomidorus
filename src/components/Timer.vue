<template>
  <div class="b-timer">
    <clock
      :elapsed="focus.elapsed"
      :paused="focus.isPaused"
      :pauses="focus.pauses"/>

    <process
      :value="focus.interval"
      :max="focus.duration"
      :color-foreground="colors.process.foreground"
      :color-background="colors.process.background"/>

    <target
      :goal="focus.target"
      :completed="focus.completed.length"
      :color-background="colors.target.background"
      :color-completed="colors.target.completed"/>
  </div>
</template>

<script>
  import Focus from '../lib/index';
  import Clock from './Clock';
  import Process from './Process';
  import Target from './Target';

  export default {
    name: 'timer',

    components: {
      Process,
      Target,
      Clock,
    },

    props: {
      focus: {
        type: Focus,
        required: true,
      },
    },

    computed: {
      colors() {
        const isShort = this.focus.isShort;
        const isLong = this.focus.isLong;

        return {
          process: {
            background: 'transparent',
            foreground: (isLong || isShort) ? '#97ce28' : '#e4582b',
          },
          target: {
            background: 'rgba(255, 255, 255, 0.15)',
            completed: '#39b6eb',
          },
        };
      },
    },
  };
</script>
