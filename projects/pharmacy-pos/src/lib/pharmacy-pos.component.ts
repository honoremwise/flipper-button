import { Component, OnInit } from '@angular/core';
import * as alasql from 'alasql';
const mm = alasql;

@Component({
  selector: 'lib-pharmacy-pos',
  template: `
    <p>
      pharmacy-pos works! it should reload
    </p>
  `,
  styles: []

})
export class PharmacyPosComponent implements OnInit {

  constructor() {
    // window.alasql;
    console.log("hello world");
    // alasql.
    mm("CREATE TABLE test (language INT, hello STRING)");
    mm("INSERT INTO test VALUES (1, 'Hello!')");
    mm("INSERT INTO test VALUES (2, 'Aloha!')");
    mm("INSERT INTO test VALUES (3, 'Bonjour!')");

    const results = mm("SELECT * FROM test WHERE language > 1");
    console.log(results);
   }

  ngOnInit() {
   
    // alasql("CREATE TABLE test (language INT, hello STRING)");
    console.log("init ");
  }

}
