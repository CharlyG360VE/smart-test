import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ILoginForm } from '../../interface/login-form.interface';
import { LoginService } from '../../services/login.service';
import { IPayloadLogin } from '../../interface/user.interface';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        MatCardModule,
        MatButtonModule,
        MatProgressBarModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export default class LoginComponent {

    private _fb = inject(NonNullableFormBuilder)
    private _loginSvc = inject(LoginService)
    private _snackBar = inject(MatSnackBar)
    private _router = inject(Router)

    form = this._fb.group<ILoginForm>(
        {
            email: this._fb.control(
                undefined,
                {
                    validators: [
                        Validators.required,
                        Validators.maxLength(50),
                        Validators.minLength(4),
                        Validators.email,
                        Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)
                    ]
                }
            ),
            password: this._fb.control(
                undefined,
                {
                    validators: [
                        Validators.required,
                        Validators.maxLength(15),
                        Validators.minLength(6)
                    ]
                }
            )
        }
    )

    ngOnInit() {
    }

    login() {
        if (this.form.invalid)
            return;
        const PAYLOAD: IPayloadLogin = {
            email: this.form.controls.email.value!,
            password: this.form.controls.password.value!
        }
        const RESPONSE = this._loginSvc.login(PAYLOAD)

        if (RESPONSE) {
            this._snackBar.open('Inicio de sesión exitoso.', 'Ok');
            this._router.navigate(['/'])
        } else {
            this._snackBar.open('Correo y/o contraseña invalida.', 'Ok');
        }
    }

}
