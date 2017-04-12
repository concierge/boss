import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { routing }       from './testTable.routing';
import { testTable } from './testTable.component';
import { newTestTable } from './new.component';
import { PaginationModule } from 'ng2-bootstrap/components/pagination';
import {DatepickerModule} from 'ng2-bootstrap/ng2-bootstrap';
import { MaterialModule,MdIconRegistry, OVERLAY_PROVIDERS,MdButtonModule, MdIconModule } from '@angular/material';
import {AuthHttp} from './AuthHttp';
import {jsonExport} from './jsonExport';
import { testTableService } from './testTable.service';
import {DataTableModule,SharedModule} from 'primeng/primeng';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,

    routing,
    PaginationModule,
    DataTableModule,
    DatepickerModule,
    SharedModule,
    MaterialModule,
    MdIconModule,
    MdButtonModule
  ],
  declarations: [
    testTable,
    newTestTable
  ],
  providers: [
testTableService,
MdIconRegistry,
AuthHttp,
jsonExport,
OVERLAY_PROVIDERS
  ]
})
export default class TablesModule {}
