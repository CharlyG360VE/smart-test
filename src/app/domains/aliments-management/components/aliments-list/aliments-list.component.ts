import { Component, inject, signal } from '@angular/core';
import { LoginService } from '../../../user/services/login.service';
import { IUser } from '../../../user/interface/user.interface';
import { eRole } from '../../../../_core/_enums/role.enum';
import { MatDialog } from '@angular/material/dialog';
import { eMagicNumbers } from '../../../../_core/_enums/magic-numbers.enum';
import { AlimentFormComponent } from '../aliment-form/aliment-form.component';
import { Subscription } from 'rxjs';
import { IAliment } from '../../interface/aliments.interface';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AlimentService } from '../../services/aliment.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-aliments-list',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule
    ],
    templateUrl: './aliments-list.component.html',
    styleUrl: './aliments-list.component.scss'
})
export default class AlimentsListComponent {

    private _loginSvc = inject(LoginService)
    private _dialog = inject(MatDialog)
    private _user!: IUser
    private _alimentSvc = inject(AlimentService)
    private _snackBar = inject(MatSnackBar)
    private selectedItems: IAliment[] = []

    isAdmin = false
    items = signal<IAliment[]>([])

    ngOnInit() {
        this.setUserAndCheckAdmin()
        this.getData()
    }

    create() {
        this.openAlimentForm();
    }

    edit(id: number) {
        this.openAlimentForm(id);
    }

    remove(id: number) {
        this._alimentSvc.remove(id);
        this._snackBar.open('Alimento eliminado exitosamente.', 'Ok');
        this.getData();
    }

    addToCart(item: IAliment) {
        const AVAILABLE_QUANTITY = this.getCalculateQuantity(item)

        if (AVAILABLE_QUANTITY > 0) {
            this._alimentSvc.addToCart(item)
            this.selectedItems = [...this._alimentSvc.itemsCart()]
        }
    }

    removeCart(item: IAliment) {
        this._alimentSvc.removeToCart(item)
        this.selectedItems = [...this._alimentSvc.itemsCart()]
    }

    getCalculateQuantity(item: IAliment) {
        const ITEM_FIND = this.selectedItems.find(i => i.id === item.id)

        return ITEM_FIND ? item.quantity - ITEM_FIND.quantity : item.quantity
    }    

    private setUserAndCheckAdmin() {
        this._user = this._loginSvc.userLogin!
        this.isAdmin = this._user.role === eRole.ADMIN
    }

    private getData() {
        this.items.set(this._alimentSvc.aliments!)
    }

    private openAlimentForm(id = eMagicNumbers.N_0) {
        const DIALOG_REF = this._dialog.open(AlimentFormComponent, {
            minWidth: '50vw',
            maxWidth: '80vw',
            enterAnimationDuration: eMagicNumbers.N_500,
            exitAnimationDuration: eMagicNumbers.N_100,
            disableClose: true,
            data: id
        });
        const SUBSCRIPTION$ = new Subscription()

        SUBSCRIPTION$.add(
            DIALOG_REF
                .afterClosed()
                .subscribe(
                    {
                        next: isSave => {
                            if (isSave)
                                this.getData();

                            SUBSCRIPTION$.unsubscribe()
                        }
                    }
                )
        )
    }

}
