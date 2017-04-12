import {Component,ChangeDetectionStrategy, ViewEncapsulation,OnInit,EventEmitter, Output} from '@angular/core';
import { SmartTablesService } from './smartTables.service';
import {NgTableComponent, NgTableFilteringDirective, NgTablePagingDirective, NgTableSortingDirective } from 'ng2-table/ng2-table';
import {Contact} from './smartTables.model';
import {TableData} from './table.data';
import { Observable} from 'rxjs/Observable';




@Component({
  selector: 'basic-tables',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./smartTables.scss')],
  template: require('./smartTables.html')
})
export class SmartTables implements OnInit{
  @Output() public rowDeleted:EventEmitter<any> = new EventEmitter();
  contacts:Contact[];
  errorMessage:string;
  public rows:Array<any> = [];
  public columns:Array<any> = [
     {title: 'Id', name: 'id',sort: 'asc'},
    {title: 'Name', name: 'name', sort: 'asc'}
    //{title: 'Name', name: 'name', filtering: {filterString: '', placeholder: 'Filter by name'}}
    // ,
    // {
    //   title: 'Position',
    //   name: 'position',
    //   sort: false,
    //   filtering: {filterString: '', placeholder: 'Filter by position'}
    // },
    // {title: 'Office', className: ['office-header', 'text-success'], name: 'office', sort: 'asc'},
    // {title: 'Extn.', name: 'ext', sort: '', filtering: {filterString: '', placeholder: 'Filter by extn.'}},
    // {title: 'Start date', className: 'text-warning', name: 'startDate'},
    // {title: 'Salary ($)', name: 'salary'}
  ];
  public page:number = 1;
  public itemsPerPage:number = 10;
  public maxSize:number = 5;
  public numPages:number = 1;
  public length:number = 0;

  public config:any = {
    paging: true,
    sorting: {columns: this.columns},
    filtering: {filterString: ''},
    className: ['table-striped', 'table-bordered']
  };

  private data:Array<any> = [];

  public constructor(private service: SmartTablesService) {
    //this.data =[{"code":"en","name":"English"},{"code":"es","name":"Spanish"}];
    this.service.getData()
         .subscribe(
            contacts =>this.contacts =contacts,
            error => this.errorMessage = <any>error
         )
    this.length = this.data.length;
  }

  public ngOnInit():void {
    this.onChangeTable(this.config);
  }

  public changePage(page:any, data:Array<any> = this.data):Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeSort(data:any, config:any):any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName:string = void 0;
    let sort:string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous:any, current:any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public changeFilter(data:any, config:any):any {
    let filteredData:Array<any> = data;
    this.columns.forEach((column:any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item:any) => {
          return item[column.name].match(column.filtering.filterString);
        });
      }
    });

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item:any) =>
        item[config.filtering.columnName].match(this.config.filtering.filterString));
    }

    let tempArray:Array<any> = [];
    filteredData.forEach((item:any) => {
      let flag = false;
      this.columns.forEach((column:any) => {
        if (item[column.name].toString().match(this.config.filtering.filterString)) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;

    return filteredData;
  }

  public onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    // let filteredData = this.changeFilter(this.data, this.config);
    // let sortedData = this.changeSort(filteredData, this.config);
    // this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    // this.length = sortedData.length;
    this.service.getData()
         .subscribe(contacts => {
           
            this.contacts =contacts;
           // alert(JSON.stringify(this.contacts));
           this.data=this.contacts;
            this.length = this.data.length;
            let filteredData = this.changeFilter(this.data, this.config);
            let sortedData = this.changeSort(filteredData, this.config);
            this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
            this.length = sortedData.length;
        },error => this.errorMessage = <any>error)
  }

  public onCellClick(data: any): any {
    console.log(data);
  }

  public onRowDelete(row:any):void {
    alert(JSON.stringify(row));
//this.rowDeleted.emit({row});
//console.log({row});
 //var index =this.rows.indexOf(row);
//this.rows.splice(row, 1); 
}


// contacts:Contact[];
//   query: string = '';

//   settings = {
//     add: {
//       addButtonContent: '<i class="ion-ios-plus-outline"></i>',
//       createButtonContent: '<i class="ion-checkmark"></i>',
//       cancelButtonContent: '<i class="ion-close"></i>',
//     },
//     edit: {
//       editButtonContent: '<i class="ion-edit"></i>',
//       saveButtonContent: '<i class="ion-checkmark"></i>',
//       cancelButtonContent: '<i class="ion-close"></i>',
//     },
//     delete: {
//       deleteButtonContent: '<i class="ion-trash-a"></i>',
//       confirmDelete: true
//     },
//     columns: {
//       id: {
//         title: 'ID',
//         type: 'number'
//       },
//       name: {
//         title: 'Name',
//         type: 'string'
//       }
//     }
//   };

//   //source: LocalDataSource = new LocalDataSource();

//   constructor(protected service: SmartTablesService) {
//     // this.service.getData().then((data) => {
//     //   this.source.load(data);
//     //});
//    this.service.getData()
//                    .subscribe(
//                      contacts => this.contacts=contacts,
//                      error =>  console.log('Fetch Error'));
//   }

//   onDeleteConfirm(event): void {
//     if (window.confirm('Are you sure you want to delete?')) {
//       event.confirm.resolve();
//     } else {
//       event.confirm.reject();
//     }
//   }
}
