<style src="normalize.css"></style>
<style src="@/styles/index.scss" lang="scss">
</style>

<template>
  <div class="b-application">
    <div class="b-layout">
      <div class="b-layout__top">
        <tabs/>
      </div>

      <div class="b-layout__body">
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

      <div class="b-layout__bottom">
        <controls :focus="focus"/>
      </div>
    </div>
  </div>
</template>

<script>
  import Focus from '@/lib';
  import Clock from './Clock';
  import Tabs from './Tabs';
  import Process from './Process';
  import Target from './Target';
  import Controls from './Controls';

  export default {
    name: 'application',

    components: {
      Target,
      Controls,
      Tabs,
      Process,
      Clock,
    },

    data() {
      return {
        focus: new Focus(this.takeState()),
      };
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

    watch: {
      focus: {
        handler() { this.saveState(); },
        deep: true,
      },
    },

    mounted() {
      this.focus.start();
    },

    methods: {
      saveState() {
        const state = this.focus.toJson();
        localStorage.setItem('state', JSON.stringify(state));
      },

      takeState() {
        const state = localStorage.getItem('state');
        if (state) return JSON.parse(state);
        return {};
      },
    },
  };
</script>
