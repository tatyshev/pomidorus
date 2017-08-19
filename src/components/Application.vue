<style src="normalize.css"></style>
<style src="@/styles/index.scss" lang="scss">
</style>

<template>
  <div class="b-applicaiton">
    <div class="b-focus">
      <div class="b-focus__body">
        <clock :value="focus.elapsed"/>
        <div class="b-focus__controls">
          <play :focus="focus"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Focus from '@/lib';
  import Clock from './Clock';
  import Play from './Play';

  export default {
    name: 'application',

    components: {
      Clock,
      Play,
    },

    data: () => ({
      focus: new Focus(),
    }),

    computed: {
    },

    methods: {
    },

    mounted() {
      this.focus.start();
    },
  };
</script>
