export interface IStepParam {
    identifier: CardIdentifier | AccountIdentifier,
    value: CardProductValue | CardProgramTypeValue | AccountType | AccountCurrency,
};

export type CardIdentifier = "Product" | "ProgramType";

export type CardProductValue = "Дебетовая карта" | "Кредитная карта";

export type CardProgramTypeValue = "МИР" | "Visa" | "Mastercard" | "Maestro";

export type AccountIdentifier = 'AccountType' | 'Currency';

export type AccountType = 'Текущий счет' | 'Накопительный счет';

export type AccountCurrency = 'Российский рубль' | "Доллар США" |"Евро" | "Китайский Юань";

