## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Configuration](#configuration)
* [Setup](#setup)

## General info
Emotebox is an emoji manager for Discord. Easily manage, add, or create emojis for your servers

## Technologies
* Reactjs
* Express
* AWS S3
* Mongodb Atlas
* Node

## Configuration

### Environment Variables
| Variable                | Description                                                       |
| ----------------------- | ----------------------------------------------------------------- |
| `MONGODB_URL`           | **Required.** MongoDB connection URL                              |
| `AWS_ACCESS_ID`         | **Required.** AWS crediential access ID                           |
| `AWS_SECRET_KEY`        | **Required.** AWS crediential access KEY                          |
| `AWS_BUCKET_NAME`       | **Required.** AWS bucket name (default: emotebox)                 |
| `DISCORD_CLIENT_SECRET` | **Required.** Discord Bot Client Secret                           |
| `DISCORD_CLIENT_ID`     | **Required.** Discord Bot Client ID                               |
| `PUBLIC_URL`            | **Development Var.** React URL (default: localhost:3000) |
| `BASE_URL`              | **Development Var.** API URL (default: localhost:5000)   |
| `PORT`                  | Serverhost port (default: 5000)                                   |

## Setup
To run this project, install it locally
```
git clone https://github.com/khai93/emotebox.git
cd emotebox
yarn
cd client
yarn
cd ..
yarn dev
```
