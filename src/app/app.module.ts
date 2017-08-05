import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {CookieModule} from 'ngx-cookie';

import {AppHeader} from './app-header/app.header';
import {AppLearn} from './app-learn/app.learn';
import {AppList} from './app-list/app.list';
import {AppCreate} from './app-create/app.create';
import {AppEdit} from './app-edit/app.edit';
import {CardService} from './card.service';
import {CardHttpService} from './cardhttp.service';
import {ErrorService} from './error.service';
import {AuthenticationService} from './authentication.service';
import {AppLoginComponent} from './app-login/app-login.component';
import {MaskPipe} from './pipes/mask.pipe';
import {ResultPipe} from './pipes/result.pipe';
import {DuePipe} from './pipes/due.pipe';
import {GenderPipe} from './pipes/gender.pipe';
import {ImagePipe} from './pipes/image.pipe';
import {StarPipe} from './pipes/stars.pipe';

const appRoutes: Routes = [
    {path: '', component: AppLearn},
    {path: 'list', component: AppList},
    {path: 'create', component: AppCreate},
    {path: 'login', component: AppLoginComponent},
    {path: 'edit/:id', component: AppEdit},
    {path: '**', redirectTo: '/'}
];

@NgModule({
    declarations: [
        AppHeader,
        AppLearn,
        AppList,
        AppCreate,
        AppEdit,
        AppLoginComponent,
        MaskPipe,
        ResultPipe,
        DuePipe,
        GenderPipe,
        ImagePipe,
        StarPipe
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(appRoutes),
        BrowserAnimationsModule,
        CookieModule.forRoot()
    ],
    providers: [
      CardService,
      CardHttpService,
      ErrorService,
      AuthenticationService
    ],
    bootstrap: [AppHeader]
})
export class AppModule {
}
