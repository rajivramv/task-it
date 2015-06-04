# task-it
 A task management application utilizing Kinvey mBaaS. 
### Note
The app description and the apk file of the app can be found in `docs/`.  

### Build steps
1. Install node + npm.
2. Install bower, phonegap, gulp globally for cli access. This can be done by `sudo npm install bower|phonegap|gulp -g`.
3. Install Jdk, Ant and Android SDK API version 20+ and ensure that they are in environment path.
4. Clone this repository, cd into it and run `npm install` to install node packages necessary for the build process.
5. Run `bower install` to install the bower dependencies (front end libraries - angular, ui-router, bootstrap).
6. Run `gulp build-dist` to build the app. This will regenerate the `www` folder which stores the assests necessary for the phonegap app.
7. Run `phonegap platform add android` to add the android platform.
8. You can now run 
	* `phonegap serve` which will start a local server that can be accessed with the phonegap developer app or browser.
	* `phonegap build android` to build the apk file.
	* or `phonegap run android` to run an instance of the app in an emulator or device.   