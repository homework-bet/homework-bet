## Installation

1. [Install and start MongoDB](https://docs.mongodb.com/manual/installation/)
1. [Install node.js and npm](https://nodejs.org/en/download/) (or use [homebrew](https://changelog.com/posts/install-node-js-with-homebrew-on-os-x))
1. Navigate to the homework-bet folder.
1. `cp app_settings.json.template app_settings.json`
1. Adjust app_settings.json (if desired)
1. `npm install`
1. `node populate_db.js` (if desired)
1. `npm start`


#To run on C9
1. Follow instructions above except for install/start MongoDB
1. Install/start Mongo (small changes below) https://community.c9.io/t/setting-up-mongodb/1717
  1. `sudo apt-get install -y mongodb-org`
  1. `mkdir c9_data`
  1.  `echo 'mongod --bind_ip=$IP --dbpath=c9_data --nojournal --rest "$@"' > mongod`
  1. `chmod a+x mongod`
  1.  Run mongo with `./mongod`
1. Use these in app_settings.json.
    "port":    8080,
    "ip": "0.0.0.0"

1. Open another terminal to start the app with `npm start`

