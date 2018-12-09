import CardComponent from './Card.component';
import CardFormComponent from './CardForm.component';
import ExampleFunctionComponent from './ExampleFunctionComponent';
import ListComponent from './List.component';
import TextField from './Unit.TextField';

import * as Generated from '../generated';

const Controlled = {
  CardComponent,
  CardFormComponent,
  ExampleFunctionComponent,
  ListComponent,
  TextField,
  ...Generated.default
};

export default Controlled;
