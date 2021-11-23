import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Update } from '@ngrx/entity';
import { map, Observable } from 'rxjs';

import { Post } from '../models/post.model';

@Injectable()
export class PostDataService extends DefaultDataService<Post> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Post', http, httpUrlGenerator);
  }

  override getAll(): Observable<Post[]> {
    const getUrl = `https://ngrx-angular13-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json`;
    return this.http.get(getUrl).pipe(
      map((data: { [key: string]: any }) => {
        const post: Post[] = [];
        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            const element = data[key];
            post.push({ ...element, id: key });
          }
        }
        return post;
      })
    );
  }

  override add(post: Post): Observable<Post> {
    const postUrl = `https://ngrx-angular13-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json`;
    return this.http.post<{ name: string }>(postUrl, post)
      .pipe(map(data => {
        return { ...post, id: data.name };
      }));
  }

  override update(post: Update<Post>): Observable<Post> {
    const postUrl = `https://ngrx-angular13-default-rtdb.asia-southeast1.firebasedatabase.app/posts/${post.id}.json`;
    return this.http.put<Post>(postUrl, {...post.changes});
  }

  override delete(id: string): Observable<string> {
    const delUrl = `https://ngrx-angular13-default-rtdb.asia-southeast1.firebasedatabase.app/posts/${id}.json`;
    return this.http.delete(delUrl).pipe(
      map(data => {
        return id;
      })
    );
  }

}
