import { FormControl } from "@angular/forms";

export interface ILoginForm {
    email: FormControl<string | undefined>;
    password: FormControl<string | undefined>;
}