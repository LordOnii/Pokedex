import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from './pokemon.interface';



// ICI FAIRE UN CACHE POUR L'API

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private http = inject(HttpClient);
  private baseUrl = 'https://pokeapi.co/api/v2';

  private regionDexMapping: Record<string, number> = {
    'Kanto': 1,
    'Johto': 2,
    'Hoenn': 3,
    'Sinnoh': 4,
    'Unys': 5,
    'Kalos': 6,
    'Alola': 7,
    'Galar': 8,
    'Paldea': 9
  };

  getPokemonByRegion(region: string) {
    const regionId: number = this.regionDexMapping[region];

    if (!regionId) {
      throw new Error(`Invalid region: ${region}`)
    } 

    const url: string = `${this.baseUrl}/generation/${regionId}`;
    return this.http.get<{ pokemon_species: { name: string, url: string }[] }>(url);
  }

  getPokemonDetails(name: string) {
    return this.http.get<Pokemon>(`${this.baseUrl}/pokemon/${name}`);
  }
}