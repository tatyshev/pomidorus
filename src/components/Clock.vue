<template>
  <div class="b-clock">
    <div class="b-clock__minutes">{{ minutes | zeroify }}</div>
    <div class="b-clock__seconds">{{ seconds | zeroify }}</div>
  </div>
</template>

<script>
  export default {
    props: {
      elapsed: Number,
    },

    filters: {
      zeroify(value) {
        return (`0${value}`).slice(-2);
      },
    },

    computed: {
      left() {
        return Math.floor(this.elapsed / 1000);
      },

      seconds() {
        return this.left % 60;
      },

      minutes() {
        return (this.left - this.seconds) / 60;
      },
    },
  };
</script>
