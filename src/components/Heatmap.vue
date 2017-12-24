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
        const heats = array(30).map((_, i) => i);

        return heats.map((i) => {
          const day = dayMonthYear(now - days(i));
          const values = this.stats[day] || { completed: 0, time: 0 };

          return { day, ...values };
        });
      },

      completedMax() {
        const values = this.values.map(d => d.completed);
        return Math.max(...values);
      },

      color() {
        return scaleLinear()
          .range(['#4c525f', '#97ce28'])
          .domain([0, this.completedMax]);
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
        .style('background-color', d => this.color(d.completed))
        .append('div')
        .classed('b-heatmap__title', true)
        .text(d => d.completed);
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
          .style('background-color', d => this.color(d.completed));


        this.heatmap
          .selectAll('.b-heatmap__title')
          .data(this.values)
          .text(d => d.completed);
      },
    },
  };
</script>
