# boss
GUI based Concierge module management (boss is to Concierge what luci is to OpenWRT). It aims to provide a clean, extensible and easily maintainable web user interface for managing Concierge.

> Note that while this module works well, and is recommended for installation with Concierge, it is not complete.

### Installation
As with most modules, the easiest way to install this Concierge module is:
```shell
/kpm install boss
```

If you prefer to install things manually, after performing the usual installation steps, you will also need to `npm install` within the module directory.

### Usage
By default, boss starts a webserver with the configuration:

|Property|Default Setting|
|---|---|
|Port|8080|
|Username|admin|
|Password|admin|

So to access the server, navigate to `http://localhost:8080` and login with `admin:admin`. This username/password combination can be changed within the interface (and additional accounts created/deleted) and the port can also be changed after a module reload.
