import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EditProfileRoutingModule } from './edit-profile-routing.module';
import { EditProfileComponent } from './edit-profile.component';

@NgModule({
  declarations: [
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    EditProfileRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    FlexLayoutModule 
  ]
})
export class EditProfileModule { }
