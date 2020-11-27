import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss']
})
export class StatisticsPage implements OnInit {
  constructor(private menuController: MenuController) {}

  menuClose() {
    this.menuController.close();
  }
  ngOnInit() {}
}
