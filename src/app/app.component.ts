import { Component } from '@angular/core';
import { IconService } from '@visurel/iconify-angular';
import { appIcons } from './icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'object-detection';

  constructor(iconService: IconService){
    iconService.registerAll(appIcons);
  }
}
