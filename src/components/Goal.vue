<template>
  <svg class="b-goal" :viewBox="viewBox">
  </svg>
</template>

<script>
  import * as d3 from 'd3';

  export default {
    name: 'goal',

    props: {
      goal: {
        type: Number,
        required: true,
      },
      progress: {
        type: Number,
        required: true,
      },
    },

    data: () => ({
      width: 500,
      height: 500,
      weight: 10,
    }),

    mounted() {
      const self = this;

      this.svg = d3.select(this.$el);
      this.pie = d3.pie().sort(null).value(d => d.value);

      this.arcTween = function (angle) { // eslint-disable-line func-names
        const i = d3.interpolate(this.$angle, angle);
        this.$angle = i(0);
        return t => self.arc(i(t));
      };

      this.root = this.svg
        .append('g')
        .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`);

      this.arc = d3.arc()
        .outerRadius(this.radius)
        .innerRadius(this.radius - this.weight)
        .padAngle(0.03);

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
        const progress = this.progress;
        const goal = progress >= this.goal ? progress + 1 : this.goal;
        const items = new Array(goal).fill();

        return items.map((item, index) => {
          let color = '#3c4352';

          if (index < progress) {
            color = index >= this.goal ? '#51a4f5' : '#f55e51';
          }

          return {
            value: 1,
            color,
          };
        });
      },
    },

    watch: {
      values(v) {
        const all = this.root
          .selectAll('path')
          .data(this.pie(v));

        const recent = all
          .enter()
          .append('path')
          .style('fill', 'transparent')
          .each(function (d) { this.$angle = d; }); // eslint-disable-line func-names

        all
          .transition()
          .duration(200)
          .attrTween('d', this.arcTween)
          .style('fill', d => d.data.color);

        recent
          .transition()
          .delay(200)
          .duration(400)
          .attrTween('d', this.arcTween)
          .style('fill', d => d.data.color);
      },
    },
  };
</script>

