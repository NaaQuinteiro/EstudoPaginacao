import { User } from "./user"

export interface Page {
    //contem os dados retornados do banco de diversos usuarios 
    content: User[],
    pagetable: {
        sort: {
            empty: boolean,
            sorted: boolean,
            unsorted: boolean
          },
          offset: number,
          pageSize: number,
          pageNumber: number,
          unpaged: boolean
          paged: boolean,
    },
    last: boolean,
    totalPages: number, 
    totalElements: number, 
    number: number,
    sort: {
        empty: boolean,
        sorted: boolean,
        unsorted: boolean
    },
    numberOfElements: number,
    first: boolean,
    empaty: boolean
}
    