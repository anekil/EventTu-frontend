### Whole instruction here
https://reactnative.dev/docs/environment-setup

### install nodejs version > 16
**install nodejs v20.9.0**
- curl -L https://nodejs.org/dist/v20.9.0/node-v20.9.0-linux-x64.tar.xz > node-v20.9.0-linux-x64.tar.xz
- sudo tar -xvf node-v20.9.0-linux-x64.tar.xz
- sudo cp -r node-v20.9.0-linux-x64/{bin,include,lib,share} /usr/
- export PATH=/usr/node-v20.9.0-linux-x64/bin:$PATH

### install JDK version > 11
- sudo apt-get install openjdk-11-jdk

### install SDK version == 13 (Tiramisu) under Android
- Android SDK Platform 33
- Intel x86 Atom_64 System Image or Google APIs Intel x86 Atom System Image

### copy paths to $HOME/.bash_profile or $HOME/.bashrc
- export ANDROID_HOME=$HOME/Android/Sdk
- export PATH=$PATH:$ANDROID_HOME/emulator
- export PATH=$PATH:$ANDROID_HOME/platform-tools

### Start app
1. go to main dir
2. npm install
3. npm start

### Init new project (in case)
- npx create-expo-app@latest -e with-router
- npx react-native@latest init AwesomeProject
