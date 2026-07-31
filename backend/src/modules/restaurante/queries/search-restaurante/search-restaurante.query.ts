import { SearchRestauranteDto } from '../../dto/search-restaurante.dto';

export class SearchRestauranteQuery {
  constructor(public readonly filters: SearchRestauranteDto) {}
}
