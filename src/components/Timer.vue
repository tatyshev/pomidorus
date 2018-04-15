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
import {
  generateTimeIcon,
  changePageIcon,
  changePageTitle,
  resetPageIcon,
  resetPageTitle,
  formatTimeForTitle,
} from '@/lib/utils';
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
    const reset = () => {
      resetPageIcon();
      resetPageTitle();
    };
    this.focus.on('finish', reset);
    this.focus.on('stop', reset);
    this.focus.on('skip', reset);
    this.focus.on('tick', () => {
      const image = generateTimeIcon(
        this.focus.elapsed / 1000,
        this.focus.elapsed / this.focus.duration,
      );
      changePageIcon(image);
      changePageTitle(formatTimeForTitle(this.focus.elapsed));
    });
  },

  methods: {
    setStats() {
      this.stats = JSON.parse(localStorage.getItem('statistics'));
    },
  },
};
</script>
