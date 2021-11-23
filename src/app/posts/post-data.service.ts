import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { map, Observable } from 'rxjs';

import { Post } from '../models/post.model';

@Injectable()
export class PostDataService extends DefaultDataService<Post> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Post', http, httpUrlGenerator);
  }

  override getAll(): Observable<Post[]> {
    const getUrl =`https://ngrx-angular13-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json`;
    return this.http.get(getUrl).pipe(
      map((data: {[key: string]: any}) => {
        const post: Post[] = [];
        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            const element = data[key];
            post.push({...element, id: key});
          }
        }
        return post;
      })
    );
  }
}
