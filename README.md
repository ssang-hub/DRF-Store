# Getting Started

This project is a web app for ecommerce that includes the features: Login/Resgister, Product Catalog, Product Review, Shopping Cart, Order Management, Payment.

## Prerequisites

- Install [Node.js](https://nodejs.org/en/) version 18.x.x
- Install [Python](https://www.python.org/) version 3.10.x

## Installation & Configuration

- Clone the repository

```
git clone  https://github.com/ssang-hub/store_drf.git <project_name>
```

- Install and create virtual environment on server

```
cd <project_name>
cd api
sudo apt install python3-virtualenv
virtualenv venv
source ./venv/bin/activate
```

- Install dependencies on server

```
pip install -r requirements.txt
```

- Install dependencies on client

```
cd ..
cd client
yarn install
```

- Change 2 files `.env.example` to `.env`

## Create database

- Run command

```
cd api
python manage.py migrate
```

## Running the Application

- Run server

```
cd api
python manage.py runserver
```

- Run client

```
cd client
yarn start
```

### Building and running your application with docker

- Clone the repository

```
git clone  https://github.com/ssang-hub/store_drf.git <project_name>
```

When you're ready, start your application by running:

- Run server

```
cd api
docker compose up -d
```

Restart container api

- Run client

```
cd client
docker compose up
```

Your application will be available at http://localhost:3000.
