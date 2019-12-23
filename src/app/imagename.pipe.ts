import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagename'
})
export class ImagenamePipe implements PipeTransform {
  month_map = {
    "01": "Jan",
    "02": "Feb",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "Sept",
    "10": "Oct",
    "11": "Nov",
    "12": "Dec"
  }

  transform(value: any, args?: any): any {
    const mylist = value.split("/")
    let name;
    if (mylist.length === 4) {
      const [parentFolder, deviceFolder, dateYear, filename] = mylist;
      const [hourMinute, detection, extension] = filename.split("_");
      let month = this.month_map[dateYear.slice(4,6)]
      name = `${dateYear.slice(6,8)} ${month} - ${hourMinute.slice(0,2)}h${hourMinute.slice(2,4)} - ${detection}`;
    }
    if (mylist.length === 2) {
      const [parentFolder, filename] = mylist;
      name = filename;
    }
    return name;
  }

}
