---
layout: post
title:  "Configuración"
date:   2025-03-05 11:00:00 +0100
categories: docs
lang: es
ref: configuration
description: >-
  Dónde busca Strom su carpeta de configuración, qué contienen los cuatro
  archivos y cada parámetro de la casa con su valor por defecto y unidad.
---
Strom lee todos los ajustes personales de una única **carpeta de configuración**: claves de API, credenciales del enchufe inteligente y (opcionalmente) los parámetros de tu casa. Todo se valida al arrancar, antes de cualquier llamada de red u operación con el dispositivo, así que los errores aparecen de inmediato con un mensaje accionable.

## Dónde busca Strom la carpeta de configuración

La carpeta de configuración se resuelve en este orden:

1. La opción de línea de comandos `--config-dir`, p. ej. `strom --config-dir ~/Strom/config`
2. La variable de entorno `STROM_CONFIG_DIR`
3. La primera carpeta `config/` encontrada en tu directorio actual o en cualquiera de sus padres
4. `./config` como último recurso

Strom nunca cambia su directorio de trabajo, así que puede ejecutarse desde cualquier sitio (p. ej. desde un cron).

## Los cuatro archivos

| Archivo | Obligatorio | Contenido |
|---------|-------------|-----------|
| `weather_api_key.txt` | sí | Clave de API de OpenWeatherMap |
| `price_api_key.txt` | sí | Clave de API de ENTSO-E |
| `tapologin.env` | sí | Credenciales del enchufe inteligente |
| `house_config.json` | no | Parámetros térmicos de la casa |

## Claves de API

Pon cada clave en su propia línea en el `.txt` correspondiente. Alternativamente, puedes usar las variables de entorno `WEATHER_API_KEY` y `PRICE_API_KEY` — tienen prioridad sobre los archivos.

## Credenciales del enchufe inteligente

`tapologin.env` es un archivo `.env` estándar con tres entradas obligatorias:

```env
EMAIL=micorreo@hotmail.com
PASSWORD=miPhone1234
DEVICEIP=192.168.1.42
```

`EMAIL` y `PASSWORD` son las credenciales de tu cuenta de TP-Link; `DEVICEIP` es la dirección IP local de tu enchufe inteligente Kasa. Los mismos tres nombres también funcionan como variables de entorno, que tienen prioridad sobre el archivo.

## Parámetros de la casa

`house_config.json` es opcional. Si falta, Strom usa los valores por defecto de abajo y registra esa decisión. Si está presente pero mal formado —JSON inválido, tipos incorrectos, claves desconocidas o valores físicamente inválidos— Strom falla de inmediato con un error que señala el problema, en lugar de adivinar.

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

| Clave | Por defecto | Unidad | Significado |
|-------|-------------|--------|-------------|
| `C_air` | 0.56 | kWh/°C | Capacidad térmica del aire interior: cuánta energía hace falta para calentar el aire 1 °C |
| `C_wall` | 3.5 | kWh/°C | Capacidad térmica de los muros: cuánta energía pueden almacenar |
| `R_interior` | 1.0 | °C/kW | Resistencia térmica entre aire y muros |
| `R_exterior` | 6.06 | °C/kW | Resistencia térmica entre muros y exterior. Valores mayores significan mejor aislamiento |
| `Q_heater` | 2.0 | kW | Potencia máxima de calefacción |
| `Q_cooling` | 0.0 | kW | Potencia máxima de refrigeración. `0.0` desactiva la refrigeración |
| `T_min` | 18.0 | °C | Temperatura interior mínima permitida |
| `T_max` | 24.0 | °C | Temperatura interior máxima permitida |
| `T_interior_init` | 18.5 | °C | Temperatura interior al empezar la ejecución. Debe estar dentro de `[T_min, T_max]` |
| `T_wall_init` | 18.5 | °C | Temperatura de los muros al empezar la ejecución |
| `P_base` | 0.01 | €/kWh | Coste fijo de red (impuestos, peajes) que se añade a todos los precios de mercado |
| `freq` | "1h" | — | Intervalo de control como offset de pandas, p. ej. `"1h"` o `"15min"` |

Dos unidades merecen una explicación: **kWh/°C** es almacenamiento térmico —una capacidad de 0,56 kWh/°C significa que la calefacción debe gastar 0,56 kWh para subir un grado el aire de la habitación—. **°C/kW** es resistencia térmica —una resistencia de muro de 6,06 °C/kW significa que una diferencia de 1 °C a través del muro solo deja pasar 1/6,06 kW—.

`P_base` existe porque la factura eléctrica de un consumidor nunca llega a cero aunque el precio de mercado del día sí lo haga: los impuestos y peajes de red se añaden sobre el precio de mercado.

## Cuando la validación falla

Todo problema de configuración detiene la ejecución con código de salida 1 y un mensaje que dice qué hacer, por ejemplo:

- Una clave ausente indica qué archivo o variable de entorno configurar.
- Una clave desconocida en `house_config.json` muestra las claves desconocidas y la lista de claves admitidas.
- Un JSON inválido informa de la línea y la columna.
- `T_min >= T_max` o una temperatura inicial fuera de la banda de confort se rechazan antes de ejecutar el solver.
