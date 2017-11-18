<template>
  <div class="b-settings">
    <slider
      ref="slider"
      v-model="focus.state.target"
      :min="0"
      :max="20"
      :interval="1"
      :height="3"
      :dotSize="12"
    />
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
