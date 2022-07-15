import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Item } from '../../shared/models/item.model';
import { HttpService } from '../../shared/services/http.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  value: number = 0;
  items: Item[] = [];

  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.http.getInventory().subscribe(res => {
      this.items = res.data.inventory.items;
      this.value = res.data.inventory.value;
    });
  }

}
