import type { State } from "./state.js";

export async function commandMap(state: State) {
  try {
    const data = await state.pokeAPI.fetchLocations(state.nextLocationsURL);
    state.nextLocationsURL = data.next ?? undefined;
    state.prevLocationsURL = data.previous ?? undefined;

    data.results.forEach((loc) => console.log(loc.name));
  } catch (err) {
    console.error("Error fetching locations:", err);
  }
}
