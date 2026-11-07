export interface CalcularRequest {
  metaLingotes: number;
  mineriosSelecionados: MineriosItem[];
}

export interface CalcularResponse {
  metaLingotes: number;
  desperdício_mb: number;
  "minérios necessários": Record<string, number>;
}

export interface MineriosItem {
  id: string;
  nome: string;
  mb: number;
}
