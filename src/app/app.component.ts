import { Component} from '@angular/core';
import { Weather } from './Helpers/Weather';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  items : Weather[] = [];
  idsCounter : number = 0
  addCard($event :any){
    this.idsCounter++;
    this.items.push({id:this.idsCounter,status:'New'})
  }

  onDelete(id :any){
    let idx = this.items.findIndex(it=>it.id == id);
    if (idx > -1) {
      this.items.splice(idx, 1);
    }
  }
}


