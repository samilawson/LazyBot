[![Node Version](https://img.shields.io/node/v/markit-on-demand.svg?maxAge=60)](https://www.npmjs.com/package/markit-on-demand) [![NPM Version](https://img.shields.io/npm/v/markit-on-demand.svg?maxAge=60)](https://www.npmjs.com/package/markit-on-demand)  [![NPM License](https://img.shields.io/npm/l/markit-on-demand.svg?maxAge=60)](https://www.npmjs.com/package/markit-on-demand) 

[![Build Status](https://drone.stackdot.com/api/badges/stackdot/markit-on-demand/status.svg?maxAge=60)](https://drone.stackdot.com/stackdot/markit-on-demand) [![dependencies Status](https://img.shields.io/david/stackdot/markit-on-demand.svg?maxAge=60)](https://david-dm.org/stackdot/markit-on-demand) [![Coverage Status](https://coveralls.io/repos/github/stackdot/markit-on-demand/badge.svg?branch=master)](https://coveralls.io/github/stackdot/markit-on-demand?branch=master)





Markit On Demand
===

Markit On Demand JS Lib







Requirements:
---

- [NodeJS](https://nodejs.org/en/download/) ( Version 6+ )
 - We recommend using [Node Version Manager](https://github.com/creationix/nvm)






To Get Started:
---

- Install the package in your project

```bash
npm install markit-on-demand --save
```

To use:
```javascript

const Markit = require('markit-on-demand')

Markit.lookup('Amazon')
	.then(( res ) => {
		console.log('Results:', res)
	})

```


[JSDocs Documentation](https://stackdot.github.io/markit-on-demand/index.html)








Enabling the Debugger
---

To enable [debug](https://github.com/visionmedia/debug) logs, enable them via environment variables.

To see all debug logs from this app, set the env variable:

```bash
DEBUG=markit-on-demand*
```

Running with your project:

```bash
DEBUG=markit-on-demand* node myproject.js
```










License
----

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
