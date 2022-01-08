import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module.ts/app-routing.module.ts.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProfileHeaderComponent } from './components/profile-header/profile-header.component';
import { ProfileAboutComponent } from './components/profile-about/profile-about.component';
import { ProfileEducationComponent } from './components/profile-education/profile-education.component';
import { ProfileExperienceComponent } from './components/profile-experience/profile-experience.component';
import { ProfileProjectsComponent } from './components/profile-projects/profile-projects.component';
import { HttpClientModule } from '@angular/common/http';
import { ProfileLanguagesComponent } from './components/profile-languages/profile-languages.component';
import { ProfileTechnologiesComponent } from './components/profile-technologies/profile-technologies.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    ProfileHeaderComponent,
    ProfileAboutComponent,
    ProfileEducationComponent,
    ProfileExperienceComponent,
    ProfileProjectsComponent,
    ProfileLanguagesComponent,
    ProfileTechnologiesComponent,
    LoginComponent,
    SignupComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
