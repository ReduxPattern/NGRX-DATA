import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of, map, tap, first } from 'rxjs';
import { PostService } from './post.service';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsResolver implements Resolve<boolean> {
  constructor(private postService: PostService) {

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.postService.loaded$.pipe(
      tap((loaded: boolean) => {
        if(!loaded) {
          this.postService.getAll();
        }
      }),
      first(),
    );
  }
}
