<template>
  <div class="b-heatmap">
  </div>
</template>

<script>
  import { select } from 'd3-selection';
  import { scaleLinear } from 'd3-scale';
  import humanize from 'humanize-duration';
  import { array, days, dayMonth } from '@/lib/utils';

  const DAYS_LIMIT = 30;

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
        const heats = array(DAYS_LIMIT).map((_, i) => i);

        return heats.map((i) => {
          const day = dayMonth(now - days(i));
          const values = this.stats[day] || { completed: 0, time: 0, target: 0 };

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
        .html(this.title);
    },

    watch: {
      values() {
        this.update();
      },
    },

    methods: {
      title(d) {
        let result = `
          <div class="b-heatmap__day">${d.day}</div>
        `;

        if (d.completed !== 0) {
          result += `
            <div class="b-heatmap__pomodoros"><b>${d.completed}</b>/${d.target} pomidorus</div>
          `;
        }

        if (d.time !== 0) {
          result += `
            <div class="b-heatmap__time">${humanize(d.time)}</div>
          `;
        }

        return result;
      },

      update() {
        this.heatmap
          .selectAll('.b-heatmap__box')
          .data(this.values)
          .style('background-color', d => this.color(d.completed));


        this.heatmap
          .selectAll('.b-heatmap__title')
          .data(this.values)
          .html(this.title);
      },
    },
  };
</script>
