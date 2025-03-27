# New Portfolio

https://magdihazaa.art/

### npm run lint

Lints codebase (root folder and backend, fronend, and sanity workspaces)

### npm run build

Lints project, then compiles both frontend and backend files

### npm run start

Stops and cleans project, then rebuilds project (including linting) and restarts a PM2 server at **localhost:3000**

### npm run start-and-deploy-sanity

Same as start command, but also deploys Sanity studio to **https://mhazaa.sanity.studio**

### npm run stop

Kills PM2 server

### npm run dev

Spins a dev server at **localhost:3000** for the project, and a sanity dev server at **localhost:3333**

### npm run deploy-sanity

Lints Sanity, then deploys Sanity studio to **https://mhazaa.sanity.studio**

### npm run clean

Cleans all build files and folders

### npm run nuke

Cleans all build files and folder AND removes all node_modules folder and package-lock.json files

- Metric post id if name change
- sanity deploy on server