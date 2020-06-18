import { Component, OnInit } from '@angular/core';
import {TransferService} from '../../services/transfer.service';
@Component({
  selector: 'app-viewfull',
  templateUrl: './viewfull.component.html',
  styleUrls: ['./viewfull.component.css']
})
export class ViewfullComponent implements OnInit {
  data=this.transferService.getData();
  constructor(private transferService:TransferService) { }

  ngOnInit(): void {
  }

}
