<script lang="ts">
	import { getStarSign, isValidDate, parseDateParts } from '$lib/starSign';

	let day = $state('');
	let month = $state('');
	let year = $state('');
	let result = $state('');

	function check() {
		const parts = parseDateParts(day, month, year);
		if (!parts) {
			result = 'Please enter a valid day, month, and year.';
			return;
		}

		if (!isValidDate(parts.month, parts.day, parts.year)) {
			result = 'That date is not valid. Check your day, month, and year.';
			return;
		}

		const sign = getStarSign(parts.month, parts.day);
		result = `Your star sign is ${sign}.`;
	}
</script>

<svelte:head>
	<title>Horoscope Checker</title>
</svelte:head>

<main class="app">
	<h1>Horoscope Checker</h1>
	<p class="intro">Enter your date of birth to find your star sign.</p>

	<form
		class="form"
		onsubmit={(e) => {
			e.preventDefault();
			check();
		}}
	>
		<div class="fields">
			<label>
				<span>Day</span>
				<input type="text" inputmode="numeric" placeholder="e.g. 15" bind:value={day} />
			</label>
			<label>
				<span>Month</span>
				<input type="text" inputmode="numeric" placeholder="e.g. 6" bind:value={month} />
			</label>
			<label>
				<span>Year</span>
				<input type="text" inputmode="numeric" placeholder="e.g. 1990" bind:value={year} />
			</label>
		</div>

		<button type="submit">Check</button>
	</form>

	<p class="result" aria-live="polite">{result}</p>
</main>

<style>
	.app {
		box-sizing: border-box;
		max-width: 28rem;
		margin: 0 auto;
		padding: 2.5rem 1.25rem;
		font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
		color: #1a1a2e;
	}

	h1 {
		margin: 0 0 0.5rem;
		font-size: 1.75rem;
		font-weight: 700;
	}

	.intro {
		margin: 0 0 1.5rem;
		color: #4a4a68;
		line-height: 1.5;
	}

	.form {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.fields {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.75rem;
	}

	label {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		font-size: 0.875rem;
		font-weight: 600;
	}

	label span {
		color: #4a4a68;
	}

	input {
		padding: 0.6rem 0.75rem;
		border: 1px solid #c8c8d8;
		border-radius: 0.5rem;
		font-size: 1rem;
	}

	input:focus {
		outline: 2px solid #6c63ff;
		outline-offset: 1px;
		border-color: #6c63ff;
	}

	button {
		padding: 0.7rem 1rem;
		border: none;
		border-radius: 0.5rem;
		background: #6c63ff;
		color: #fff;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
	}

	button:hover {
		background: #5a52e0;
	}

	.result {
		min-height: 1.5rem;
		margin: 1.5rem 0 0;
		padding: 1rem;
		border-radius: 0.5rem;
		background: #f4f4fa;
		font-size: 1.05rem;
		font-weight: 600;
		line-height: 1.5;
	}
</style>
