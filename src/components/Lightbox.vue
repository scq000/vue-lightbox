<template>
    <div class="gallery">
      <div class="thumbnail" v-for="n in 4">
          <a :href="'static/' + n + '.jpg'"><img :src="'static/' + n + '.jpg'"></a>
      </div>
    </div>
</template>

<script>
const $ = require('jquery');
require('../../lib/jquery.lightbox.js');
require('../../lib/jquery.lightbox.css');

export default {
    name: 'lightbox',
    props: {
     options: {
       type: Object,
       required: false
     }
    },
    mounted() {
        $(this.$el).find('a').lightbox(this.options);
    },
};
</script>

<style lang="less" scoped>

.gallery {
    display: flex;
    align-items: center;
    height: 200px;
    overflow: hidden;

    a {
        text-decoration: none;

        img {
            display: block;
            max-width: 100%;
            height: auto;
            vertical-align: middle;

            &:hover, &:focus {
                cursor: zoom-in;
            }
        }
    }

}


</style>
