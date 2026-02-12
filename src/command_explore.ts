import type { State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]) {
  if (args.length === 0) {
    console.log("Usage: explore <location-area-name>");
    return;
  }

  const locationName = args[0];
  console.log(`Exploring ${locationName}...`);

  try {
    const location = await state.pokeAPI.fetchLocation(locationName);
    
    if (location.pokemon_encounters.length === 0) {
      console.log("Found no Pokemon.");
      return;
    }

    console.log("Found Pokemon:");
    location.pokemon_encounters.forEach((encounter) => {
      console.log(` - ${encounter.pokemon.name}`);
    });
  } catch (err) {
    console.error(`Error exploring ${locationName}:`, err);
  }
}
