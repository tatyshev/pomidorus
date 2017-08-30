<style src="normalize.css"></style>
<style src="@/styles/index.scss" lang="scss">
</style>

<template>
  <div class="b-application">
    <div class="b-layout">
      <div class="b-layout__section">
        <tabs/>
      </div>

      <div class="b-layout__body">
      </div>

      <div class="b-layout__section">
      </div>
    </div>
  </div>
</template>

<script>
  import Focus from '@/lib';
  import Clock from './Clock';
  import Play from './Play';
  import Tabs from './Tabs';

  export default {
    name: 'application',

    components: {
      Tabs,
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
