interface CardBase {
  name: string | null;
  type: CardFormType;
}

export type CardFormType = 'One' | 'Two' | 'Three';

export interface CardTypeOne extends CardBase {
  inp1: string | null;
  inp2: string | null;
}

export interface CardTypeTwo extends CardBase {
  inp7: string | null;
}

export interface CardTypeThree extends CardBase {
  inp3: string | null;
}

export type CardValue = CardTypeOne | CardTypeTwo | CardTypeThree;
