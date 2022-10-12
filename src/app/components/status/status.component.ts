import {Component, Input} from "@angular/core";

export enum StatusType {
  CANCEL = 'Cancel',
  WAIT = 'Wait',
  PAID = 'Paid'
}

@Component({
  selector: 'lz-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})

export class StatusComponent {

  @Input()
  public status: unknown;

  public statusTypes = StatusType;

  public statusTypeClasses : Record<StatusType, string> = {
    [StatusType.WAIT]: 'wait',
    [StatusType.CANCEL]: 'cancel',
    [StatusType.PAID]: 'paid',
  };

}
