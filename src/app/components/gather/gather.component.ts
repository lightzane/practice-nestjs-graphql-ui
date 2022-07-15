import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CollectEnum } from '../../shared/enums/collect.enum';
import { Item } from '../../shared/models/item.model';
import { HttpService } from '../../shared/services/http.service';

const MESSAGE_DETAIL = 'Please check your inventory';

@Component({
  selector: 'app-gather',
  templateUrl: './gather.component.html',
  styleUrls: ['./gather.component.scss']
})
export class GatherComponent implements OnInit {

  isSuccessfulHarvest = false;
  isSuccessfulFish = false;

  items: Item[] = [];

  constructor(
    private http: HttpService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
  }

  harvest(): void {
    this.http.gather(CollectEnum.HARVEST).subscribe({
      next: (res) => {
        const itemsGathered = res?.data?.gather;
        if (itemsGathered.length) {
          this.isSuccessfulHarvest = true;
          this.messageService.add({
            severity: 'success',
            summary: 'Successful harvest',
            detail: MESSAGE_DETAIL
          });
        }
        this.items.push(...itemsGathered);
      }
    });
  }

  fish(): void {
    this.http.gather(CollectEnum.FISH).subscribe({
      next: (res) => {
        const itemsGathered = res?.data?.gather;
        if (itemsGathered.length) {
          this.isSuccessfulFish = true;
          this.messageService.add({
            severity: 'success',
            summary: 'Successful fishing',
            detail: MESSAGE_DETAIL
          });
        }
        this.items.push(...itemsGathered);
      }
    });

  }

}
