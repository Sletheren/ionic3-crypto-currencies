import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  currencies = []

  constructor(public navCtrl: NavController, public dataService: DataServiceProvider, public loading: LoadingController, public alert: AlertController) {
    this.retrieve()
  }

  showDetails(c){
    let modifiedCurrency = JSON.parse(JSON.stringify(c));
    modifiedCurrency.symbol = this.getIcon(modifiedCurrency.symbol);
    console.log(modifiedCurrency);
    this.navCtrl.push('DetailPage', {
      currency: modifiedCurrency
    })
  }

  getIcon(symbol){
    return "assets/icon/"+symbol.toLowerCase()+".png";
  }

  retrieve(){
    let loader = this.loading.create({
      spinner: 'crescent',
      content: "Fetching updated data from the server...",
    });
    loader.present();
    this.dataService.getData().then(
      (data:any) => {
        this.currencies = data;
        loader.dismiss();
      },
      (err) => {
        this.showError();
        loader.dismiss();
      }
    )
  }

  showError() {
    let alert = this.alert.create({
      title: 'Oops! Error occured',
      message: 'There was a problem while connecting to the server!',
      buttons: ['GOT IT']
    });
    alert.present();
  }

}
