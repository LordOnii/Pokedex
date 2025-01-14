import { Component, inject, signal } from "@angular/core";
import { RegionService } from "./region-select.service";


@Component({
  selector: "app-region-select",
  standalone: true,
  templateUrl: './region-select.component.html',
   styleUrl: "./region-select.component.css",
})
export class RegionSelectComponent {

  regionService = inject(RegionService)

  public getRegions() {
    return ["Kanto", "Johto", "Sinnoh"];
  }

  public onRegionChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.regionService.selectedRegion.set(select.value);
  }
}
