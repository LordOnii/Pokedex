import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-type',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-type.component.html',
  styleUrl: './pokemon-type.component.css'
})
export class PokemonTypeComponent {
  @Input() type!: string;
  private defaultColor: string = "#000000";
  private defaultTextColor: string = '#ffffff'

  private colorsTable: Record<string, string> = {
    'normal':'#a0a3a0',
    'fighting':'#ff8100',
    'flying':'#82baf0',
    'poison':'#713f71',
    'ground':'#92501b',
    'rock':'#b1ab82',
    'bug':'#92a312',
    'ghost':'#b1ab82',
    'steel':'#60a3b9',
    'fire':'#e72324',
    'water':'#2481f0',
    'grass':'#3da324',
    'electric':'#fac100',
    'psychic':'#f03f7a',
    'ice':'#3cd9ff',
    'dragon':'#4f60e2',
    'dark':'#4f3f3d',
    'fairy':'#f071f0',
  };

  public getColor(): string {
    return this.colorsTable[this.type] !== undefined ? this.colorsTable[this.type] : this.defaultColor;
  }

  public getText(): string {
    return this.type.toUpperCase();
  }

  public getTextColor(): string {
    return this.defaultTextColor;
  }
}
