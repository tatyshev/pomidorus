<style src="@/styles/index.scss" lang="scss">
</style>

<template>
  <div class="b-root">
    <div class="b-root__header">
      <tabs :siema="siema" v-if="siema"/>
    </div>

    <div class="b-root__body">
      <div class="b-root__sections" ref="sections">
        <div class="b-root__section">
          <div class="b-root__wrapper b-root__wrapper--timer">
            <timer :focus="focus"/>
            <controls :focus="focus"/>
          </div>
        </div>

        <div class="b-root__section">
          <div class="b-root__wrapper b-root__wrapper--stats">
            Stats
          </div>
        </div>

        <div class="b-root__section">
          <div class="b-root__wrapper b-root__wrapper--settings">
            <settings :focus="focus" ref="settings"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Focus from '@/lib';
  import Siema from 'siema';
  import Timer from './Timer';
  import Controls from './Controls';
  import Settings from './Settings';
  import Tabs from './Tabs';

  export default {
    name: 'root',

    components: {
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
        focus: new Focus(this.takeState()),
        siema: null,
      };
    },

    mounted() {
      this.focus.start();

      this.siema = new Siema({
        selector: this.$refs.sections,
        draggable: true,
        stopPropagation: false,
      });

      this.$watch('focus.state', this.saveState, { deep: true });
    },

    methods: {
      saveState() {
        const state = this.focus.toJson();
        localStorage.setItem('state', JSON.stringify(state));
      },

      takeState() {
        const state = localStorage.getItem('state');
        if (state) return JSON.parse(state);
        return {};
      },
    },
  };
</script>
