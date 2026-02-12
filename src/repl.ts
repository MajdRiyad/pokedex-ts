import readline from "readline";
import type { State } from "./state.js";

export function cleanInput(input: string): string[] {
  return input
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
}

export function startREPL(state: State) {
  const { rl, commands } = state;

  rl.prompt();

  rl.on("line", async (input: string) => {
    const words = cleanInput(input);

    if (words.length === 0) {
      rl.prompt();
      return;
    }

    const commandName = words[0];
    const command = commands[commandName];

    if (command) {
      try {
        const args = words.slice(1);
        await command.callback(state, ...args);
      } catch (err) {
        console.error("Error executing command:", err);
      }
    } else {
      console.log("Unknown command.");
    }

    rl.prompt();
  });
}