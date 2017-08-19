<template>
  <svg class="b-inline-svg" v-bind="props" v-html="inner"></svg>
</template>

<script>
  const ctx = require.context('!svg-inline-loader?removeSVGTagAttrs=false!svgo-loader!@/assets', true, /.svg$/);
  const loadSvg = src => ctx(`./${src}`);
  const parser = new DOMParser();

  export default {
    name: 'inline-svg',

    props: {
      height: true,
      width: true,
      src: {
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
        const svg = loadSvg(this.src);
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
    },
  };
</script>
