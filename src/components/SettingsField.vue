<template>
  <div class="b-settings__field">
    <div class="b-settings__label">{{ label }}</div>
    <div class="b-settings__control" ref="control">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  const SLIDER_SELECTOR = '.vue-slider-component';

  export default {
    name: 'settings-field',

    props: {
      label: String,
    },

    mounted() {
      const { control } = this.$refs;

      if (this.hasSlider()) {
        control.addEventListener('mousedown', this.conceal);
        control.addEventListener('touchstart', this.conceal);
      }
    },

    methods: {
      hasSlider() {
        if (this.$el.querySelector(SLIDER_SELECTOR) !== null) return true;
        if (this.$el.querySelector('select') !== null) return true;

        return false;
      },

      conceal(event) {
        event.stopPropagation();
      },
    },
  };
</script>
