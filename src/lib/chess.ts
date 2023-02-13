export interface Game extends Object {
  id: number;
  blancs: string | null;
  noirs: string | null;
  lien: string;
  résultat: 0 | 0.5 | 1;
  created_at: string;
}
