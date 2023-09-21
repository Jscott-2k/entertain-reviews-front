import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent {
  @Input() index:number = 0;

  get avatarClass():string {
    return "avatar-icon__" + this.index;
  }
}
