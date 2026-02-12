import type { State } from "./state.js";

export async function commandMapBack(state: State) {
  if (!state.prevLocationsURL) {
    console.log("You're on the first page");
    return;
  }

  try {
    const data = await state.pokeAPI.fetchLocations(state.prevLocationsURL);
    state.nextLocationsURL = data.next ?? undefined;
    state.prevLocationsURL = data.previous ?? undefined;

    data.results.forEach((loc) => console.log(loc.name));
  } catch (err) {
    console.error("Error fetching previous locations:", err);
  }
}
