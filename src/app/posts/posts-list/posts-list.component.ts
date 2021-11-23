import { Component, OnInit } from '@angular/core';

import { PostService } from '../post.service';
import { Post } from '../../models/post.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {

  posts$: Observable<Post[]>;
  constructor(private postService: PostService) { 
    this.posts$ = new Observable;
  }

  ngOnInit(): void {
    this.posts$ = this.postService.getAll();
  }

}
