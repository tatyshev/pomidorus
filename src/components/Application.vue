<style src="normalize.css"></style>
<style src="@/styles/index.scss" lang="scss">
</style>

<template>
  <div class="b-applicaiton">
    <div class="b-focus">
      <process v-bind="process"/>
      <goal :goal="focus.goal" :progress="focus.progress"/>

      <div class="b-focus__body">
        <div class="b-focus__clock" v-if="clock">{{ clock }}</div>
        <div class="b-focus__controls">
          <button class="b-focus__button" @click="action()">{{ actionText }} {{ focus.progress }} </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Focus from '@/lib/focus';
  import Process from '@/components/Process';
  import Goal from '@/components/Goal';

  export default {
    name: 'application',
    components: { Process, Goal },
    data: () => ({
      focus: new Focus(),
    }),

    methods: {
      action() {
        if (this.focus.isPaused) {
          return this.focus.unpause();
        }

        if (this.focus.isActive) {
          return this.focus.pause();
        }

        return this.focus.rotate();
      },
    },

    computed: {
      latest() {
        return this.focus.latest;
      },

      clock() {
        return this.latest && this.latest.clock;
      },

      process() {
        return {
          max: this.latest ? this.latest.duration : 1,
          value: this.latest ? this.latest.state : 0,
          foreground: this.focus.isBreak ? '#bfe67c' : undefined,
        };
      },

      actionText() {
        if (this.focus.isPaused) {
          return 'unpause';
        }

        if (this.focus.isActive) {
          return 'pause';
        }

        return this.focus.isEmpty ? 'start' : 'next';
      },
    },
  };
</script>
