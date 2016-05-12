wstcp Client
============

WebSocket TCP forwarding client.

Install
-------

    npm install

### Windows

Install as a Windows service:

    npm install -g node-windows
    npm run winservice_install

Uninstall
---------

### Windows

Uninstall the Windows service:

    npm run winservice_uninstall

Usage
-----

Run from console:

    npm start [config]

where `config` is config file (default: `config.json`).

Configuration
-------------

Example:

    {
      "server": "ws://localhost:10000",
      "log": "wstcp-client.log",
      "name": "client-1",
      "key": "1234",
      "port": 22,
      "remote": true
    }

Options:

- `server`: Server URL (required).
- `log`: Log file path (default: *none*).
- `name`: Client name.
- `key`: Client authentication key.
- `port`: TCP forwarding port (required).
- `remote`: Remote TCP forwarding (default: `false`).
- `retry`: Retry failed connections (default: `true`).
- `retryInterval`: Retry interval in ms (default: 10000).

Copyright
---------

Copyright 2016 Bovertis BV. All rights reserved.

Authors:

- 2016 Peter Kuma
