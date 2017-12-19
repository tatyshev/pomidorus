<template>
  <div class="b-heatmap">
  </div>
</template>

<script>
  import { select } from 'd3-selection';
  import { scaleLinear } from 'd3-scale';
  import { array, days, dayMonthYear } from '@/lib/utils';

  export default {
    name: 'heatmap',

    props: {
      stats: {
        required: true,
        default: () => ({}),
      },
    },

    computed: {
      values() {
        const now = Date.now();

        return array(42).map((_, i) => {
          const day = dayMonthYear(now - days(i + 1));
          const value = this.stats[day] || 0;
          return { day, value };
        });
      },

      max() {
        const values = this.values.map(x => x.value);
        return Math.max(...values);
      },

      color() {
        return scaleLinear()
          .range(['#d8e6e7', '#218380'])
          .domain([0, this.max]);
      },
    },

    mounted() {
      this.heatmap = select(this.$el);

      this.heatmap
        .selectAll('.b-heatmap__box')
        .data(this.values)
        .enter()
        .append('div')
        .classed('b-heatmap__box', true)
        .style('background-color', d => this.color(d.value));
    },

    watch: {
      values() {
        this.update();
      },
    },

    methods: {
      update() {
        this.heatmap
          .selectAll('.b-heatmap__box')
          .data(this.values)
          .style('background-color', d => this.color(d.value));
      },
    },
  };
</script>
