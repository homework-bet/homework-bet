## Pulling in changes

When pulling in new changes:

1. `git pull` to pull in changes from upstream or `git pull repo_name branch_name` to pull from a specific repo and branch.
1. `npm install` to resolve dependency changes.
1. Drop database table, if needed.
  1. `mongo` to open the mongo console.
  1. `use dbname` to select the correct database (probably `homework-bet-dev`)
  1. `db.dropDatabase()` to drop the database.
1. Check if `app_settings.json.template` has any new values that need to be reflected in your `app_settings.json`.
1. `npm test` to verify that the code is passing tests.
1. `npm start` to start the server.

## Local Instructions

Installing and running this app locally (tested on Mac).

1. [Install and start MongoDB](https://docs.mongodb.com/manual/installation/)
  1. Using homebrew is a good option for Mac.
1. [Install node.js and npm](https://nodejs.org/en/download/) (or use [homebrew](https://changelog.com/posts/install-node-js-with-homebrew-on-os-x))
1. Navigate to the homework-bet folder.
1. `cp app_settings.json.template app_settings.json` to create a local copy of the settings.
1. Adjust app_settings.json (if desired)
1. `npm install` to resolve dependencies
1. `node populate_db.js` (if desired)
1. `npm start` to start the server.


## C9 Instructions

Installing and running this app on [c9.io](https://c9.io/)
1. Follow local instructions above except for install/start MongoDB
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

