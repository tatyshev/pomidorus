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
        </carousel>
      </div>
    </div>
  </div>
</template>

<script>
  import Visibility from 'visibilityjs';
  import { Carousel, Slide } from 'vue-carousel';
  import Focus from '@/lib';
  import Timer from './Timer';
  import Controls from './Controls';
  import Settings from './Settings';
  import Tabs from './Tabs';

  export default {
    name: 'root',

    components: {
      Carousel,
      Slide,
      Controls,
      Settings,
      Timer,
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

    mounted() {
      this.focus.start();
      this.$watch('focus.state', () => this.focus.save(), { deep: true });

      Visibility.change((e, state) => {
        this.visible = state === 'visible';
        this.activeTab = 0;
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
    },
  };
</script>
