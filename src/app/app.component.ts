import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { RegionSelectComponent } from "./region-select/region-select.component";
import { PokemonCardsComponent } from "./pokemon-cards/pokemon-cards.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    RouterOutlet, 
    RegionSelectComponent, 
    PokemonCardsComponent
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {}
