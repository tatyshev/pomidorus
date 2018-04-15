<style src="@/styles/index.scss" lang="scss">
</style>

<template>
  <div class="b-application" :class="classes.root">
    <div class="b-application__middle">
      <div class="b-application__header">
        <tabs :current="activeTab" @go-to="i => $refs.carousel.goToPage(i)"/>
      </div>

      <div class="b-application__body">
        <carousel
          ref="carousel"
          class="b-application__sections"
          :perPage="1"
          :paginationEnabled="false"
          :easing="'cubic-bezier(0.165, 0.84, 0.44, 1)'"
          @pageChange="handlePageChange"
        >
          <slide class="b-application__section">
            <div class="b-application__wrapper b-application__wrapper--timer">
              <timer :focus="focus" v-if="visible"/>
              <controls :focus="focus" v-if="visible"/>
            </div>
          </slide>

          <slide class="b-application__section">
            <div class="b-application__wrapper b-application__wrapper--settings">
              <settings
                ref="settings"
                :focus="focus"
              />
            </div>
          </slide>

          <slide class="b-application__section">
            <div class="b-application__wrapper b-application__wrapper--about">
              <about/>
            </div>
          </slide>
        </carousel>
      </div>
    </div>
  </div>
</template>

<script>
  import Visibility from 'visibilityjs';
  import humanize from 'humanize-duration';
  import { Carousel, Slide } from 'vue-carousel';
  import Focus from '@/lib';
  import Favicon from '@/lib/favicon';
  import { reachGoal, zeroify } from '@/lib/utils';
  import Timer from './Timer';
  import Controls from './Controls';
  import Settings from './Settings';
  import About from './About';
  import Tabs from './Tabs';

  export default {
    name: 'root',

    components: {
      Carousel,
      Slide,
      Controls,
      Settings,
      Timer,
      About,
      Tabs,
    },

    filters: {
      json(v) {
        return JSON.stringify(v, null, 2);
      },
    },

    data() {
      return {
        visible: true,
        focus: Focus.load(),
        activeTab: 0,
      };
    },

    created() {
      this.favicon = new Favicon();
      this.favicon.attach();
      this.drawFavicon();
    },

    mounted() {
      this.focus.start();

      this.focus.on('finish', ({ type, duration }) => {
        reachGoal(`pomodoro.${type}`, {
          duration: humanize(duration),
        });
      });

      this.focus.on('daily', () => {
        const stats = this.focus.statistics();

        reachGoal('daily', {
          ...stats,
          time: humanize(stats.time),
        });
      });

      this.$watch('focus.state', () => {
        this.focus.save();
        this.drawFavicon();
        this.updateTitle();
      }, { deep: true });

      Visibility.change((e, state) => {
        this.visible = state === 'visible';

        if (this.activeTab !== 0 && this.focus.isActive) {
          this.$refs.carousel.goToPage(0);
        }
      });
    },

    computed: {
      classes() {
        const { isShort, isLong } = this.focus;

        return {
          root: {
            'b-application--break': (isShort || isLong),
            'b-application--short': isShort,
            'b-application--long': isLong,
          },
        };
      },
    },

    methods: {
      handlePageChange(value) {
        this.activeTab = value;
      },

      drawFavicon() {
        let fill = '#97ce28';

        if (this.focus.isWork) fill = '#e4582b';
        if (this.focus.isPaused) fill = '#7683a2';

        this.favicon.draw({
          value: this.focus.interval,
          max: this.focus.duration,
          fill,
        });
      },

      updateTitle() {
        const { elapsed } = this.focus;
        const left = Math.floor(elapsed / 1000);
        const seconds = zeroify(left % 60);
        const minutes = zeroify((left - seconds) / 60);

        if (elapsed > 0) {
          document.title = `${minutes}:${seconds} - Pomidorus`;
        } else {
          document.title = 'Pomidorus';
        }
      },
    },
  };
</script>
