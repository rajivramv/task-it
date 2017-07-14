# task-it
 A task management application utilizing Kinvey mBaaS.
  
### Note
The app description and the apk file of the app can be found in `docs/`.  

### In Action
Visit http://task-it-demo.herokuapp.com/

Admin User
- username: samba
- password: samba

Normal user
- username: kiwi
- password: kiwi

### Build steps
1. Install Node.js.
2. Install Jdk, Ant and Android SDK API version 20+ and ensure that they are in environment path (optional).
3. Clone, install and build. 

`cd task-it`

`npm install` or `yarn install`

4. The following npm scripts are available
- `npm start` or `npm run serve`: Starts a local file server that serves the static files.
- `npm watch`: Watches the local files for changes and builds automatically. Useful during development.
- `npm run run-android`: Runs the app in an emulator or connected android device.
- `npm build android`: Builds the APK file with defalut debug key.
