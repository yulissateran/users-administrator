import { UserAction } from './user-action';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

export class postMessageEvent {
  origin: string;
  data: UserAction;
  constructor(origin, data){
    this.origin = origin;
    this.data = data;
  }
}