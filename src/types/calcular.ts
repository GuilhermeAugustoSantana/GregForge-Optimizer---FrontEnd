export interface CalcularRequest {
  metaLingotes: number;
  mineriosSelecionados: string[];
}

export interface CalcularResponse {
  metaLingotes: number;
  desperdicio_mb: number;
  "minérios necessários": Record<string, number>;
}

export interface MineriosItem {
  id: string;
  nome: string;
  mb: number;
}
