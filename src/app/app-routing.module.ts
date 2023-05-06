import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/services/auth.guard/auth.guard';

const routes: Routes = [
  { 
    path: 'login', 
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) 
  },
  { 
  path: 'main', 
  loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule),
  canActivate: [AuthGuard]
  },  
  { 
  path: 'register', 
  loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule),
   
  },
  { 
  path: 'profile', 
  loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule),
  canActivate: [AuthGuard]
     
  },
  { 
  path: 'edit-profile', 
  loadChildren: () => import('./pages/edit-profile/edit-profile.module').then(m => m.EditProfileModule),
  
       
  },
  { 
  path: 'create-post', 
  loadChildren: () => import('./pages/create-post/create-post.module').then(m => m.CreatePostModule),
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/login'
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
