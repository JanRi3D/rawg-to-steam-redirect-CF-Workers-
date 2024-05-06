# RAWG to Steam Redirect 💬🚂

> All credit goes to [Toylerrr](https://github.com/Toylerrr) who conceived the idea and initiated this project.

Welcome to the RAWG to Steam Redirect API, a drop-in replacement for `api.rawg.io` that seamlessly redirects requests to the publicly available Steam API.

## Motivation 🚀

This Project was kickstarted by our trusted community member [Toylerrr](https://github.com/toylerrr) to have a quick replacement for the currently unreliable and unmaintained [RAWG.IO](https://rawg.io) API in [GameVault](https://gamevau.lt).

The transition from GameVault to move off of RAWG will likely require a significant amount of time and effort, prompting the need for a swift resolution.

## Supported APIs 🤖

### `/api/games?search=query`

Use this endpoint to search for games.

#### Parameters

- `search`: The query string to search for.
  - in: query
  - required: true
- `key`: A [Steam Web API Key](https://steamcommunity.com/dev/apikey). Less data will be returned if not provided.
  - in: query
  - required: false

### `/api/games/:id`

This endpoint retrieves detailed information about a specific game.

#### Parameters

- `id`: The Steam ID of the game to retrieve.
  - in: path
  - required: true
- `key`: A [Steam Web API Key](https://steamcommunity.com/dev/apikey). Less data will be returned if not provided.
  - in: query
  - required: false

## Setup ⚙️

### Hosted Instance ☁️

Access a publicly available hosted instance by [Phalcode](https://phalco.de) is available at [https://rawg2steam.phalco.de](https://rawg2steam.phalco.de).

### Setting Up Your Own Instance 🛠️

You can easily set up the API yourself using Docker-Compose. Just add the following to your `docker-compose.yml` file:

```yml
version: "3.8"
services:
  rawg-to-steam-redirect:
    image: phalcode/rawg-to-steam-redirect:latest
    ports:
      - "80:9999"
    restart: always
```

## Tips for Usage with GameVault 🎲

- Set the `RAWG_API_URL` environment variable to `https://rawg2steam.phalco.de/api` to redirect the requests to the hosted instance.
- Set the `RAWG_API_KEY` environment variable to a Steam Web API Key if you have one. Otherwise, less data will be returned.
- Set `RAWG_API_CACHE_DAYS` to `36500`, so GameVault does not try to search for rawg ids of existing games on steam for the next 100 years.

## Credit 💡

- [Toylerr](https://github.com/Toylerrr) - for the idea and initial development of this project.

- [python-steam-api](https://github.com/deivit24/python-steam-api) - for the Python Steam API Library.

- [flask](https://github.com/pallets/flask) - for the framework used in the project.
