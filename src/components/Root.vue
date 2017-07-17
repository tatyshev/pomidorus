<template>
  <div class="b-root">
    State is: <b ref="state">{{ state }}</b> <br/>
    <button ref="button" @click="increment()">+1</button>
  </div>
</template>

<script>
  export default {
    name: 'Root',
    data: () => ({ state: 0 }),
    methods: {
      increment() { this.state += 1; },
    },
  };
</script>
