import { inject, Injectable } from '@angular/core';
import { IJsonData } from '../_interfaces/init-data.interface';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    private _httpClient = inject(HttpClient)
    private static initData?: IJsonData;

    get data() {
        return DataService.initData;
    }

    constructor() { }

    async loadData() {
        const data$ = lastValueFrom(
            this._httpClient.get<IJsonData>('assets/data/data.json')
        )

        DataService.initData = await data$
    }

}
