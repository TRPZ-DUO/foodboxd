export class UpdateRestauranteDto {
  nome?: string;
  descricao?: string | null;
  endereco?: string;
  cidade?: string;
  estado?: string;
  latitude?: number | null;
  longitude?: number | null;
  categoriaId?: string;
}
