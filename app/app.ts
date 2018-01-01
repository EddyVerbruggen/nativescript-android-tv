import * as application from "tns-core-modules/application";
import * as utils from "tns-core-modules/utils/utils";
import * as frame from "tns-core-modules/ui/frame";
import { ViewBase } from "tns-core-modules/ui/core/view-base";

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
@JavaProxy("com.tns.NativeScriptTVActivity")
class Activity extends android.app.Activity {
  private _callbacks: frame.AndroidActivityCallbacks;

  private highlightedElement: ViewBase;

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

  public dispatchKeyEvent(event: android.view.KeyEvent): boolean {
    // you can respond to specific keycodes by fi. registering a listener and invoking it when appropriate
    console.log("D-Pad center button pressed? " + (event.getKeyCode() === android.view.KeyEvent.KEYCODE_DPAD_CENTER));

    // let's highlight the element that currently has the focus
    const tnsButton = <ViewBase>this.getCurrentFocus()["jsview"];
    if (tnsButton && tnsButton !== this.highlightedElement) {
      tnsButton.addPseudoClass("focused");
      if (this.highlightedElement) {
        this.highlightedElement.deletePseudoClass("focused");
      }
      this.highlightedElement = tnsButton;
    }
    return super.dispatchKeyEvent(event);
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
