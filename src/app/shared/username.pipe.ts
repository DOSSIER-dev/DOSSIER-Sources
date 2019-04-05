import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'username'
})
export class UsernamePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    const firstname = value && value.firstname ? value.firstname.trim() : '';
    const lastname = value && value.lastname ? value.lastname.trim() : '';
    if (firstname && lastname) {
      return firstname + ' ' + lastname;
    } else if (firstname || lastname) {
      return firstname + lastname;
    } else {
      return value && value.username ? value.username : 'unknown';
    }
  }
}
