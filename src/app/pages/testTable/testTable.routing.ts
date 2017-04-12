import { Routes, RouterModule }  from '@angular/router';

import { testTable } from './testTable.component';
import { newTestTable } from './new.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: testTable
  },
  {
    path:'edit/:id',component:newTestTable
  }
];

export const routing = RouterModule.forChild(routes);
