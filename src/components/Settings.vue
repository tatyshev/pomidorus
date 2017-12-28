<template>
  <div class="b-settings">
    <div class="b-settings__field">
      <div class="b-settings__label">Target</div>
      <div class="b-settings__control">
        <slider
          v-model="focus.options.target"
          :min="0"
          :max="50"
          :interval="1"
          :formatter="(v) => `${v} pomirorus`"
          :height="3"
          :stop-propagation="true"
          tooltip="hover"
        />
      </div>
    </div>

    <div class="b-settings__field">
      <div class="b-settings__label">Work interval</div>
      <div class="b-settings__control">
        <slider
          v-model="focus.options.durations[DEFAULT_TYPE]"
          :min="minutes(1)"
          :max="minutes(60)"
          :interval="minutes(1)"
          :formatter="(v) => `${v / 1000 / 60} minutes`"
          :height="3"
          :stop-propagation="true"
          tooltip="hover"
        />
      </div>
    </div>

    <div class="b-settings__field">
      <div class="b-settings__label">Short break</div>
      <div class="b-settings__control">
        <slider
          v-model="focus.options.durations[SHORT_TYPE]"
          :min="minutes(1)"
          :max="minutes(60)"
          :interval="minutes(1)"
          :formatter="(v) => `${v / 1000 / 60} minutes`"
          :height="3"
          :stop-propagation="true"
          tooltip="hover"
        />
      </div>
    </div>

    <div class="b-settings__field">
      <div class="b-settings__label">Long break</div>
      <div class="b-settings__control">
        <slider
          v-model="focus.options.durations[LONG_TYPE]"
          :min="minutes(1)"
          :max="minutes(60)"
          :interval="minutes(1)"
          :formatter="(v) => `${v / 1000 / 60} minutes`"
          :height="3"
          :stop-propagation="true"
          tooltip="hover"
        />
      </div>
    </div>

    <div class="b-settings__field">
      <div class="b-settings__label">Long break after</div>
      <div class="b-settings__control">
        <slider
          v-model="focus.options.longAfter"
          :min="0"
          :max="50"
          :interval="1"
          :formatter="(v) => `${v} pomirorus`"
          :height="3"
          :stop-propagation="true"
          tooltip="hover"
        />
      </div>
    </div>

    <div class="b-settings__field">
      <div class="b-settings__label">Auto-start timer</div>
      <div class="b-settings__control">
        <toggle
          v-model="focus.options.auto"
          :height="20"
          :width="45"
          :css-colors="true"
        />
        <!-- <input type="checkbox" v-model="focus.options.auto"> -->
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable no-underscore-dangle */

  import Toggle from 'vue-js-toggle-button/src/Button';
  import Slider from 'vue-slider-component';
  import Focus, { DEFAULT_TYPE, LONG_TYPE, SHORT_TYPE } from '@/lib';
  import { minutes } from '@/lib/utils';

  export default {
    name: 'settings',

    components: {
      Toggle,
      Slider,
    },

    props: {
      focus: {
        type: Focus,
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
        const sliders = this.$el.querySelectorAll('.vue-slider-component');

        sliders.forEach((item) => {
          if (item.__vue__) item.__vue__.refresh();
        });
      },
    },
  };
</script>
