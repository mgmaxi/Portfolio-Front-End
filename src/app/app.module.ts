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
import { ProfileProjectsComponent } from './components/profile-project/profile-project.component';
import { HttpClientModule } from '@angular/common/http';
import { ProfileLanguagesComponent } from './components/profile-language/profile-language.component';
import { ProfileTechnologiesComponent } from './components/profile-technology/profile-technology.component';
import { LoginComponent } from './security/auth/login/login.component';
import { SignupComponent } from './security/auth/signup/signup.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormAddEducationComponent } from './components/profile-education/form-add-education/form-add-education.component';
import { FormAddExperienceComponent } from './components/profile-experience/form-add-experience/form-add-experience.component';
import { FormUpdateExperienceComponent } from './components/profile-experience/form-update-experience/form-update-experience.component';
import { FormAddProjectComponent } from './components/profile-project/form-add-project/form-add-project.component';
import { FormAddLanguageComponent } from './components/profile-language/form-add-language/form-add-language.component';
import { FormAddTechnologieComponent } from './components/profile-technology/form-add-technology/form-add-technology.component';
import { interceptorProvider } from './security/interceptors/interceptor.service';
import { FormUpdateEducationComponent } from './components/profile-education/form-update-education/form-update-education.component';
import { FormUpdateProjectComponent } from './components/profile-project/form-update-project/form-update-project.component';
import { FormUpdateLanguageComponent } from './components/profile-language/add-language-to-person/add-language-to-person.component';
import { FormUpdateHeaderComponent } from './components/profile-header/form-update-header/form-update-header.component';
import { FormUpdateProfilephotosComponent } from './components/profile-header/form-update-profilephotos/form-update-profilephotos.component';
import { FormAddTechToPersonComponent } from './components/profile-technology/add-technology-to-person/add-technology-to-person.component';
import { HomeComponent } from './components/home/home.component';
import { SchoolComponent } from './components/profile-education/school/school.component';
import { CompanyComponent } from './components/profile-experience/company/company.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { TemplateV01Component } from './components/portfolio-template/template-v01/template-v01.component';
import { MenuComponent } from './components/header/menu/menu.component';
import { FormUpdateSocialnetworkComponent } from './components/profile-header/form-update-socialnetwork/form-update-socialnetwork.component';
import { FormUpdateCoverphotoComponent } from './components/profile-header/form-update-coverphoto/form-update-coverphoto.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
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
    FormUpdateExperienceComponent,
    FormUpdateEducationComponent,
    FormUpdateProjectComponent,
    FormUpdateLanguageComponent,
    FormUpdateHeaderComponent,
    FormUpdateProfilephotosComponent,
    FormUpdateCoverphotoComponent,
    FormAddTechToPersonComponent,
    SchoolComponent,
    CompanyComponent,
    TemplateV01Component,
    MenuComponent,
    FormUpdateSocialnetworkComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
