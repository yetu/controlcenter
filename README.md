# Controlcenter

[![Build Status](https://travis-ci.org/yetu/controlcenter.svg?branch=master)](https://travis-ci.org/yetu/controlcenter)
[![bitHound Score](https://www.bithound.io/yetu/controlcenter/badges/score.svg)](https://www.bithound.io/yetu/controlcenter)

This is the base project for the yetu control center, containing server-side (scala-play framework based) and client-side (reactjs + reflux based) code.


## developer setup

If you want to make changes to this project, best is to install prerequisites and initialise the needed dependencies below:

### prerequisites

Add **local.yetudev.com** to your hosts file:

 1. Open `/etc/hosts` with any editor, for example `sudo nano /etc/hosts`
 2. Add this line `127.0.0.1 local.yetudev.com`
 3. Save the file

You should access the project using [http://local.yetudev.com:9000](http://local.yetudev.com:9000)

You need to have the following installed in your system:

* npm
	* install from [here](http://nodejs.org/)
	* check you have it by entering `npm` into a terminal

* sbt (and a java JDK)
	* on OSX: `brew install sbt`
	* every other platform: just execute `./activator` or `activator.bat` - it's a wrapper script around sbt that will download and install sbt for you if you don't yet have it, or otherwise start sbt.

### Configuration

#### If you are working for yetu
To run the project with a real integration with yetu OAuth system, you should grab `application-local.conf` from [private repo](https://bitbucket.org/yetu/controlcenter-deployment).
Copy the file to `conf/application.conf`.

**Note:** *This file is added to .gitignore.
You should not be able to commit it, but please pay close attention to not leak the private settings.*

#### If you are not working for yetu

Have a look at `conf/application-example.conf`, copy to `conf/application.conf` and request your own OAuth2 credentials, currently please contact dev-support@yetu.com to obtain them.

For more information on how to develop yetu apps, please see [this page](https://github.com/yetu/app-development-workflow/wiki/How-to-develop-Apps-for-the-yetu-platform%3F)


### Running the development version

**All the scripts are in the root directory**.

1. To run from the clean checkout (if you are starting for the first time or have just checked out a fresh master branch), you need to run the `clean_dev.sh` script:
```
./clean_dev.sh
```

2. If you want to run the server in dev mode with all things watched:

```
./dev.sh
```

### Hot reloading components and styles

This project has [React Hot Loader](https://github.com/gaearon/react-hot-loader) integrated.
If you run the project using `./dev.sh` - everything will work out-of-box!

Otherwise, you can manually start hot-reload server using `npm start`.

**Note:** *You should have `frontendBundlePath = "//local.yetudev.com:8899/assets/"` set in `yetu` section of your `conf/application.conf`.
Otherwise the hot-reloading will not work!*


## Tests

Four types of tests are currently executed:

### 1. Scala unit tests
can simply be run with `play test` and have no further dependencies. They live under `test`.

### 2. Javascript unit tests with karma
Are currently run with npm:
```
npm test
```

## Compiling fonts

1. Install  [fontcustom](http://fontcustom.com/)
2. Run `fontcustom compile` in project root

See `fontcustom.yml` for configuration.

## Adding dependencies

After you have added any library using `npm` or `bower`, you have to apply the next steps:

1. Call `npm shrinkwrap` - it will freeze the versions of all sub-dependent node modules
2. Check in `bower_components` - all bower libraries should be in VCS

