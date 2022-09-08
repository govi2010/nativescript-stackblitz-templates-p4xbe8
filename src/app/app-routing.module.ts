import {NgModule} from '@angular/core'
import {Routes} from '@angular/router'
import {NativeScriptRouterModule} from '@nativescript/angular'
import {RadListViewComponentDemo} from "~/app/rad-list-view-demo/rad-list-view-demo.component";

const routes: Routes = [
    {
        path: '',
        component: RadListViewComponentDemo
    },
]

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {
}
