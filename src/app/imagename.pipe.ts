import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagename'
})
export class ImagenamePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const mylist = value.split("/")
    const name;
    if (mylist.length === 4) {
      const [parentFolder, deviceFolder, dateYear, filename] = mylist;
      const [hourMinute, detection, extension] = filename.split("_");
      name = `${dateYear.slice(4,6)}/${dateYear.slice(6,8)} ${hourMinute.slice(0,2)}h${hourMinute.slice(2,4)} - ${detection}`;
    }
    if (mylist.length === 2) {
      const [parentFolder, filename] = mylist;
      name = filename;
    }
    return name;
  }

}
