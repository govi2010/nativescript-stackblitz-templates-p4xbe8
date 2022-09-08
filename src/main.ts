import {platformNativeScript, registerElement, runNativeScriptAngularApp} from '@nativescript/angular';
import {SVGView} from "@nativescript-community/ui-svg";

import { AppModule } from './app/app.module';
registerElement('SVGView', () => SVGView)
runNativeScriptAngularApp({
  appModuleBootstrap: () => platformNativeScript().bootstrapModule(AppModule),
});

