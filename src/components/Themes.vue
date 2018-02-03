<template>
  <div class="b-themes">
    <select v-model="internal">
      <option value="">Default</option>
      <option value="solarized-light">Solarized light</option>
      <option value="solarized-dark">Solarized dark</option>
    </select>
  </div>
</template>

<script>
  export default {
    name: 'themes',

    data: () => ({
      internal: null,
    }),

    watch: {
      internal: {
        immediate: true,
        handler() { this.themify(); },
      },
    },

    methods: {
      themify() {
        if (this.internal == null) return;
        document.body.setAttribute('class', `theme-${this.internal}`);
      },
    },
  };
</script>
