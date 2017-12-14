<template>
  <div class="b-settings">
    <div class="b-settings__field">
      <div class="b-settings__label">Work</div>
      <div class="b-settings__control">
        <slider
          ref="default"
          v-model="options.durations[DEFAULT_TYPE]"
          :min="minutes(1)"
          :max="minutes(60)"
          :interval="minutes(1)"
          :formatter="(v) => v / 1000 / 60"
          :height="3"
          :dotSize="12"
          :stop-propagation="true"
        />
      </div>
    </div>

    <div class="b-settings__field">
      <div class="b-settings__label">Break</div>
      <div class="b-settings__control">
        <slider
          ref="short"
          v-model="options.durations[SHORT_TYPE]"
          :min="minutes(1)"
          :max="minutes(60)"
          :interval="minutes(1)"
          :formatter="(v) => v / 1000 / 60"
          :height="3"
          :dotSize="12"
          :stop-propagation="true"
        />
      </div>
    </div>

    <div class="b-settings__field">
      <div class="b-settings__label">Long break</div>
      <div class="b-settings__control">
        <slider
          ref="long"
          v-model="options.durations[LONG_TYPE]"
          :min="minutes(1)"
          :max="minutes(60)"
          :interval="minutes(1)"
          :formatter="(v) => v / 1000 / 60"
          :height="3"
          :dotSize="12"
          :stop-propagation="true"
        />
      </div>
    </div>

    <div class="b-settings__field">
      <div class="b-settings__label">Target</div>
      <div class="b-settings__control">
        <slider
          ref="slider"
          v-model="options.target"
          :min="0"
          :max="20"
          :interval="1"
          :height="3"
          :dotSize="12"
          :stop-propagation="true"
        />
      </div>
    </div>

    <div class="b-settings__field">
      <div class="b-settings__label">Long after</div>
      <div class="b-settings__control">
        <slider
          ref="longAfter"
          v-model="options.longAfter"
          :min="0"
          :max="20"
          :interval="1"
          :height="3"
          :dotSize="12"
          :stop-propagation="true"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import Slider from 'vue-slider-component';
  import { DEFAULT_TYPE, LONG_TYPE, SHORT_TYPE, minutes } from '@/lib';

  export default {
    name: 'settings',

    components: {
      Slider,
    },

    props: {
      options: {
        type: Object,
        required: true,
      },
    },

    data: () => ({
      DEFAULT_TYPE,
      LONG_TYPE,
      SHORT_TYPE,
    }),

    mounted() {
      document.addEventListener('transitionend', this.refresh, { passive: true });
    },

    destroyed() {
      document.removeEventListener('transitionend', this.refresh);
    },

    methods: {
      minutes,

      refresh() {
        this.$refs.default.refresh();
        this.$refs.short.refresh();
        this.$refs.long.refresh();
        this.$refs.slider.refresh();
        this.$refs.longAfter.refresh();
      },
    },
  };
</script>
