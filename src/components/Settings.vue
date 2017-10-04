<template>
  <div class="b-settings">
    <slider v-model="focus.state.target" :min="0" :max="20" :interval="1" ref="slider"/>
  </div>
</template>

<script>
  import Slider from 'vue-slider-component';
  import Focus from '../lib/index';

  export default {
    name: 'settings',

    components: {
      Slider,
    },

    props: {
      settings: {
        default: () => ({}),
      },
      focus: {
        type: Focus,
        required: true,
      },
    },

    methods: {
      refresh() {
        this.$refs.slider.refresh();
      },
    },
  };
</script>
