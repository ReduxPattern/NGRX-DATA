import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { EntityDefinitionService, EntityMetadataMap, EntityDataService, EntityDataModule } from "@ngrx/data";

import { AddPostComponent } from "./add-post/add-post.component";
import { EditPostComponent } from "./edit-post/edit-post.component";
import { PostsListComponent } from "./posts-list/posts-list.component";
import { SinglePostComponent } from "./single-post/single-post.component";
import { PostService } from "./post.service";
import { PostDataService } from "./post-data.service";
import { Post } from "../models/post.model";


const routes: Routes = [
    { path: '', component: PostsListComponent },
    { path: 'add', component: AddPostComponent },
    { path: 'edit/:id', component: EditPostComponent },
    { path: 'details/:id', component: SinglePostComponent },
];

const entityMetadata: EntityMetadataMap = {
    Post: {
        sortComparer: sortByName,
        entityDispatcherOptions: {
            optimisticDelete: true,
            optimisticUpdate: true,
        },
    },
};

function sortByName(a: Post, b: Post): number {
    let comp: number = a.title.localeCompare(b.title);
    return comp;
}

@NgModule({
    declarations: [PostsListComponent, AddPostComponent, EditPostComponent, SinglePostComponent],
    imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
    providers: [PostService, PostDataService],
})
export class PostsModule {
    constructor(eds: EntityDefinitionService, entityDataService: EntityDataService, postDataService: PostDataService) {
        eds.registerMetadataMap(entityMetadata);
        entityDataService.registerService('Post', postDataService);
    }
}
