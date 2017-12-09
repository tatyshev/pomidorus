<template>
  <svg class="b-target" :viewBox="viewBox">
  </svg>
</template>

<script>
  import * as d3 from 'd3';

  export default {
    name: 'target',

    props: {
      goal: {
        type: Number,
        required: true,
      },
      completed: {
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
        .padAngle(0.03)
        .cornerRadius(this.weight);

      this.root
        .selectAll('path')
        .data(this.pie(this.values))
        .enter()
        .append('path')
        .attr('d', this.arc)
        .classed('b-target__item', true)
        .classed('b-target__item--finished', d => d.data.finished)
        .classed('b-target__item--extra', d => d.data.extra)
        .each(function (d) { this.$angle = d; }); // eslint-disable-line func-names

      document.addEventListener('visibilitychange', () => {
        setTimeout(() => this.update(), 300);
      });
    },

    computed: {
      viewBox() {
        return `0 0 ${this.width} ${this.height}`;
      },

      radius() {
        return Math.min(this.width, this.height) / 2;
      },

      values() {
        const { completed } = this;
        const goal = completed >= this.goal ? completed + 1 : this.goal;
        const items = new Array(goal).fill();

        return items.map((item, index) => {
          const finished = index < completed;
          const extra = finished && (index >= this.goal);

          return {
            value: 1,
            finished,
            extra,
          };
        });
      },
    },

    watch: {
      values() {
        this.update();
      },
    },

    methods: {
      update() {
        const all = this.root
          .selectAll('path')
          .data(this.pie(this.values))
          .classed('b-target__item', true)
          .classed('b-target__item--finished', d => d.data.finished)
          .classed('b-target__item--extra', d => d.data.extra);

        const recent = all
          .enter()
          .append('path')
          .style('fill', 'transparent')
          .each(function (d) { this.$angle = d; }); // eslint-disable-line func-names

        all
          .transition()
          .duration(200)
          .attrTween('d', this.arcTween);

        all.exit().remove();

        recent
          .transition()
          .delay(200)
          .duration(400)
          .attrTween('d', this.arcTween);
      },
    },
  };
</script>

