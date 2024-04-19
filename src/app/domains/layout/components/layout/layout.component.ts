import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { AlimentService } from '../../../aliments-management/services/aliment.service';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../../user/services/login.service';
import { eRole } from '../../../../_core/_enums/role.enum';

@Component({
    selector: 'app-layout',
    standalone: true,
    imports: [
        CommonModule,
        MatToolbarModule,
        RouterOutlet,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatDividerModule
    ],
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.scss'
})
export default class LayoutComponent {

    private _router = inject(Router)
    private _alimentSvc = inject(AlimentService)
    private _loginSvc = inject(LoginService)

    isAdmin = false

    get cart() {
        return this._alimentSvc.itemsCart()
    }

    get total() {
        return this._alimentSvc.total()
    }

    ngOnInit() {
        this.setUserAndCheckAdmin()
    }

    logout() {
        window.localStorage.clear()
        this._router.navigate(['/iniciar-sesion']);
    }

    private setUserAndCheckAdmin() {
        const USER = this._loginSvc.userLogin!
        this.isAdmin = USER.role === eRole.ADMIN
    }

}
