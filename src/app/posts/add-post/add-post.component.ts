import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { PostService } from '../post.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  addPostForm: FormGroup;

  constructor( private postService: PostService, private router: Router) {
    this.addPostForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.addPostForm.setControl('title', new FormControl(null));
    this.addPostForm.setControl('description', new FormControl(null));
  }

  onAddPost(): void {
    const post: Post = this.addPostForm.value;
    this.postService.add(post).subscribe((data: Post) => {
      this.router.navigate(['/posts']);
    });
  }
}
