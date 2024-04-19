import { inject, Injectable } from '@angular/core';
import { DataService } from '../../../_core/_services/data.service';
import { IPayloadLogin, IUser } from '../interface/user.interface';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    private _dataSvc = inject(DataService)

    private get users() {
        return this._dataSvc.data?.users
    }

    get userLogin(): IUser | null {
        return window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')!) : null
    }

    constructor() { }
    
    login(payload: IPayloadLogin) {
        const USER_FIND = this.users?.find(u => u.email === payload.email && u.password === payload.password)
        
        if (USER_FIND) {
            window.localStorage.setItem('user', JSON.stringify(USER_FIND))

            return true;
        } else {
            return false;
        }
        
    }


}
