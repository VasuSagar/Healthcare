import { Component, OnInit,ViewChild,ElementRef} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import{MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import {EditComponent} from '../../dialog/edit/edit.component';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, merge, fromEvent } from 'rxjs';

import {EmpService} from '../../services/emp.service';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {FlashMessagesService} from 'angular2-flash-messages';
import { ToastrService } from 'ngx-toastr';
import { AddComponent } from 'src/app/dialog/add/add.component';
import { DeleteComponent } from 'src/app/dialog/delete/delete.component';
@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  medicineprice:Medicineprice[];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator:MatPaginator;
  @ViewChild('filter',  {static: true}) filter: ElementRef;
  displayedColumns: string[] = ['medname', 'price','sales'];

  index: number;
  id: string;
  exampleDatabase: EmpService | null;
  //exampleDatabase: DataService | null;
  dataSource: ExampleDataSource | null;

  constructor(private authService:AuthService ,
    public dialog: MatDialog,
    public dataService:EmpService,
    public httpClient: HttpClient,
    private flashMessage:FlashMessagesService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadData();
  }
  applyfilter(filterValue: string) {  
    this.dataSource.filter = filterValue.trim().toLowerCase();  
  
   
  } 




  public loadData() {
    this.exampleDatabase = new EmpService(this.httpClient,this.toastr);
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
    fromEvent(this.filter.nativeElement, 'keyup')
      // .debounceTime(150)
      // .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

}

export class ExampleDataSource extends DataSource<Medicineprice> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Medicineprice[] = [];
  renderedData: Medicineprice[] = [];

  constructor(public _exampleDatabase: EmpService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Medicineprice[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getAllIssues();


    return merge(...displayDataChanges).pipe(map( () => {
        // Filter data
        this.filteredData = this._exampleDatabase.data.slice().filter((issue: Medicineprice) => {
          const searchStr = (issue.id + issue.medname + issue.price+issue.sales).toLowerCase();
          return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
        });

        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());

        // Grab the page's slice of the filtered sorted data.
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
        return this.renderedData;
      }
    ));
  }

  disconnect() {}


  /** Returns a sorted copy of the database data. */
  sortData(data: Medicineprice[]): Medicineprice[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
        case 'medname': [propertyA, propertyB] = [a.medname, b.medname]; break;
        case 'price': [propertyA, propertyB] = [a.price, b.price]; break;
        case 'sales': [propertyA, propertyB] = [a.sales, b.sales]; break;
        
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}


interface Medicineprice{
  medname:string,
  price:number,
  sales:number,
  id:string
  }

