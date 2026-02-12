import { Cache } from "./pokecache.js";

export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
};

export type Location = {
  id: number;
  name: string;
  region: { name: string; url: string };
  game_indices: any[];
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
  }[];
};

export type Pokemon = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  stats: any[];
  types: any[];
};

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private cache: Cache;

  constructor() {
    // Cache entries expire after 5 minutes (300000 ms)
    this.cache = new Cache(300000);
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL ?? `${PokeAPI.baseURL}/location-area/`;
    
    // Check cache first
    const cached = this.cache.get<ShallowLocations>(url);
    if (cached) {
      console.log(`[Cache Hit] Loading from cache: ${url}`);
      return cached;
    }

    // Fetch from API if not in cache
    console.log(`[Cache Miss] Fetching from API: ${url}`);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch locations: ${res.status}`);
    const data = await res.json();
    
    // Add to cache
    this.cache.add(url, data);
    
    return data;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
    
    // Check cache first
    const cached = this.cache.get<Location>(url);
    if (cached) {
      console.log(`[Cache Hit] Loading from cache: ${url}`);
      return cached;
    }

    // Fetch from API if not in cache
    console.log(`[Cache Miss] Fetching from API: ${url}`);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch location ${locationName}`);
    const data = await res.json();
    
    // Add to cache
    this.cache.add(url, data);
    
    return data;
  }

  async fetchPokemon(pokemonName: string): Promise<Pokemon> {
    const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;
    
    // Check cache first
    const cached = this.cache.get<Pokemon>(url);
    if (cached) {
      console.log(`[Cache Hit] Loading from cache: ${url}`);
      return cached;
    }

    // Fetch from API if not in cache
    console.log(`[Cache Miss] Fetching from API: ${url}`);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch pokemon ${pokemonName}`);
    const data = await res.json();
    
    // Add to cache
    this.cache.add(url, data);
    
    return data;
  }
}
