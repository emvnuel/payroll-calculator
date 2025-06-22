"use client";

import { useReducer, useEffect } from "react";
import { Input } from "./input";

interface MoneyInputProps {
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  id?: string;
}

const moneyFormatter = Intl.NumberFormat("pt-BR", {
  currency: "BRL",
  currencyDisplay: "symbol",
  currencySign: "standard",
  style: "currency",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function MoneyInput({ value, onChange, placeholder, id }: MoneyInputProps) {
  const moneyFormat = (v: number) => moneyFormatter.format(v);

  // Always format the value prop
  const formattedValue = value ? moneyFormat(value) : "";

  const [inputValue, setInputValue] = useReducer((_: string, next: string) => {
    const digits = next.replace(/\D/g, "");
    return moneyFormatter.format(Number(digits) / 100);
  }, formattedValue);

  // Sync inputValue with value prop
  useEffect(() => {
    setInputValue(formattedValue);
  }, [formattedValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setInputValue(inputValue);
    const digits = inputValue.replace(/\D/g, "");
    const numericValue = Number(digits) / 100;
    onChange(numericValue);
  };

  return (
    <Input
      type="text"
      inputMode="decimal"
      id={id}
      placeholder={placeholder || "R$ 0,00"}
      value={inputValue}
      onChange={handleChange}
      className="text-base py-2 px-3"
    />
  );
} 