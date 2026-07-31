export class SearchRestauranteDto {
  nome?: string;
  categoriaId?: string;
  cidade?: string;
  estado?: string;

  latitude?: number;
  longitude?: number;
  raio?: number;
}
