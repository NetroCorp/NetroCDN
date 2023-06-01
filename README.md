# NetroCDN

The official CDN used by Netro Corporation!

(Some code is based on the NetroAPI.)

[![ISC License](https://shields.io/github/license/NetroCorp/NetroCDN)](https://opensource.org/license/isc-license-txt/)


## Features

- [PICS] Automatically rotate JPEG/JPG to correct orientation based on EXIF.
- [PICS] Automatically convert to different formats.
- [PICS] Automatically find the file regardless of requested format.
- Simple and easy to set up and run.
- Uses [sharp](https://npmjs.com/package/sharp) to make everything smooth and [Express](https://npmjs.com/package/express) to handle the requests.
- Custom reference number system that requesters could give to you to fix issues (stores in a log file - can be customized to store in a database)!


## Run Locally

### Inital Setup
Clone the project

```bash
  git clone https://github.com/NetroCorp/NetroCDN
```

Go to the project directory...

```bash
  cd NetroCDN
```

Install the dependencies!

```bash
  npm install
```

### Running
You can run this with PM2:
```bash
  pm2 start
```
or normally:

```bash
  npm run prod
```

### That's it!
Now all you need to do is either port forward or run behind a proxy.


## Contributing

We don't typically accept contributions to NetroCDN, but if there is something you'd like to add, we'll see what we can do.

If there is a bug you'd like to report, make sure to open a issue first. Thanks!


```
Copyright Netro Corporation 2023. Licensed under ISC.
Please respect and include this information somewhere in your project.
```