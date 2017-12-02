<style src="@/styles/index.scss" lang="scss">
</style>

<template>
  <div class="b-root">
    <div class="b-root__header">#header</div>
    <div class="b-root__body">

      <div class="b-root__sections" ref="sections">
        <div class="b-root__section">Clock</div>
        <div class="b-root__section">Stats</div>
        <div class="b-root__section">Settings</div>
      </div>

    </div>
  </div>
</template>

<script>
  import Siema from 'siema';

  export default {
    name: 'root',

    mounted() {
      this.siema = new Siema({
        selector: this.$refs.sections,
      });
    },
  };
</script>
