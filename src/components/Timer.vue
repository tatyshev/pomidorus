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

    <heatmap :stats="stats"/>

    <target
      :goal="focus.target"
      :completed="focus.completed"
    />
  </div>
</template>

<script>
  import Focus from '@/lib/index';
  import Clock from './Clock';
  import Process from './Process';
  import Target from './Target';
  import Heatmap from './Heatmap';

  export default {
    name: 'timer',

    components: {
      Process,
      Target,
      Clock,
      Heatmap,
    },

    props: {
      focus: {
        type: Focus,
        required: true,
      },
    },

    data: () => ({
      stats: [],
    }),

    mounted() {
      this.setStats();
      this.focus.on('update', this.setStats);
    },

    methods: {
      setStats() {
        this.stats = JSON.parse(localStorage.getItem('statistics'));
      },
    },
  };
</script>
