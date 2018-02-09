<template>
  <svg class="b-process" :viewBox="viewBox">
  </svg>
</template>

<script>
  import { select } from 'd3-selection';
  import { interpolate } from 'd3-interpolate';
  import { pie, arc } from 'd3-shape';

  export default {
    name: 'process',

    props: {
      value: {
        type: Number,
        required: true,
      },
      max: {
        type: Number,
        required: true,
      },
    },

    data: () => ({
      width: 500,
      height: 500,
      weight: 4,
    }),

    mounted() {
      const self = this;

      this.arcTween = function (angle) { // eslint-disable-line func-names
        const i = interpolate(this.$angle, angle);
        this.$angle = i(0);
        return t => self.arc(i(t));
      };

      this.svg = select(this.$el);

      this.root = this.svg
        .append('g')
        .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`);

      this.pie = pie()
        .sort(null)
        .value(d => d);

      this.arc = arc()
        .outerRadius(this.radius)
        .innerRadius(this.radius - this.weight)
        .padAngle(0.03)
        .cornerRadius(this.weight);

      this.root
        .selectAll('path')
        .data(this.pie(this.values))
        .enter()
        .append('path')
        .attr('d', this.arc)
        .classed('b-process__value', d => d.index === 0)
        .classed('b-process__bar', d => d.index !== 0)
        .each(function (d) { this.$angle = d; }); // eslint-disable-line func-names

      document.addEventListener('visibilitychange', this.update);
    },

    computed: {
      viewBox() {
        return `0 0 ${this.width} ${this.height}`;
      },

      radius() {
        return Math.min(this.width, this.height) / 2;
      },

      values() {
        return [
          this.value,
          (this.max - this.value) || 1,
        ];
      },
    },

    watch: {
      values() {
        this.update();
      },
    },

    methods: {
      update() {
        this.root
          .selectAll('path')
          .data(this.pie(this.values))
          .transition()
          .duration(200)
          .attrTween('d', this.arcTween)
          .style('fill', d => d.data.color);
      },
    },
  };
</script>

