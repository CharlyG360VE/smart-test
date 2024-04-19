import { Routes } from "@angular/router";
import { eAppRoutes } from "../../../_core/_enums/app-routes.enum";

export const ALIMENTS_ROUTES: Routes = [
    {
        path: eAppRoutes.ALIMENT,
        loadComponent: (async () => await import('../components/aliments-list/aliments-list.component'))
    }
]