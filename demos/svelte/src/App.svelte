<script>
    import { useDateInput as useDateInputLegacy } from '../../../index.js';
    import { useDateInput } from '../../../index-refactoring.js';
	export let name;
	let valueLegacy = '';
	let value = '';
    let rDate;
	  let {
		prevValue,
		handleInput: handleInputLegacy,
		} = useDateInputLegacy();
    let {
        handleInput,
    } = useDateInput();
      $: {
    		valueLegacy = handleInputLegacy(valueLegacy);
    		value = handleInput(value);
    	}
</script>

<main>
	<h1>Svelte {name}!</h1>
	<label>
	    Current Version:
	    <input
                  type="text"
                  pattern="[0-9]*"
                  inputmode="numeric"
                  class="text"
                  placeholder="tt.mm.jjjj"
                  bind:this={rDate}
                  bind:value={valueLegacy} />
	</label>

	<label>
    	    Next Version:
    	    <input
                      type="text"
                      pattern="[0-9]*"
                      inputmode="numeric"
                      class="text"
                      placeholder="tt.mm.jjjj"
                      bind:this={rDate}
                      bind:value={value} />
    	</label>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
