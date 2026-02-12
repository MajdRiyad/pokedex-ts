import type { State } from "./state.js";

export async function commandCatch(state: State, ...args: string[]) {
  if (args.length === 0) {
    console.log("Usage: catch <pokemon-name>");
    return;
  }

  const pokemonName = args[0].toLowerCase();

  // Check if already caught
  if (state.pokedex[pokemonName]) {
    console.log(`You have already caught ${pokemonName}!`);
    return;
  }

  console.log(`Throwing a Pokeball at ${pokemonName}...`);

  try {
    const pokemon = await state.pokeAPI.fetchPokemon(pokemonName);

    // Calculate catch rate based on base_experience
    // Higher base_experience = harder to catch
    // Most Pokemon have base_experience between 50-300
    const maxBaseExp = 300;
    const catchRate = Math.max(0.2, 1 - (pokemon.base_experience / maxBaseExp));
    const success = Math.random() < catchRate;

    if (success) {
      console.log(`${pokemonName} was caught!`);
      // Add to pokedex
      state.pokedex[pokemonName] = pokemon;
    } else {
      console.log(`${pokemonName} escaped!`);
    }
  } catch (err) {
    console.error(`Error catching ${pokemonName}:`, err);
  }
}
