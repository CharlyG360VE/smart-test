import { FormControl } from "@angular/forms";

export interface IAliment {
    id: number;
    name: string;
    description?: string;
    price: number;
    quantity: number;
    totalPrice?: number
}

export interface IAlimentForm {
    name: FormControl<string | undefined>
    description: FormControl<string | undefined>
    price: FormControl<number | undefined>
    quantity: FormControl<number | undefined>
}
