<template>
  <div class="b-themes">
    <select v-model="internal" @input="input">
      <option value="">Default</option>
      <option value="solarized-light">Solarized light</option>
      <option value="solarized-dark">Solarized dark</option>
    </select>
  </div>
</template>

<script>
  export default {
    name: 'themes',

    props: {
      value: {
        type: null,
        default: null,
      },
    },

    data: () => ({
      internal: null,
    }),

    watch: {
      value: {
        immediate: true,
        handler(value) {
          this.internal = value || '';
        },
      },
      internal: {
        immediate: true,
        handler() {
          this.themify();
        },
      },
    },

    methods: {
      themify() {
        if (this.internal == null) return;
        document.body.setAttribute('class', `theme-${this.internal}`);
      },

      input(event) {
        this.$emit('input', event.target.value);
      },
    },
  };
</script>
