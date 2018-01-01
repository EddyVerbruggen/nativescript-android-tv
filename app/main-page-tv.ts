import * as observable from "tns-core-modules/data/observable";
import * as pages from "tns-core-modules/ui/page";
import { HelloWorldModel } from "./main-view-model";
import * as utils from "tns-core-modules/utils/utils";
import { ViewBase } from "tns-core-modules/ui/core/view-base";

declare const android: any;

const resourcename = "navbutton";
const res = utils.ad.getApplicationContext().getResources();
const identifier = res.getIdentifier(resourcename, "drawable", utils.ad.getApplication().getPackageName());

// Event handler for Page 'loaded' event attached in main-page.xml
export function pageLoaded(args: observable.EventData) {
  // Get the event sender
  const page = <pages.Page>args.object;
  page.actionBarHidden = true;
  page.bindingContext = new HelloWorldModel();
}

export function elementLoaded(args: observable.EventData): void {
  const view = <ViewBase>args.object;

  // There are 2 ways to make the TV controls highlight the currently focused element:
  // 1) use a resource that speficies a 'focused' state:
  // view.android.setBackgroundResource(identifier);

  // 2) don't use a resource, but set a backreference so 'dispatchKeyEvent' in app.ts can swap CSS classes
  view.android["jsview"] = args.object;
}
