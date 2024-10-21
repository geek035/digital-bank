export interface IStepParam {
    identifier: CardIdentifier | AccountIdentifier,
    value: CardProductValue | CardProgramTypeValue | AccountType | AccountCurrency | AmountValue | AccountFullName,
};

export type CardIdentifier = "Product" | "ProgramType";

export type CardProductValue = "Дебетовая карта" | "Кредитная карта";

export type CardProgramTypeValue = "МИР" | "Visa" | "Mastercard" | "Maestro";

export type AccountIdentifier = 'AccountType' | 'Currency' | 'Account' | 'Amount' | 'SourceAccount' | 'ReceiverAccount' | 'Comment';

export type AccountType = 'Текущий счет' | 'Накопительный счет';

export type AccountCurrency = 'Российский рубль' | "Доллар США" |"Евро" | "Китайский Юань";

export type AccountFullName = string; 

export type AmountValue = string;