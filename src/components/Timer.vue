<template>
  <div class="b-timer">
    <clock
      :elapsed="focus.elapsed"
      :paused="focus.isPaused"
      :pauses="focus.pauses"/>

    <process
      :value="focus.interval"
      :max="focus.duration"
      :is-break="focus.isLong || focus.isShort"
    />

    <target
      :goal="focus.target"
      :completed="focus.completed.length"
    />
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
  };
</script>
