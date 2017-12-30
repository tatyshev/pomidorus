<template>
  <div class="b-settings">
    <div class="b-settings__field">
      <div class="b-settings__label">Daily target</div>
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
          :sync="true"
        />
      </div>
    </div>

    <div class="b-settings__field">
      <div class="b-settings__label">Notifications</div>
      <div class="b-settings__control">
        <toggle
          v-model="focus.options.notifications"
          :height="20"
          :width="45"
          :css-colors="true"
          :sync="true"
        />

        <span class="b-settings__warning" v-if="notifications.status === 'denied'">
          Permissions denied
        </span>

        <span class="b-settings__warning" v-else-if="notifications.status !== 'granted'">
          Requires user permissions
        </span>
      </div>
    </div>

    <div class="b-settings__buttons">
      <button class="b-settings__button" @click="restoreDefault">Restore defaults</button>
      <button class="b-settings__button" @click="resetSession">Reset current session</button>
    </div>
  </div>
</template>

<script>
  /* eslint-disable no-underscore-dangle */
  /* eslint no-restricted-globals: 0 */

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

      notifications: {
        pending: false,
        status: null,
      },
    }),

    mounted() {
      document.addEventListener('transitionend', this.refresh, { passive: true });
      this.$watch('focus.options.notifications', this.notificationPerms);
      this.notifications.status = Notification.permission;
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

      notificationPerms(value) {
        if (!value || this.pending) return;

        this.notifications.pending = true;

        const req = Notification.requestPermission();

        req.then((status) => {
          this.notifications.pending = false;
          this.notifications.status = status;
        });

        req.catch(() => {
          alert(1);
        });
      },

      restoreDefault() {
        if (confirm('Reset settings to default values?')) {
          this.focus.state.options = Focus.state.options;
        }
      },

      resetSession() {
        if (confirm('Today\'s completed pomodoros will be reset.')) {
          this.focus.reset();
        }
      },
    },
  };
</script>
