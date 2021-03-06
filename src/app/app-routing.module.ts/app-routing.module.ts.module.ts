import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { LoginComponent } from '../security/auth/login/login.component';
import { SignupComponent } from '../security/auth/signup/signup.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { GuardService } from '../security/guards/guard.service';
import { LoginGuard } from '../security/guards/login.guard';
import { TemplateV01Component } from '../components/portfolio-template/template-v01/template-v01.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'signin', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [LoginGuard] },
  { path: 'portfolio/:username', component: TemplateV01Component },
  {
    path: 'profile',
    component: ProfileComponent,
    /* canActivate: [GuardService], */
    data: { expectedRole: ['admin', 'user'] },
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
