# boilerplate-cleanarchi

## Quick start

As the project uses Yarn zero-install, there is no need to install the
dependencies.

You can run the project locally with:

```sh
$ yarn dev
```

## Database migrations

If you have made changes to database entities and need to generate a new
migration, you can do so by issuing the following command:

```sh
$ yarn run typeorm migration:generate -d src/infrastructure/db/data-source.ts src/infrastructure/db/migrations/create-table-book
```