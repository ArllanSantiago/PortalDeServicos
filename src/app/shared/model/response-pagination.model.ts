export class ResponsePagination {
    constructor() {
        this.content = []
        this.pageable = {
            sort: {
                sorted: false,
                unsorted: true,
                empty: true
            },
            offset: 0,
            pageNumber: 0,
            pageSize: 0,
            unpaged: false,
            paged: true
        }
        this.totalPages = 0

        this.last = true
        this.totalElements = 0
        this.size = 0
        this.number = 0,
            this.sort = {
                sorted: false,
                unsorted: true,
                empty: true
            },
            this.numberOfElements = 0
        this.first = true
        this.empty = true
    }
    content: any[]
    pageable: {
        sort: {
            sorted: boolean,
            unsorted: boolean,
            empty: boolean
        },
        pageSize: number,
        pageNumber: number,
        offset: number,
        paged: boolean,
        unpaged: boolean
    }
    totalElements: number
    last: boolean
    totalPages: number
    numberOfElements: number
    first: boolean
    size: number
    number: number
    sort: {
        sorted: boolean,
        unsorted: boolean,
        empty: boolean
    }
    empty: boolean
}
