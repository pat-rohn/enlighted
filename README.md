# Enlightened
Small project to configure and control ESP32/ESP8266 using HTTP. Compatible with [esp-enlightened](https://github.com/pat-rohn/esp-enlightened). Uses Angular and Ionic with Capacitor.

## Features
 - Configure ESP over WiFi (WiFi credentials, used pin etc.)
 - Control LED's using ws28xx protocol
 - Sunrise alarm with button inputs
 - Reading different sensors and send values to a [edge-server/backend](https://github.com/pat-rohn/go-iotedge)

![alt text](https://raw.githubusercontent.com/pat-rohn/enlightened/main/example-settings.png)
![alt text](https://raw.githubusercontent.com/pat-rohn/enlightened/main/example-led-control.png)
![alt text](https://raw.githubusercontent.com/pat-rohn/enlightened/main/example-settings.png)

## Get started
[ionic with capacitor](https://capacitorjs.com/docs/getting-started/with-ionic)

### Develop
```
ng serve

```

### Open in Android Studio
```
ionic build
npx cap sync
npx cap open android
```

### Build apk in Android Studio

- Allow HTTP in AndroidManifest.xml
```
<application
...
 android:usesCleartextTraffic="true">
</application>


``` 
- Optional:Change icon (icon.png: 1024x1024)
    - right click on app/src/main/res > New > Image Asset
    - Choose file for foreground layer *and* a color for background-layer (or background picture, does not work always)
    - Clich Next and Finish

- Navigate to Build > Build Bundle(s)/APK(s) > Build APK(s)