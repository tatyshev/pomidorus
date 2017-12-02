<style src="@/styles/index.scss" lang="scss">
</style>

<template>
  <div class="b-root">

    <div class="slider js_slider b-root__sections" ref="sections">
      <div class="frame js_frame">
        <ul class="slides js_slides">
          <li class="js_slide b-root__section">One</li>
          <li class="js_slide b-root__section">Two</li>
          <li class="js_slide b-root__section">Three</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { lory } from 'lory.js';

  export default {
    name: 'root',

    mounted() {
      lory(this.$refs.sections);
    },
  };
</script>

<style lang="scss">
  .slider {
    .frame {
      width: 100%;
      position: relative;
      font-size: 0;
      line-height: 0;
      overflow: hidden;
      white-space: nowrap;
    }

    .slides {
      width: 100%;
      display: inline-block;
    }

    .js_slide {
      position: relative;
      display: inline-block;
      width: 100%;
      position: relative;
      display: inline-block;
      text-align: center;
      font-size: 15px;
      line-height: 30px;
    }
  }
</style>

