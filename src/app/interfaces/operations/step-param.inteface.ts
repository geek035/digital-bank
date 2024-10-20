export interface IStepParam {
    identifier: CardIdentifier,
    value: CardProductValue | CardProgramTypeValue,
};

export type CardIdentifier = "Product" | "ProgramType";

export type CardProductValue = "Дебетовая карта" | "Кредитная карта";

export type CardProgramTypeValue = "МИР" | "Visa" | "Mastercard" | "Maestro";

