import { Component, Input } from '@angular/core';
import { Pokemon } from '../pokemon.interface';
import { PokemonTypeComponent } from '../pokemon-type/pokemon-type.component';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [PokemonTypeComponent],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.css'
})
export class PokemonCardComponent {
  @Input() pokemon!: Pokemon

  public getFormattedId(id: number) {
    return "#" + id.toString().padStart(3, '0');
  }

  public getFormattedName(name: string) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
}
