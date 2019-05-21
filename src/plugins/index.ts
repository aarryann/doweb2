import { CardComponent } from './content-subjects';
import { CardFormComponent } from './content-subjects';
import { DashboardComponent } from './content-dashboard';
import { ExampleFunctionComponent } from './content-placeholder';
import { ListCasesMgen } from './content-subjects';
import { ListComponent } from './content-subjects';
import { ListSubjectsMgen } from './content-subjects';
import { NotFoundComponent } from './content-notfound';
import { PageContextComponent } from './content-header';
import { TextField } from './controls-text';

import * as Board from './data-boards';
import * as Case from './data-boards/data.cases';
import * as Context from './data-context';
import * as Visit from './data-subjects';

export const ComponentPlugins = {
  CardComponent,
  CardFormComponent,
  DashboardComponent,
  ExampleFunctionComponent,
  ListCasesMgen,
  ListComponent,
  ListSubjectsMgen,
  NotFoundComponent,
  PageContextComponent,
  TextField
};

export const DatasourcePlugins = {
  Board,
  Case,
  Context,
  Visit
};
