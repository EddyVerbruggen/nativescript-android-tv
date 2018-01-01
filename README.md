# NativeScript ❤️ Android TV

* 🎬 [This app, running on a Phone and TV (YouTube, 23s)](https://www.youtube.com/watch?v=b9Wv0IzN3ts)
* 🎬 [This app, running on a TV, with D-Pad controls (YouTube, 20s)](https://www.youtube.com/watch?v=HjxvDxbAOW0)

### What?
Unsurprisingly Android TV is very much like the Android you know and love,
and since NativeScript already runs like a champ on Android, you can easily
support Android TV as well!

### How?!
I found the easiest way to support TV devices is adding [this line](https://github.com/EddyVerbruggen/nativescript-android-tv/blob/3b3201e979bff762cc4bc36ad04eb946cb48bd6d/app/App_Resources/Android/AndroidManifest.xml#L48) to your `AndroidManifest.xml`
and [figuring out at runtime which UI to load](https://github.com/EddyVerbruggen/nativescript-android-tv/blob/db3848abc508d700ecb80e320c5e5374b1f2073b/app/app.ts#L6-L19).

#### Wait.. does that mean I have to duplicate code?
You don't *have* to duplicate anything, but you really don't want to reuse phone layouts on your TV
for obvious reasons. So what this PoC does, is using a `main-page.xml` for Phone / Tablet, and `main-page-tv.xml`
for TV to accomodate for the additional screen real estate - but they share the same `main-view-model.ts`.

### Can I use Angular or Vue as well?
Sure you can, as those eventually render the same UI widgets as regular NativeScript does.

### And what about iOS?
Nothing special there - iOS is powered by the same code that makes the Android Phone / Tablet version tick.

#### Sorry, I meant Apple TV
Ah, OK, ehm, please refer to [this blog](https://www.nativescript.org/blog/running-the-nativescript-runtime-for-ios-on-apple-tv).

### Lemme try
Create an Android TV emulator with the AVD manager inside Android Studio (if you're not so lucky to own a real device), then:
 
```bash
git clone https://github.com/EddyVerbruggen/nativescript-android-tv
cd nativescript-android-tv
npm i
tns run android
```
