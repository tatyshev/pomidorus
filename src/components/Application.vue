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
        <process :value="3" :max="10"/>
        <clock :elapsed="focus.elapsed"/>
      </div>

      <div class="b-layout__bottom">
      </div>
    </div>
  </div>
</template>

<script>
  import Focus from '@/lib';
  import Clock from './Clock';
  import Play from './Play';
  import Tabs from './Tabs';
  import Process from './Process';

  export default {
    name: 'application',

    components: {
      Tabs,
      Process,
      Clock,
      Play,
    },

    data: () => ({
      focus: new Focus(),
    }),

    mounted() {
      this.focus.start();
    },
  };
</script>
