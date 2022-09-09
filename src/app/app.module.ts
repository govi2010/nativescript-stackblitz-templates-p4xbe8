import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from '@nativescript/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NativeScriptUIListViewModule } from 'nativescript-ui-listview/angular';
import { RadListViewComponentDemo } from '~/app/rad-list-view-demo/rad-list-view-demo.component';
import { PushModule } from '@ngrx/component';
import { CheckboxComponent } from '~/app/checkbox/checkbox.component';
import { CollectionViewModule } from '@nativescript-community/ui-collectionview/angular';

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    NativeScriptModule,
    AppRoutingModule,
    NativeScriptUIListViewModule,
    CollectionViewModule,
    PushModule,
  ],
  declarations: [AppComponent, CheckboxComponent, RadListViewComponentDemo],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
