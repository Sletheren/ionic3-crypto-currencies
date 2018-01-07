import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the DataServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataServiceProvider {
  url = "https://api.coinmarketcap.com/v1/ticker/?limit=10";

  constructor(public http: HttpClient) {
  }

  getData(){
    return new Promise((resolve, reject) => {
      this.http.get(this.url)
      .subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
      })
    })
  }

}
