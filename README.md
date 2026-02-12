# Pokedex TypeScript REPL

A fully functional command-line Pokedex built with TypeScript, featuring an interactive REPL (Read-Eval-Print Loop) interface and intelligent caching system.

## 🎮 Features

- **Interactive REPL Interface** - Navigate through the Pokemon world with intuitive commands
- **Smart Caching System** - Automatically caches API responses with 5-minute TTL and automatic cleanup
- **Pokemon Catching** - Catch Pokemon with probability based on their base experience
- **Location Exploration** - Explore different areas and discover wild Pokemon
- **Pokedex Management** - Keep track of all your caught Pokemon
- **Detailed Pokemon Info** - Inspect caught Pokemon to view their stats, types, height, and weight
- **Type Safety** - Built with TypeScript for robust code and better developer experience

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/MajdRiyad/pokedex-ts.git
cd pokedex-ts
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

4. Start the REPL:
```bash
npm run dev
```

## 📝 Commands

| Command | Description | Usage |
|---------|-------------|-------|
| `help` | Display all available commands | `help` |
| `map` | Show the next 20 location areas | `map` |
| `mapb` | Show the previous 20 location areas | `mapb` |
| `explore <area>` | Explore a location area and see Pokemon | `explore pastoria-city-area` |
| `catch <pokemon>` | Attempt to catch a Pokemon | `catch pikachu` |
| `inspect <pokemon>` | View details of a caught Pokemon | `inspect pikachu` |
| `exit` | Exit the Pokedex | `exit` |

## 💡 Usage Examples

### Exploring Locations
```
Pokedex > map
canalave-city-area
eterna-city-area
pastoria-city-area
...

Pokedex > explore pastoria-city-area
Exploring pastoria-city-area...
Found Pokemon:
 - tentacool
 - tentacruel
 - magikarp
 - gyarados
```

### Catching Pokemon
```
Pokedex > catch pikachu
Throwing a Pokeball at pikachu...
pikachu escaped!

Pokedex > catch pikachu
Throwing a Pokeball at pikachu...
pikachu was caught!
```

### Inspecting Pokemon
```
Pokedex > inspect pikachu
Name: pikachu
Height: 4
Weight: 60
Stats:
  -hp: 35
  -attack: 55
  -defense: 40
  -special-attack: 50
  -special-defense: 50
  -speed: 90
Types:
  - electric
```

## 🛠️ Technologies Used

- **TypeScript** - Type-safe JavaScript
- **Node.js** - Runtime environment
- **PokeAPI** - Pokemon data source
- **Vitest** - Testing framework
- **Readline** - Interactive CLI interface

## 🏗️ Project Structure

```
pokedex-ts/
├── src/
│   ├── command_catch.ts      # Catch command implementation
│   ├── command_exit.ts       # Exit command implementation
│   ├── command_explore.ts    # Explore command implementation
│   ├── command_help.ts       # Help command implementation
│   ├── command_inspect.ts    # Inspect command implementation
│   ├── command_map.ts        # Map command implementation
│   ├── command_mapb.ts       # Map back command implementation
│   ├── main.ts              # Entry point
│   ├── pokeapi.ts           # PokeAPI wrapper with caching
│   ├── pokecache.ts         # Caching system
│   ├── pokecache.test.ts    # Cache tests
│   ├── repl.ts              # REPL implementation
│   ├── repl.test.ts         # REPL tests
│   └── state.ts             # State management
├── package.json
├── tsconfig.json
└── README.md
```

## 🧪 Testing

Run the test suite:
```bash
npm test
```

All tests are passing:
- ✅ REPL tests (2 tests)
- ✅ Cache tests (5 tests)
- ✅ Total: 14 tests passing

## ⚡ How It Works

### Caching System
The Pokedex implements an intelligent caching layer that:
- Stores API responses for 5 minutes (configurable)
- Automatically cleans up expired entries
- Dramatically improves performance on repeated queries
- Uses URLss as cache keys for precise matching

### Catch Probability
Pokemon catch rates are calculated based on base experience:
```typescript
const catchRate = Math.max(0.2, 1 - (base_experience / 300));
```
- Lower experience Pokemon are easier to catch
- Legendary Pokemon have a minimum 20% catch rate
- Creates authentic Pokemon catching experience

## 🎯 Future Enhancements

Potential features to add:
- [ ] Pokemon battles system
- [ ] Level up and evolution mechanics
- [ ] Persistent storage (save/load Pokedex)
- [ ] Different types of Pokeballs
- [ ] Random wild Pokemon encounters
- [ ] Party system (6 active Pokemon)
- [ ] Colored terminal output
- [ ] Pokemon stats comparison

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- [PokeAPI](https://pokeapi.co/) - The RESTful Pokemon API
- Inspired by the original Pokemon games

## 👨‍💻 Author

**Majd Riyad**
- GitHub: [@MajdRiyad](https://github.com/MajdRiyad)

---

Made with ❤️ and TypeScript
