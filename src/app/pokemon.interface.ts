export interface Pokemon {
    id: number;
    name: string;
    types: [{
      slot: number,
      type: {
        name: string
      }
    }];
    sprites: {
      front_default: string;
    };
  }