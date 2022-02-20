import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { MainComponent } from '../components/main/main.component';
import { LoginComponent } from '../security/auth/login/login.component';
import { SignupComponent } from '../security/auth/signup/signup.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { GuardService as guard } from '../security/guards/guard.service';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'portfolio',
    component: MainComponent,
    canActivate: [guard],
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
