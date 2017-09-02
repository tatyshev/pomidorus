<template>
  <svg class="b-process" :viewBox="viewBox">
  </svg>
</template>

<script>
  import * as d3 from 'd3';

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
      foreground: String,
      background: String,
    },

    data: () => ({
      width: 500,
      height: 500,
      weight: 3,
    }),

    mounted() {
      const self = this;

      this.arcTween = function (angle) { // eslint-disable-line func-names
        const i = d3.interpolate(this.$angle, angle);
        this.$angle = i(0);
        return t => self.arc(i(t));
      };

      this.svg = d3
        .select(this.$el);

      this.root = this.svg
        .append('g')
        .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`);

      this.pie = d3
        .pie()
        .sort(null)
        .value(d => d.value);

      this.arc = d3.arc()
        .outerRadius(this.radius)
        .innerRadius(this.radius - this.weight)
        .padAngle(0.01)
        .cornerRadius(this.weight);

      this.root
        .selectAll('path')
        .data(this.pie(this.values))
        .enter()
          .append('path')
          .attr('d', this.arc)
          .style('fill', d => d.data.color)
          .each(function (d) { this.$angle = d; }); // eslint-disable-line func-names
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
          {
            value: this.value,
            color: this.foreground || '#39b6ea',
          },
          {
            value: (this.max - this.value) || 1,
            color: this.background || '#4f5560',
          },
        ];
      },
    },

    watch: {
      values(v) {
        this.root
          .selectAll('path')
          .data(this.pie(v))
          .transition()
          .duration(200)
          .attrTween('d', this.arcTween)
          .style('fill', d => d.data.color);
      },
    },
  };
</script>

