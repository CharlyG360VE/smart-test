import { Component, Inject, inject } from '@angular/core';
import { eMagicNumbers } from '../../../../_core/_enums/magic-numbers.enum';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { IAliment, IAlimentForm } from '../../interface/aliments.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlimentService } from '../../services/aliment.service';

@Component({
    selector: 'app-aliment-form',
    standalone: true,
    imports: [
        MatDialogModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
    ],
    templateUrl: './aliment-form.component.html',
    styleUrl: './aliment-form.component.scss'
})
export class AlimentFormComponent {

    private _id = eMagicNumbers.N_0
    private _fb = inject(NonNullableFormBuilder)
    private _alimentSvc = inject(AlimentService)
    private _snackBar = inject(MatSnackBar)

    form = this._fb.group<IAlimentForm>(
        {
            name: this._fb.control(
                undefined,
                {
                    validators: [Validators.required, Validators.minLength(1)]
                }
            ),
            description: this._fb.control(
                undefined,
                {
                    validators: [Validators.required, Validators.minLength(1)]
                }
            ),
            price: this._fb.control(
                undefined,
                {
                    validators: [Validators.required, Validators.minLength(1)]
                }
            ),
            quantity: this._fb.control(
                undefined,
                {
                    validators: [Validators.required, Validators.minLength(1)]
                }
            ),
        }
    )

    constructor(
        @Inject(MAT_DIALOG_DATA) private data: number,
        private _dialogRef: MatDialogRef<AlimentFormComponent>) { }

    ngOnInit() {
        this._id = this.data

        if (this._id > 0) {
            const RESPONSE = this._alimentSvc.getAlimentById(this._id)

            if (RESPONSE)
                this.form.setValue(
                    {
                        name: RESPONSE.name,
                        description: RESPONSE.description,
                        price: RESPONSE.price,
                        quantity: RESPONSE.quantity,
                    }
                )
        }
    }

    save() {
        if (this.form.invalid)
            return;

        const PAYLOAD: IAliment = {
            id: this._id === 0 ? Date.now() : this._id,
            name: this.form.controls.name.value!,
            description: this.form.controls.description.value!,
            price: this.form.controls.price.value!,
            quantity: this.form.controls.quantity.value!,
        }

        if (this._id === 0) {
            this._alimentSvc.save(PAYLOAD)
            this._dialogRef.close(true)
            this._snackBar.open('Guardado exitoso.', 'Ok');
        } else if (this._id > 0) {
            this._alimentSvc.update(PAYLOAD)
            this._dialogRef.close(true)
            this._snackBar.open('Guardado exitoso.', 'Ok');
        }
    }

}
