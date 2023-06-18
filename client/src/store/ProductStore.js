import { makeAutoObservable } from "mobx"
export default class ProductStore {
    constructor() {
        this._types = [

        ];

        this._brands = [

        ]

        this._products = [

        ]


        this._page = 1;
        this._totalCount = 0;
        this._limit = 3;

        this._selectedType = {}
        this._selectedBrand = {}
        makeAutoObservable(this)
    }
    setTypes(types) {
        this._types = types
    }
    setBrands(brand) {
        this._brands = brand
    }
    setProducts(product) {
        this._products = product
    }


    setSelectedType(type) {
        this.setPage(1)
        this._selectedType = type
    }
    setSelectedBrand(brand) {
        this.setPage(1)

        this._selectedBrand = brand
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }


    get types() {
        return this._types
    }
    get brands() {
        return this._brands
    }
    get products() {
        return this._products
    }

    get selectedType() {
        return this._selectedType
    }
    get selectedBrand() {
        return this._selectedBrand
    }

    get page() {
        return this._page
    }
    get totalCount() {
        return this._totalCount
    }
    get limit() {
        return this._limit
    }
}