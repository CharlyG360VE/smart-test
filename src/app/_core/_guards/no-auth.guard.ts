import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../../domains/user/services/login.service';

export const NO_AUTH_GUARD: CanActivateFn = (route, state) => {
    const LOGIN_SERVICE = inject(LoginService)
    const ROUTER = inject(Router)
    const LOGGED_IN = LOGIN_SERVICE.userLogin !== null

    if (LOGGED_IN)
        ROUTER.navigate(['/']);

    return !LOGGED_IN
};
