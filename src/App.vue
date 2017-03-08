<template>
	<div id="app">
		<h1>Without Options</h1>
		<lightbox>
			<div class="thumbnail" v-for="n in 4">
				<a :href="'static/' + n + '.jpg'"><img :src="'static/' + n + '.jpg'"></a>
			</div>
		</lightbox>
		<h1>With Option</h1>
		<lightbox :options="{ margin: 20, nav: false, blur: true, minSize: 480 }">
			<div class="thumbnail" v-for="n in 4">
				<a :href="'static/' + n + '.jpg'"><img :src="'static/' + n + '.jpg'"></a>
			</div>
		</lightbox>
	</div>
</template>

<script>
import Lightbox from './components/Lightbox';

export default {
    name: 'app',
    data() {
        return {

        };
    },
    components: {
        Lightbox,
    },
};
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}
</style>
