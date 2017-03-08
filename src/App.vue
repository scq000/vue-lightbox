<template>
	<div id="app">
		<h1>Without Options</h1>
		<lightbox></lightbox>
		<h1>With Option</h1>
		<lightbox :options="{ margin: 20, nav: false, blur: true, minSize: 480 }"></lightbox>
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
