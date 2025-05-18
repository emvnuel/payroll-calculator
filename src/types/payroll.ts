// Types for the payroll calculation history
export interface PayrollHistoryEntry {
  id: string;
  timestamp: number;
  formData: {
    grossPay: number;
    numberOfDependents: number;
    fixedAmountDiscount: number;
    percentangeDiscount: number;
    simplifiedDeduction: boolean;
  };
  result: {
    grossPay: number;
    netPay: number;
    totalDiscount: number;
    discounts: {
      name: string;
      value: number;
    }[];
  };
}
