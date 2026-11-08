export interface CalcularRequest {
  metaLingotes: number;
  mineriosSelecionados: MinerioItem[];
}

export interface CalcularResponse {
  metaLingotes: number;
  desperdicio_mb: number;
  "minérios necessários": Record<string, number>;
}

export interface MinerioItem {
  id: string;
  nome: string;
  mb: number;
}
