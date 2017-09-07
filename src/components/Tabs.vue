<template>
  <ul class="b-tabs">
    <li class="b-tabs__item"
        v-for="item in items"
        :key="item.key"
        :class="active(item.key)"
        @click="activate(item.key)">
      {{ item.text }}
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'tabs',

    props: ['items'],

    data: () => ({
      current: null,
    }),

    created() {
      this.current = this.items[0].key;
    },

    methods: {
      active(value) {
        return this.current === value ? 'b-tabs__item--active' : undefined;
      },

      activate(value) {
        this.current = value;
        this.$emit('activated', value);
      },
    },
  };
</script>
