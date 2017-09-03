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
        <clock :elapsed="focus.elapsed" :paused="focus.isPaused" :pauses="focus.pauses"/>
        <process :value="focus.interval" :max="focus.duration"/>
        <target :goal="focus.target" :completed="focus.completed.length"/>
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

    data: () => ({
      focus: new Focus(),
    }),

    mounted() {
      this.focus.start();
    },
  };
</script>
