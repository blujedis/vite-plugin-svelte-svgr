<script lang="ts">
	import grogu_path from './grogu.svg?raw';
	import grogu_url from './grogu.svg?url';
	import Grogu from './grogu.svg?component';
</script>

<div class="wrapper">
	<h1>Vite-Plugin-Svelte-Svgr using SvelteKit</h1>
	<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

	<div class="icons-wrapper">
		<h3>SVG Optimized I Am</h3>
		<div class="icons">
			<div>
				<p>SVG Raw Element</p>
				<div class="icon goldenrod">
					{@html grogu_path}
				</div>
			</div>

			<div>
				<p>SVG Url Path</p>
				<div class="icon">
					<img src={grogu_url} alt="grogu" />
				</div>
			</div>

			<div>
				<p>SVG Component</p>
				<div class="icon cornflower">
					<Grogu />
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.wrapper {
		padding: 8px 18px;
	}
	.icons {
		display: flex;
		max-width: 450px;
		flex-direction: row;
		border: solid 1px #efefef;
	}
	.icons > div {
		width: 150px;
		text-align: center;
	}
	.icons > div p {
		padding-bottom: 0;
		margin-bottom: 0;
	}
	.icons .icon {
		text-align: center;
	}
	.cornflower {
		color: cornflowerblue;
	}
	.goldenrod {
		color: goldenrod;
	}
</style>
