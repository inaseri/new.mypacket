import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'jalali-moment';

@Pipe({name: 'jalali'})
export class JalaliPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    let MomentDate = moment(value, 'YYYY-MM-DD').locale('IR').format('YYYY/M/D');
    return MomentDate;
  }
}
