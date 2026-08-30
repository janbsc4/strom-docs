---
layout: post
title:  "Personalización"
date:   2025-03-07 11:57:47 +0100
categories: docs
lang: es
ref: customization
description: >-
  Adapta Strom a tu ciudad, tu zona de precios de ENTSO-E y tu casa:
  ubicación meteorológica, modos de optimización, datos y ciclo de trabajo.
---
Strom viene con valores por defecto para Barcelona y España, pero todas las entradas son ajustables: tu ciudad, tu zona de precios y tu casa.

## Ubicación meteorológica

El tiempo lo proporciona la API de previsión de OpenWeatherMap. La ciudad es el primer argumento de `get_weather_data`, que se pasa como parámetro `q`:

```python
from strom import get_weather_data

weather = get_weather_data(city="Madrid, ES")
```

Formatos de ejemplo: `"Barcelona, ES"`, `"Madrid, ES"`, `"Berlin, DE"`, `"Paris, FR"`, `"London, GB"`, `"Rome, IT"` — cualquier cadena que la API de OpenWeatherMap acepte para su parámetro `q` funciona.

## Zona de precios de electricidad

Los precios provienen de la plataforma de transparencia de ENTSO-E, que publica precios day-ahead por zona de bidding. La zona por defecto es `"ES"` (España):

```python
from strom import get_price_series

prices = get_price_series(zone="ES")
```

## Parámetros de la casa

El modelo térmico de tu casa —capacidades caloríficas, aislamiento, potencia de la calefacción, banda de confort y más— se configura mediante `house_config.json`. Consulta [Configuración]({{ site.baseurl }}/es/configuracion) para ver la tabla completa de parámetros y las reglas de validación.

## Modos de optimización

El optimizador (`find_heating_output`) funciona en dos modos:

- **`optimal`** minimiza el coste eléctrico manteniendo la temperatura interior dentro de `[T_min, T_max]`. Es lo que usa una ejecución normal.
- **`baseline`** sigue una temperatura objetivo (una media suavizada de 24 horas de la temperatura exterior, recortada a la banda de confort) con un término de coste pequeño. Imita un termostato común y existe como estrategia de referencia para comparar.

`compare_output_costs` ejecuta ambos modos con los mismos datos y devuelve ambos calendarios, que es la base de las comparaciones de costes del [ejemplo de uso]({{ site.baseurl }}/es/ejemplo-de-uso).

Ambos modos resuelven un problema de optimización convexa, así que el solver devuelve un calendario demostrablemente el más barato (o el que mejor sigue la referencia) en lugar de una heurística.

## Cómo se tratan los datos

Strom nunca inventa datos:

- Las observaciones meteorológicas (cada 3 horas, de OpenWeatherMap) se interpolan linealmente a valores horarios, pero solo donde hay una observación real a menos de 3 horas; huecos mayores lanzan un `CoverageError`.
- Los precios nunca se interpolan. Cada precio pertenece a su intervalo de mercado exacto; un intervalo sin publicar reutiliza el precio anterior durante 1 hora como máximo y después la ejecución se detiene.
- Todas las marcas horarias se gestionan en UTC internamente, así que los resultados son coherentes en los cambios de horario de verano.

## Cómo se gobierna el enchufe

Un enchufe inteligente solo puede estar ENCENDIDO o APAGADO, pero el optimizador produce valores fraccionarios entre 0 y 1. Strom salva la distancia con un **ciclo de trabajo**: dentro de cada intervalo de control, el enchufe está ENCENDIDO exactamente la fracción que pidió el optimizador y APAGADO el resto. Los encendidos de menos de 60 segundos se redondean al alza para no castigar el relé, y un vigilante independiente del optimizador fuerza el APAGADO tras 3 horas de encendido continuo como red de seguridad.

## Programación

Para un funcionamiento automatizado, ejecuta `strom` a intervalos regulares — la cadencia recomendada es una vez por hora. Ver [Uso]({{ site.baseurl }}/es/uso#programar-las-ejecuciones) para un ejemplo de cron.
