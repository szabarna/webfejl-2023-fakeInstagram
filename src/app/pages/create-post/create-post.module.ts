import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CreatePostComponent } from './create-post.component';
import { CreatePostRoutingModule } from './create-post-routing.module';

@NgModule({
  declarations: [
    CreatePostComponent
  ],
  imports: [
    CommonModule,
    CreatePostRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    FlexLayoutModule 
  ]
})
export class CreatePostModule { }
