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
        const stats = this.stats || {};

        return heats.map((i) => {
          const day = dayMonth(now - days(i));
          const values = stats[day] || { completed: 0, time: 0, target: 0 };

          return { day, ...values };
        });
      },

      completedMax() {
        const values = this.values.map(d => d.completed);
        return Math.max(...values);
      },

      opacity() {
        return scaleLinear()
          .range([0, 1])
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
        .html(this.content);
    },

    watch: {
      values() {
        this.update();
      },
    },

    methods: {
      content(d) {
        return this.title(d) + this.level(d);
      },

      title(d) {
        let result = `<div class="b-heatmap__day">${d.day}</div>`;

        if (d.completed !== 0) {
          result += `<div class="b-heatmap__pomodoros"><b>${d.completed}</b>/${d.target} pomidorus</div>`;
        }

        if (d.time !== 0) {
          result += `<div class="b-heatmap__time">${humanize(d.time)}</div>`;
        }

        return `<div class="b-heatmap__title">${result}</div>`;
      },

      level(d) {
        const opacity = `opacity: ${this.opacity(d.completed)}`;
        return `<div class="b-heatmap__level" style="${opacity}"></div>`;
      },

      update() {
        this.heatmap
          .selectAll('.b-heatmap__box')
          .data(this.values)
          .html(this.content);
      },
    },
  };
</script>
