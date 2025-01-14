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
    effect(() => {
      const currentRegion = this.regionService.selectedRegion(); // Reactively track the selected region
      this.loadPokemonForRegion(currentRegion);
    });
  }

  private async loadPokemonForRegion(region: string): Promise<void> {
    // Fetch Pokémon species for the selected region
    const response = await firstValueFrom(this.pokemonService.getPokemonByRegion(region));
    
    // Fetch details for each Pokémon species
    const pokemonDetails = await Promise.all(
      response.pokemon_species.map(pokemon =>
        firstValueFrom(this.pokemonService.getPokemonDetails(pokemon.name))
      )
    );

    // Update the signal with the fetched Pokémon list
    this.pokemonList$.set(pokemonDetails);
  }
}
