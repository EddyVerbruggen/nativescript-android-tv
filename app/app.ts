import * as application from "tns-core-modules/application";
import * as utils from "tns-core-modules/utils/utils";

declare const android: any;

if (utils.ad) {
  // Android: Load either the TV or phone UI
  const uiModeManager = utils.ad.getApplicationContext().getSystemService(android.content.Context.UI_MODE_SERVICE);
  if (uiModeManager.getCurrentModeType() === android.content.res.Configuration.UI_MODE_TYPE_TELEVISION) {
    console.log("Running on a TV");
    application.start({moduleName: "main-page-tv"});
  } else {
    console.log("Running on a Phone / Tablet");
    application.start({moduleName: "main-page"});
  }
} else {
  // iOS
  application.start({moduleName: "main-page"});
}





// The class below is not currently used (also commented in AndroidManifest.xml)

/*
@JavaProxy("com.tns.NativeScriptTVActivity")
class Activity extends android.app.Activity {
  private _callbacks: frame.AndroidActivityCallbacks;

  onCreate(savedInstanceState: android.os.Bundle): void {
    if (!this._callbacks) {
      (<any>frame).setActivityCallbacks(this);
    }
    this._callbacks.onCreate(this, savedInstanceState, super.onCreate);
  }

  protected onSaveInstanceState(outState: android.os.Bundle): void {
    this._callbacks.onSaveInstanceState(this, outState, super.onSaveInstanceState);
  }

  protected onStart(): void {
    this._callbacks.onStart(this, super.onStart);
  }

  protected onStop(): void {
    this._callbacks.onStop(this, super.onStop);
  }

  protected onDestroy(): void {
    this._callbacks.onDestroy(this, super.onDestroy);
  }

  public onBackPressed(): void {
    this._callbacks.onBackPressed(this, super.onBackPressed);
  }

  public onRequestPermissionsResult(requestCode: number, permissions: Array<String>, grantResults: Array<number>): void {
    this._callbacks.onRequestPermissionsResult(this, requestCode, permissions, grantResults, undefined);
  }

  protected onActivityResult(requestCode: number, resultCode: number, data: android.content.Intent): void {
    this._callbacks.onActivityResult(this, requestCode, resultCode, data, super.onActivityResult);
  }
}
*/
