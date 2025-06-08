# Clean Architecture Book API

A Node.js REST API built with Express, TypeScript, and SQLite following Clean Architecture principles.

## Architecture Overview

This project implements Clean Architecture with the following layers:

- **Core Layer**: Business logic, entities, and use cases
- **Infrastructure Layer**: Database, logging, and external services
- **Interface Layer**: Controllers, routes, and DTOs
- **Shared Layer**: Common utilities and middleware

## Project Structure

```
src/
├── app.ts                             # App entry point
├── core/                              # Business logic
│   ├── entities/                      # Domain entities
│   │   └── book.entity.ts
│   ├── ports/                         # Interfaces (ports)
│   │   ├── iRepository/
│   │   │   └── iBookRepository.ts
│   │   ├── payloads/
│   │   │   ├── create-book.payload.ts
│   │   │   └── update-book.payload.ts
│   │   └── logger.port.ts             # Logger interface
│   └── use-cases/                     # Business use-cases
│       ├── create-book.use-case.ts
│       ├── get-book.use-case.ts
│       └── list-books.use-case.ts
├── infrastructure/
│   ├── db/
│   │   └── type-orm/                  # TypeORM adapters
│   │       ├── book/
│   │       │   ├── book.entity.ts
│   │       │   └── book.repository.ts
│   │       └── data-source.ts        # TypeORM DataSource config
│   ├── logger/
│   │   ├── winston-logger.adapter.ts # Winston implementation
│   │   └── winston-logger.config.ts
│   └── providers/
│       └── container.ts              # Dependency injection (tsyringe)
├── interface/
│   ├── controllers/
│   │   └── book.controller.ts        # Controller class
│   ├── routes/
│   │   └── book.route.ts             # Express router
│   └── dto/
│       ├── create-book.dto.ts        # Zod request schema
│       └── book-response.dto.ts      # TSOA-style response DTO
└── shared/
    └── middleware/
        └── validate-request.middleware.ts # Custom validation middleware
```

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