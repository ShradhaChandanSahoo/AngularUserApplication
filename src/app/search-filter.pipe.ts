import { Pipe, PipeTransform } from '@angular/core';
import { User } from './user';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(Users:User[],searchValue:String): User[] {
    
    if(!Users || !searchValue){
      return Users;  
    }
    return Users.filter(user=>
      user.firstName.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      user.dob.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      user.department.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())) ;
      
  }

}
