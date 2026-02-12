import type { State } from "./state.js";

export async function commandInspect(state: State, ...args: string[]) {
  if (args.length === 0) {
    console.log("Usage: inspect <pokemon-name>");
    return;
  }

  const pokemonName = args[0].toLowerCase();

  // Check if pokemon is in pokedex
  const pokemon = state.pokedex[pokemonName];
  
  if (!pokemon) {
    console.log("you have not caught that pokemon");
    return;
  }

  // Display pokemon details
  console.log(`Name: ${pokemon.name}`);
  console.log(`Height: ${pokemon.height}`);
  console.log(`Weight: ${pokemon.weight}`);
  console.log("Stats:");
  pokemon.stats.forEach((stat: any) => {
    console.log(`  -${stat.stat.name}: ${stat.base_stat}`);
  });
  console.log("Types:");
  pokemon.types.forEach((type: any) => {
    console.log(`  - ${type.type.name}`);
  });
}
