import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';

import { PostService } from '../post.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {

  singlePostForm: FormGroup;
  post$: Observable<Post | undefined>;
  id: string;

  constructor(private route: ActivatedRoute, private postService: PostService) { 
    this.singlePostForm = new FormGroup({});
    this.post$ = this.getPost();
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
  }

  getPost(): Observable<Post | undefined> {
    return this.postService.entities$.pipe(
      map((posts: Post[]) => {
          const post: Post | undefined = posts.find(post => post.id === this.id);
          return post;
    }));
  }
}
