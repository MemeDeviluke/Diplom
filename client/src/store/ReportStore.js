import {makeAutoObservable} from "mobx";

export  default  class ReportStore {
    constructor() {
        this._reports = []
        this._page = 1
        this._totalCount = 0
        this._limit = 3
        makeAutoObservable(this)
    }

    setReports(reports) {
        this._reports = reports
    }

    setPage(page){
        this._page = page
    }

    setTotalCount(totalcount) {
        this._totalCount = totalcount
    }


    get reports(){
        return this._reports
    }

    get page(){
        return this._page
    }

    get totalCount(){
        return this._totalCount
    }

    get limit(){
        return this._limit
    }

}