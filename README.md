## Get started
```
https://capacitorjs.com/docs/getting-started/with-ionic
```

```
ionic serve

```

## Open in Android Studio
```
ionic build
npx cap sync
npx cap open android
```
Open ./android project with Android Studio

- Upgrade gradle
- Change icon if wanted (icon.png: 1024x1024)
    - right click on app/src/main/res > New > Image Asset
    - Choose file for foreground layer *and* a color for background-layer (or background picture, does not work always)
    - Clich Next and Finish
- Allow http 
```
<application
...
 android:usesCleartextTraffic="true">
</application>


``` 
