<template>
  <svg :class="classes" v-bind="props" v-html="inner"></svg>
</template>

<script>
  const ctx = require.context('!svg-inline-loader?removeSVGTagAttrs=false!svgo-loader!@/assets/icons', true, /.svg$/);
  const loadSvg = name => ctx(`./${name}.svg`);
  const parser = new DOMParser();

  export default {
    name: 'icon',

    props: {
      height: true,
      width: true,
      name: {
        type: String,
        required: true,
      },
    },

    methods: {
      propsOrSvg(name) {
        return this.$props[name] || this.svg.getAttribute(name);
      },
    },

    computed: {
      svg() {
        const svg = loadSvg(this.name);
        const doc = parser.parseFromString(svg, 'text/xml');
        return doc.querySelector('svg');
      },

      props() {
        return {
          xmlns: this.propsOrSvg('xmlns'),
          viewBox: this.propsOrSvg('viewBox'),
          height: this.propsOrSvg('height'),
          width: this.propsOrSvg('width'),
        };
      },

      inner() {
        return this.svg.innerHTML;
      },

      classes() {
        return ['b-icon', `b-icon--${this.name}`];
      },
    },
  };
</script>
