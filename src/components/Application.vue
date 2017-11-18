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
          <timer :focus="focus"/>
        </div>

        <div class="b-layout__tab b-layout__tab--stats">
        </div>

        <div class="b-layout__tab b-layout__tab--settings" ref="settingsTab">
          <settings :focus="focus" :settings="settings" ref="settings"/>
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
  import Timer from './Timer';
  import Settings from './Settings';

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
      Timer,
      Settings,
      Target,
      Controls,
      Tabs,
      Process,
      Clock,
    },

    data() {
      return {
        focus: new Focus(this.takeState()),
        settings: {},
        tabs: TABS,
        tab: TABS_TIMER,
      };
    },

    computed: {
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

      this.$refs.settingsTab.addEventListener('transitionend', this.handleTransition, { passive: true });
    },

    destroyed() {
      this.$refs.settingsTab.removeEventListener('transitionend', this.handleTransition, { passive: true });
    },

    methods: {
      handleTabActivated(value) {
        this.tab = value;
      },

      handleTransition() {
        this.$refs.settings.refresh();
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
