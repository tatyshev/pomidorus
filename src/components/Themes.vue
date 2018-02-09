<template>
  <div class="b-themes">
    {{ themes[internal] }}

    <select v-model="internal" @input="input">
      <option v-for="(value, key) in themes" :key="key" :value="key">
        {{ value }}
      </option>
    </select>
  </div>
</template>

<script>
  const THEMES = {
    '': 'Default',
    'solarized-dark': 'Solarized dark',
    'solarized-light': 'Solarized light',
    'one-dark': 'One dark',
    'one-light': 'One light',
    monokai: 'Monokai',
    darcula: 'Darcula',
  };

  export default {
    name: 'themes',

    props: {
      value: {
        type: null,
        default: null,
      },
    },

    data: () => ({
      themes: THEMES,
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
        if (this.internal == null || this.internal === '') {
          document.body.setAttribute('class', '');
        } else {
          document.body.setAttribute('class', `theme-${this.internal}`);
        }
      },

      input(event) {
        this.$emit('input', event.target.value);
      },
    },
  };
</script>
