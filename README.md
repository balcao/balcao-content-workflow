# Balcao Content Workflow

Node and TS scripts for Balcao content workflow - scheduled job podcast feeds, create IPFS docs, indexing etc.

## Installation

Use npm or yarn.

```bash
npm install
```

## Usage
Start the application in development using nodemon and ts-node to do cold reloading.

```bash
npm run start:dev
```

Do a clean build
```bash
npm run start
```

Clean build and run
```bash
npm run start:prod
```

## Data Models
Generate models using [sequelize-auto](https://github.com/sequelize/sequelize-auto)
```bash
npm install sequelize-auto --include=dev
npx sequelize-auto -o "./src/models" -d postgres -h localhost -u postgres -p 54322 -x postgres -e postgres -t channels podcasts podcasts_pages stories topics -l ts
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Reference
1. [TypeScript Tutorial 01](https://www.digitalocean.com/community/tutorials/typescript-running-typescript-ts-node)
2. [TypeScript Tutorial 02](https://khalilstemmler.com/blogs/typescript/node-starter-project/)

## License
[MIT](https://choosealicense.com/licenses/mit/)