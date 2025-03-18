# Delightree take home assignment

## Task Statement

> You are working for a fast-growing e-commerce platform that tracks orders, customers, and products. The company needs a GraphQL API to analyze revenue, customer spending behavior, and product sales trends. Your task is to design GraphQL queries and aggregations that efficiently retrieve the required insights.

### Prerequisites

> Make sure to install the following before using the api

1. NodeJs `>= v20.15.1`
2. [Docker](https://docs.docker.com/engine/install/)

## Setup Instructions

### Install node dependencies

```
npm install
```

### Start the database and Redis cache

```
npm run infra:dev:run
```

### Start the server (dev)

```
npm run dev
```

### After this Apollo router will be available on

```
http://localhost:9000/graphql
```
