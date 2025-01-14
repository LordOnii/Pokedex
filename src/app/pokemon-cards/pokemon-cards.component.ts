import { Component, signal, computed, effect, inject } from '@angular/core';
import { RegionService } from '../region-select/region-select.service';
import { Pokemon } from '../pokemon.interface';
import { PokemonService } from '../pokemon.service';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { PokemonTypeComponent } from '../pokemon-type/pokemon-type.component';

@Component({
  selector: 'app-pokemon-cards',
  standalone: true,
  imports: [CommonModule, PokemonTypeComponent],
  templateUrl: './pokemon-cards.component.html',
  styleUrl: './pokemon-cards.component.css'
})
export class PokemonCardsComponent {
  private regionService = inject(RegionService);
  private pokemonService = inject(PokemonService);

  // Signal to hold the list of Pokémon
  pokemonList$ = signal<Pokemon[]>([]);

  constructor() {
    // Watch for changes in the selected region and trigger Pokémon loading
    effect(async () => {
      const currentRegion = this.regionService.selectedRegion(); // Reactively track the selected region
      await this.loadPokemonForRegion(currentRegion);
      this.sortById();
      console.log(this.pokemonList$());
    });
  }

  private async loadPokemonForRegion(region: string): Promise<void> {
    // Fetch Pokémon species for the selected region
    const response = await firstValueFrom(this.pokemonService.getPokemonByRegion(region));

    // Fetch details for each Pokémon species
    const pokemonDetails: (Pokemon | null)[] = await Promise.all(
      response.pokemon_species.map(async pokemon => {
        return await this.pokemonService.getPokemonDetails(pokemon.name)
      })
    )

    
    const validPokemons: Pokemon[] = pokemonDetails.filter((p): p is Pokemon => p !== null)
    console.log(validPokemons);
    
    // Update the signal with the fetched Pokémon list
    this.pokemonList$.set(validPokemons);
  }

  private sortById(): void {
    const sorted: Pokemon[] = [...this.pokemonList$()].sort((a, b) => a.id - b.id);
    this.pokemonList$.set(sorted)
  }
}
