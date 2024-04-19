import { Routes } from '@angular/router';
import { ALIMENTS_ROUTES } from './domains/aliments-management/helpers/aliments-routes.helper';
import { eAppRoutes } from './_core/_enums/app-routes.enum';
import { AUTH_GUARD } from './_core/_guards/auth.guard';
import { NO_AUTH_GUARD } from './_core/_guards/no-auth.guard';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: eAppRoutes.ALIMENT
    },
    {
        path: '',
        loadComponent: (async () => await import('./domains/layout/components/layout/layout.component')),
        canActivate: [AUTH_GUARD],
        children: [
            ...ALIMENTS_ROUTES
        ]
    },
    {
        path: eAppRoutes.LOGIN,
        canActivate: [NO_AUTH_GUARD],
        loadComponent: (async () => await import('./domains/user/components/login/login.component')),
    }
];
