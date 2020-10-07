import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pagination } from 'src/app/models/pagination';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() pagination: Pagination;
  @Output() pageChanged = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    this.initializePagination();
  }

  initializePagination() {
    this.pagination.Page = this.pagination.Page || 1;
    this.pagination.PageSize = this.pagination.PageSize || 5;
    this.pagination.MaxSize = this.pagination.MaxSize || 4;
    this.pagination.DirectionsLinks = this.pagination.DirectionsLinks || true;
    this.pagination.BoundaryLinks = this.pagination.BoundaryLinks || true;
    this.pagination.Offset = this.pagination.Offset || 0;
    this.pagination.CollectionSize = this.pagination.CollectionSize || 0;
    this.pagination.TextPaginationFirst = this.pagination.TextPaginationFirst || 'Primero';
    this.pagination.TextPaginationLast = this.pagination.TextPaginationLast || 'Ultimo';
  }

  onPageChanged() {
    this.pageChanged.emit(this.pagination);
  }
}
