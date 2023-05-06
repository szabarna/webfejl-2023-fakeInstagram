import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatListModule} from "@angular/material/list";
import {MatMenuModule} from "@angular/material/menu";
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpRequestInterceptor} from "../HttpRequestInterceptor";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AngularFireModule } from '@angular/fire/compat'
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProfileComponent } from './pages/profile/profile.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component'; 

@NgModule({
  declarations: [
    AppComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatSidenavModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule, 
        FlexLayoutModule,
        
        MatListModule,
        MatMenuModule,
        HttpClientModule,
        MatSnackBarModule,
        AngularFireModule.initializeApp(environment.firebase),
        //provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        provideStorage(() => getStorage())
    ],
  providers: [
    // Http Interceptor(s) -  adds with Client Credentials
    [
      { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true }
    ],
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
