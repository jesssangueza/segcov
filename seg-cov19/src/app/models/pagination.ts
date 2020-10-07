export interface Pagination {
    Page?: number;
    PageSize: number;
    MaxSize?: number;
    Offset: number;
    CollectionSize?: number;
    DirectionsLinks?: boolean;
    BoundaryLinks?: boolean;
    TextPaginationFirst?: string;
    TextPaginationLast?: string;
    PreviosPage?: number;
    FirstVisible?: any;
    LastVisible?: any;
}
