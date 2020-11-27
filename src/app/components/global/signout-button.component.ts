import { AuthService } from '@app/services/http/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-signout-button',
  template: `
    <ion-button (click)="logout()">
      <ng-content></ng-content>
    </ion-button>
  `,
  styles: [``]
})
export class SignOutButtonComponent implements OnInit, OnDestroy {
  private loading: any;
  constructor(
    public auth: AuthService,
    private loadingController: LoadingController
  ) {}
  ngOnDestroy(): void {
    this.loading.dismiss();
  }

  ngOnInit() {}

  private async logout() {
    this.loading = await this.loadingController.create({
      message: 'Please wait...'
    });

    this.loading.present();
    await this.auth.signOut();
  }
}
