import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { Post } from '../../models/post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  editPostForm: FormGroup;
  post$: Observable<Post | undefined>;
  id: string;

  constructor(private postService: PostService, private route: ActivatedRoute, private router: Router) {
    this.editPostForm = new FormGroup({});
    this.post$ = this.getPost();
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    if(!this.post$) {
      this.post$ = this.getPost();
    } 
    this.post$.subscribe((data: Post | undefined) => {
      this.editPostForm.setControl('title', new FormControl(data?.title));
      this.editPostForm.setControl('description', new FormControl(data?.description));
    });
  }

  getPost(): Observable<Post | undefined> {
    return this.postService.entities$.pipe(
      map((posts: Post[]) => {
          const post: Post | undefined = posts.find(post => post.id === this.id);
          return post;
    }));
  }

  onEditPost(): void {
    const postData: Post = {
      ...this.editPostForm.value,
      id: this.id
    }
    this.postService.update(postData);
    this.router.navigate(['/posts']);
  }

}
