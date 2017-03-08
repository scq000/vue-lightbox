<template>
	<div id="app">
		<lightbox></lightbox>
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
