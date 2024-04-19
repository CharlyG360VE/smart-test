import { PreloadAllModules, provideRouter, withComponentInputBinding, withPreloading } from "@angular/router";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from "../../app.routes";
import { provideHttpClient } from "@angular/common/http";
import { APP_INITIALIZER } from "@angular/core";
import { DataService } from "../_services/data.service";

const init = (settingsProvider: DataService) => () => settingsProvider.loadData()

export const APP_CONFIG = () => [
    provideRouter(
        routes,
        withComponentInputBinding(),
        withPreloading(PreloadAllModules)
    ),
    provideHttpClient(),
    provideAnimationsAsync(),
    {
        provide: APP_INITIALIZER,
        useFactory: init,
        deps: [DataService],
        multi: true
    }
]