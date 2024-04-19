import { computed, inject, Injectable, signal } from '@angular/core';
import { DataService } from '../../../_core/_services/data.service';
import { IAliment } from '../interface/aliments.interface';
import { eMagicNumbers } from '../../../_core/_enums/magic-numbers.enum';

@Injectable({
    providedIn: 'root'
})
export class AlimentService {

    private _dataSvc = inject(DataService)

    get aliments() {
        return this._dataSvc.data?.aliments
    }

    cart = signal<IAliment[]>([])
    total = computed(() => {
        const ITEMS = this.itemsCart()

        return ITEMS.reduce((total, product) => total + (product.totalPrice ?? 0), 0)
    })
    itemsCart = computed(() => {
        const ITEMS = this.cart()
        const GROUP_ITEMS: IAliment[] = []

        for (const item of ITEMS) {
            const ITEM_FILTER = ITEMS.filter(i => i.id === item.id)
            const INDEX = GROUP_ITEMS.findIndex(i => i.id === item.id)

            if (INDEX !== -eMagicNumbers.N_1)
                GROUP_ITEMS[INDEX] = {
                    ...GROUP_ITEMS[INDEX],
                    quantity: ITEM_FILTER.length,
                    totalPrice: ITEM_FILTER.reduce((total, i) => total + (i.price ?? 0), 0)
                }
            else
                GROUP_ITEMS.push(
                    {
                        id: item.id,
                        name: item.name,
                        quantity: eMagicNumbers.N_1,
                        price: item.price,
                        totalPrice: ITEM_FILTER.reduce((total, i) => total + (i.price ?? 0), 0)
                    }
                );
        }

        return GROUP_ITEMS
    })

    constructor() { }

    addToCart(aliment: IAliment) {
        this.cart.update(state => [...state, aliment])
        console.log(this.cart());
    }

    removeToCart(aliment: IAliment) {
        const ITEMS = this.cart()

        if (ITEMS.length > 0) {
            const INDEX = ITEMS.findIndex(item => item.id === aliment.id)

            if (INDEX !== -eMagicNumbers.N_1)
                this.cart.update(state => {
                    let elements = [...state]

                    elements.splice(INDEX, eMagicNumbers.N_1)

                    return elements
                });
        }
    }

    getAlimentById(id: number) {
        return this.aliments?.find(a => a.id === id)
    }

    save(payload: IAliment) {
        this._dataSvc.data?.aliments.push(payload)
    }

    update(payload: IAliment) {
        if (this._dataSvc.data!.aliments.length > 0)
            for (let aliment of this._dataSvc.data!.aliments!) {
                if (aliment.id === payload.id) {
                    aliment.name = payload.name
                    aliment.description = payload.description
                    aliment.price = payload.price
                    aliment.quantity = payload.quantity

                    break;
                }
            }
    }

    updateSell(payload: IAliment) {
        if (this._dataSvc.data!.aliments.length > 0)
            for (let aliment of this._dataSvc.data!.aliments!) {
                if (aliment.id === payload.id) {
                    aliment.quantity = aliment.quantity - payload.quantity

                    break;
                }
            }
    }

    remove(id: number) {
        const INDEX = this._dataSvc.data!.aliments.findIndex(a => a.id === id)

        if (INDEX !== -eMagicNumbers.N_1)
            this._dataSvc.data!.aliments.splice(INDEX, 1);
    }

}
