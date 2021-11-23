import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule} from '@angular/forms';

import { HomeComponent } from './home/home.component';
import { PostsResolver } from './posts/posts.resolver';

const routes: Routes = [
  {
    path: '', 
    component: HomeComponent
  },
  {
    path: 'posts',
    resolve: {posts: PostsResolver},
    loadChildren: () => import('./posts/posts.module').then(m => m.PostsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, FormsModule,],
  providers: [PostsResolver]
})
export class AppRoutingModule { }
