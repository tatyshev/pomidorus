<template>
  <svg class="b-target" :viewBox="viewBox">
  </svg>
</template>

<script>
  import { select } from 'd3-selection';
  import { interpolate } from 'd3-interpolate';
  import { pie, arc } from 'd3-shape';

  export default {
    name: 'target',

    props: {
      goal: {
        type: Number,
        required: true,
      },
      completed: {
        type: Array,
        default: () => [],
      },
    },

    data: () => ({
      width: 500,
      height: 500,
      weight: 4,
    }),

    mounted() {
      const self = this;

      this.svg = select(this.$el);
      this.pie = pie().sort(null).value(d => d.value);

      this.arcTween = function (angle) { // eslint-disable-line func-names
        const i = interpolate(this.$angle, angle);
        this.$angle = i(0);
        return t => self.arc(i(t));
      };

      this.root = this.svg
        .append('g')
        .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`);

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
        .classed('b-target__item', true)
        .classed('b-target__item--finished', d => d.data.finished)
        .classed('b-target__item--extra', d => d.data.extra)
        .classed('b-target__item--skipped', d => d.data.skipped)
        .each(function (d) { this.$angle = d; }); // eslint-disable-line func-names

      document.addEventListener('visibilitychange', this.update);
    },

    computed: {
      amount() {
        return this.completed.length;
      },

      viewBox() {
        return `0 0 ${this.width} ${this.height}`;
      },

      radius() {
        return Math.min(this.width, this.height) / 2;
      },

      values() {
        const { amount, completed } = this;
        const goal = amount >= this.goal ? amount : this.goal;
        const items = new Array(goal).fill();

        return items.map((item, index) => {
          const finished = index < amount;
          const extra = finished && (index >= this.goal);
          const skipped = !!completed[index] && completed[index].skipped;

          return {
            value: 1,
            finished,
            extra,
            skipped,
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
          .classed('b-target__item--extra', d => d.data.extra)
          .classed('b-target__item--skipped', d => d.data.skipped);

        const recent = all
          .enter()
          .append('path')
          .classed('b-target__item', true)
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

