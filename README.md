wstcp-client
============

WebSocket TCP forwarding command-line client.

[wstcp](https://github.com/peterkuma/wstcp)
is a client and server implementation of TCP forwarding over WebSocket.
wstcp supports local and remote port forwarding, similar to OpenSSH.

Also see [wstcp-server](https://github.com/peterkuma/wstcp-server).

![Diagram](https://raw.githubusercontent.com/peterkuma/wstcp/master/diagram.png)

Install
-------

    npm install wstcp-client

`wstcp-client` program will be installed in the bin directory.

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

    wstcp-client config.json

where `config.json` is a config file (see below).

Example
-------

`config.json`:

    {
      "server": "ws://localhost:10000",
      "log": "wstcp-client.log",
      "name": "client-1",
      "key": "1234",
      "port": 22,
      "remote": true
    }

will connect to a wstcp-server running on `ws://localhost:10000`, login
as `client-1` with key `1234`, and start listening on port 22 for incoming
TCP connections. Connections will be forwarded to the wstcp-server,
which decides where to route them depending on its configuration.

Configuration
-------------

Options:

- `server`: Server URL (required).
- `log`: Log file path (default: *none*).
- `name`: Client name.
- `key`: Client authentication key.
- `port`: TCP forwarding port (required).
- `hostname`: TCP forwarding hostname (required).
- `remote`: Remote TCP forwarding (default: `false`).
- `retry`: Retry failed connections (default: `true`).
- `retryInterval`: Retry interval in ms (default: 10000).

Remote forwarding (`remote: true`) means wstcp-client listens for incoming
TCP connections and forwards them to wstcp-server. Local forwarding
(`remote: false`) means incoming TCP connections are forwarded from wstcp-server
to wstcp-client.

License
-------

[MIT](LICENSE.md)
