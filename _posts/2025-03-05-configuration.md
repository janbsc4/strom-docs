---
layout: post
title:  "Configuration"
date:   2025-03-05 11:00:00 +0100
categories: docs
lang: en
ref: configuration
---
Strom reads all personal settings from a single **config folder**: API keys, smart plug credentials and (optionally) your house parameters. Everything is validated at startup, before any network call or device operation, so mistakes surface immediately with an actionable error.

## Where Strom looks for the config folder

The config directory is resolved in this order:

1. The `--config-dir` command-line flag, e.g. `strom --config-dir ~/Strom/config`
2. The `STROM_CONFIG_DIR` environment variable
3. The first `config/` folder found in your current directory or any of its parents
4. `./config` as a last resort

Strom never changes its working directory, so it can be run from anywhere (e.g. from a cron job).

## The four files

| File | Required | Contains |
|------|----------|----------|
| `weather_api_key.txt` | yes | OpenWeatherMap API key |
| `price_api_key.txt` | yes | ENTSO-E API key |
| `tapologin.env` | yes | Smart plug credentials |
| `house_config.json` | no | House thermal parameters |

## API keys

Put each key on its own line in the corresponding `.txt` file. Alternatively, you can set the `WEATHER_API_KEY` and `PRICE_API_KEY` environment variables — those take precedence over the files.

## Smart plug credentials

`tapologin.env` is a standard `.env` file with three required entries:

```env
EMAIL=myemail@hotmail.com
PASSWORD=myPassword12
DEVICEIP=192.168.1.42
```

`EMAIL` and `PASSWORD` are your TP-Link account credentials; `DEVICEIP` is the local IP address of your Kasa smart plug. The same three names also work as environment variables, which take precedence over the file.

## House parameters

`house_config.json` is optional. If it is missing, Strom uses the defaults below and logs that decision. If it is present but malformed — bad JSON, wrong types, unknown keys or physically invalid values — Strom fails fast with an error that names the problem, instead of guessing.

```json
{
    "C_air": 0.56,
    "C_wall": 3.5,
    "R_interior": 1.0,
    "R_exterior": 6.06,
    "Q_heater": 2.0,
    "Q_cooling": 0.0,
    "T_min": 18.0,
    "T_max": 24.0,
    "T_interior_init": 18.5,
    "T_wall_init": 18.5,
    "P_base": 0.01,
    "freq": "1h"
}
```

| Key | Default | Unit | Meaning |
|-----|---------|------|---------|
| `C_air` | 0.56 | kWh/°C | Heat capacity of the indoor air: how much energy it takes to warm the air by 1 °C |
| `C_wall` | 3.5 | kWh/°C | Heat capacity of the walls: how much energy the walls can store |
| `R_interior` | 1.0 | °C/kW | Thermal resistance between air and walls |
| `R_exterior` | 6.06 | °C/kW | Thermal resistance between walls and outdoors. Larger values mean better insulation |
| `Q_heater` | 2.0 | kW | Maximum heating power |
| `Q_cooling` | 0.0 | kW | Maximum cooling power. `0.0` disables cooling |
| `T_min` | 18.0 | °C | Lowest allowed indoor temperature |
| `T_max` | 24.0 | °C | Highest allowed indoor temperature |
| `T_interior_init` | 18.5 | °C | Indoor temperature when the run starts. Must lie within `[T_min, T_max]` |
| `T_wall_init` | 18.5 | °C | Wall temperature when the run starts |
| `P_base` | 0.01 | €/kWh | Fixed grid fee (taxes, tolls) added on top of every market price |
| `freq` | "1h" | — | Control interval as a pandas offset, e.g. `"1h"` or `"15min"` |

Two units are worth a word: **kWh/°C** is thermal storage — an air heat capacity of 0.56 kWh/°C means the heater must spend 0.56 kWh to raise the room air by one degree. **°C/kW** is thermal resistance — a wall resistance of 6.06 °C/kW means a 1 °C difference across the wall lets only 1/6.06 kW flow through.

`P_base` exists because consumer electricity bills never reach zero even when the day-ahead market price does: taxes and grid tolls are added on top of the market price.

## When validation fails

Every configuration problem stops the run with exit code 1 and a message that says what to do, for example:

- A missing key reports which file or environment variable to set.
- An unknown key in `house_config.json` reports the unknown keys and lists all supported keys.
- Invalid JSON reports the line and column.
- `T_min >= T_max` or an initial temperature outside the comfort band is rejected before the solver runs.
