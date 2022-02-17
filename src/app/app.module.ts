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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProfileLanguagesComponent } from './components/profile-languages/profile-languages.component';
import { ProfileTechnologiesComponent } from './components/profile-technologies/profile-technologies.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormAddEducationComponent } from './components/forms/form-add-education/form-add-education.component';
import { FormAddExperienceComponent } from './components/forms/form-add-experience/form-add-experience.component';
import { FormAddProjectComponent } from './components/forms/form-add-project/form-add-project.component';
import { FormAddLanguageComponent } from './components/forms/form-add-language/form-add-language.component';
import { FormAddTechnologieComponent } from './components/forms/form-add-technologie/form-add-technologie.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { InterceptorService } from './service/interceptor.service';
import { PortfolioService } from './service/portfolio.service';

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
    FormAddEducationComponent,
    FormAddExperienceComponent,
    FormAddProjectComponent,
    FormAddLanguageComponent,
    FormAddTechnologieComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
  ],
  providers: [
    PortfolioService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
