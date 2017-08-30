<template>
  <div class="b-controls">
    <button class="b-controls__button">
      Play
    </button>

    <button class="b-controls__button">
      Reset
    </button>
  </div>
</template>

<script>
  import Focus from '../lib/index';
  import Icon from './Icon';

  export default {
    components: {
      Icon,
    },

    props: {
      focus: {
        type: Focus,
        required: true,
      },
    },
  };
</script>
