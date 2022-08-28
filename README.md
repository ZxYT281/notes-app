# Notes App in React and Django

This is a simple notes app made in React for frontend and Django for backend

## Installation

Clone the repo

```bash
  git clone https://github.com/DivyanshuLohani/notes-app
```

Install the requirements

```bash
  cd server
```

Then run

```bash
  pip install -r requirements.txt
```

Then start the server with

```bash
  python manage.py runserver
```

### For React server

```bash
  cd client
```

Install the node requirements

```bash
  npm i
```

Run the server with

```bash
  npm start
```

## Features

- Create User account so your notes remain safe
- Notes are stored on the server
- Frontend in material UI
- Backend in Django
- With refresh and access tokens

## API Reference

### Authentication

#### Login

```http
  POST /auth/login/
```

Login to an existing user
| Parameter | Type | Description |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. Email for a user |
| `password` | `string` | **Required**. Password for a user |

#### Register

Register a new user

```http
  POST /auth/register/
```

| Parameter  | Type     | Description                        |
| :--------- | :------- | :--------------------------------- |
| `name`     | `string` | **Required**. Name of new user     |
| `email`    | `string` | **Required**. Email of new user    |
| `username` | `string` | **Required**. Username of new user |
| `password` | `string` | **Required**. password of new user |

#### Logout

Logs the user out.

```http
  POST /auth/logout/
```

#### Refresh

Refresh The access token for the user

```http
  POST /auth/refresh/
```

| Parameter     | Type     | Description                            |
| :------------ | :------- | :------------------------------------- |
| `accessToken` | `string` | **Required**. Header; User accessToken |

### Notes API

#### Get all notes of a user

```http
 GET /api/notes/notes
```

| Parameter     | Type     | Description                            |
| :------------ | :------- | :------------------------------------- |
| `accessToken` | `string` | **Required**. Header; User accessToken |

#### Create a user note

```http
  POST /api/notes/note
```

| Parameter     | Type     | Description                            |
| :------------ | :------- | :------------------------------------- |
| `title`       | `string` | **Required**. title of the note        |
| `content`     | `string` | **Required**. content of note          |
| `accessToken` | `string` | **Required**. Header; User accessToken |
| `category`    | `string` | (Optional) category of the note        |

#### Delete a user note

```http
  DELETE /api/notes/note/{note-id}/delete
```

| Parameter     | Type     | Description                            |
| :------------ | :------- | :------------------------------------- |
| `accessToken` | `string` | **Required**. Header; User accessToken |
