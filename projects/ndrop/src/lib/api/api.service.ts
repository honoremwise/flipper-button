import { Injectable } from '@angular/core';


import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { YFContract } from '../contracts/YFContract';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private post_url: string;
  private bearer_token: string;
  private csrf_token: string;
  private parent_uid: string = '0';
  private xCSRFToken: string;
  private next_url: string;
  private last_url: string;

  constructor(private http: HttpClient) { }

  set bearerToken(bearer_token: string) {
    this.bearer_token = bearer_token;
  }
  get bearerToken() {
    return this.bearer_token;
  }
  set postUrl(post_url: string) {
    this.post_url = post_url;
  }
  get postUrl() {
    return this.post_url;
  }
  set csrfToken(csrf_token: string) {
    this.csrf_token = csrf_token;
  }
  get csrfToken() {
    return this.csrf_token;
  }
  set lastPaginationUrl(last_url: string) {
    this.last_url = last_url;
  }
  get lastPaginationUrl() {
    return this.last_url;
  }
  set nextPaginationUrl(next_url: string) {
    this.next_url = next_url;
  }
  get nextPaginationUrl() {
    return this.next_url;
  }
  set parentUid(parent_uid: string) {
    this.parent_uid = parent_uid;
  }
  get parentUid() {
    return this.parent_uid;
  }
  loadMore(): Observable<YFContract> {
    if (this.bearer_token) {
      return this.http.get<YFContract>(this.next_url, {
        headers: new HttpHeaders().set('authorization', this.bearer_token)
      });
    }
    if (this.csrf_token) {
      return this.http.get<YFContract>(this.next_url, {
        headers: new HttpHeaders().set('X-CSRF-TOKEN', this.xCSRFToken)
      })
    }
  }
}
