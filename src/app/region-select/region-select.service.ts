import { Injectable, signal} from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
  export class RegionService {
    selectedRegion = signal<string>('Kanto');
  }