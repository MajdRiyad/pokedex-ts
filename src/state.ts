import { createInterface, type Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapBack } from "./command_mapb.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { PokeAPI, type Pokemon } from "./pokeapi.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
  rl: Interface;
  commands: Record<string, CLICommand>;
  pokeAPI: PokeAPI;
  pokedex: Record<string, Pokemon>;
  nextLocationsURL?: string;
  prevLocationsURL?: string;
};

export function initState(): State {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  const pokeAPI = new PokeAPI();
  const pokedex: Record<string, Pokemon> = {};

const commands: Record<string, CLICommand> = {
  exit: { name: "exit", description: "Exit the Pokedex", callback: commandExit },
  help: { name: "help", description: "Displays a help message", callback: commandHelp },
  map: { name: "map", description: "Show next 20 locations", callback: commandMap },
  mapb: { name: "mapb", description: "Show previous 20 locations", callback: commandMapBack },
  explore: { name: "explore", description: "Explore a location area", callback: commandExplore },
  catch: { name: "catch", description: "Catch a pokemon", callback: commandCatch },
  inspect: { name: "inspect", description: "Inspect a caught pokemon", callback: commandInspect },
};

  return { rl, commands, pokeAPI, pokedex };
}
