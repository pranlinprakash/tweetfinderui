import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as io from "socket.io-client";
import { environment } from '../environments/environment'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tweetfinder';
  keyword = new FormControl('');
  constructor(private http: HttpClient) { }
  ngOnInit() {
    this.keyword = new FormControl('lockdown');
    // let socket = io.connect(environment.apiUrl);
    // socket.on('tweet', (param) => {
    //   console.log(2,param);
    // });
  }

  keywordFinder(){
    console.log(this.keyword.value);
      this.http.get(`${environment.apiUrl}/api/${this.keyword.value}`).subscribe((data: any) => {
        console.log(1,data);
    });
  }
}
