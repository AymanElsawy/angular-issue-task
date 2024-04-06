import { Pipe, PipeTransform } from '@angular/core';
import { Issue } from '../issue.model';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(issues: Issue[], status: string): Issue[]  {
    if(!status){
      return issues;
    }
    return issues.filter(issue => issue.status === status);
  }

}
