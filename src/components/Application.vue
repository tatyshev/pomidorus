<style src="normalize.css"></style>
<style src="@/styles/index.scss" lang="scss">
</style>

<template>
  <div class="b-application">
    <div class="b-layout">
      <div class="b-layout__top">
        <tabs :items="tabs" @activated="handleTabActivated"/>
      </div>

      <div :class="classes.body">
        <div class="b-layout__tab b-layout__tab--timer">
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

        <div class="b-layout__tab b-layout__tab--stats">
          Stats
        </div>

        <div class="b-layout__tab b-layout__tab--settings">
          Settings
        </div>
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

  const TABS_TIMER = 'timer';
  const TABS_STATS = 'stats';
  const TABS_SETTINGS = 'settings';

  const TABS = [
    { key: TABS_TIMER, text: 'Timer' },
    { key: TABS_STATS, text: 'Stats' },
    { key: TABS_SETTINGS, text: 'Settings' },
  ];

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
        tabs: TABS,
        tab: TABS_TIMER,
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

      classes() {
        return {
          body: {
            'b-layout__body': true,
            'b-layout__body--timer': this.tab === TABS_TIMER,
            'b-layout__body--stats': this.tab === TABS_STATS,
            'b-layout__body--settings': this.tab === TABS_SETTINGS,
          },
        };
      },
    },

    mounted() {
      this.focus.start();
      this.focus.on('tick', this.saveState);
    },

    methods: {
      handleTabActivated(value) {
        this.tab = value;
      },

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
