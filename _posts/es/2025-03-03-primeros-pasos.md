---
layout: post
title:  "Primeros pasos"
date:   2025-03-05 09:00:00 +0100
categories: docs
lang: es
ref: getting-started
---
Strom es un script libre y de código abierto para calefacción inteligente. Utiliza previsiones meteorológicas y los **precios de electricidad day-ahead** —los precios horarios de un mercado eléctrico que se publican con un día de antelación— para encontrar el calendario de calefacción más barato que mantiene tu hogar confortable. El calendario se calcula con **optimización convexa**, una técnica matemática que encuentra de forma demostrable el mejor calendario posible en lugar de una buena suposición. Un enchufe inteligente se encarga de ejecutarlo.

Esta documentación te guiará en la puesta en marcha del sistema Strom.

## Cómo funciona una ejecución

Cada vez que ejecutas Strom, este:

1. **Valida tu configuración** — credenciales, claves de API y parámetros de la casa se comprueban antes que nada. Un error detiene la ejecución con un mensaje claro en lugar de una sorpresa posterior.
2. **Encuentra tu enchufe inteligente** en la red.
3. **Obtiene los datos** — una previsión meteorológica de OpenWeatherMap y los precios de electricidad day-ahead de la plataforma de transparencia de ENTSO-E.
4. **Calcula el calendario de calefacción más barato** para las próximas 24 horas (configurable).
5. **Controla el enchufe durante la hora actual** mediante un ciclo de trabajo acotado: si el optimizador decide un 40% de calefacción para esta hora, el enchufe está ENCENDIDO 24 minutos y APAGADO el resto. Un vigilante independiente fuerza el APAGADO si el enchufe permanece encendido más de 3 horas seguidas.

## Características principales

- Obtención de datos meteorológicos en tiempo real mediante la API de OpenWeatherMap
- Recuperación de precios de electricidad desde la API de ENTSO-E
- Optimización convexa (con CVXPY) para decisiones de calefacción rentables
- Control de un enchufe inteligente TP-Link Kasa mediante la librería Kasa
- Ciclo de trabajo acotado con un vigilante independiente de encendido máximo
- Comportamiento fail-fast: una configuración inválida, huecos en la cobertura de datos o fallos del solver producen errores claros en lugar de suposiciones silenciosas
- Herramientas de visualización para analizar estrategias de calefacción y ahorro de costes

## Qué necesitas

- Python **3.12.8** (Strom está fijado a la serie 3.12)
- Un enchufe inteligente TP-Link Kasa con una dirección IP conocida
- Claves de API de [OpenWeather](https://openweathermap.org/appid) y [ENTSO-E](https://transparency.entsoe.eu/content/static_content/Static%20content/web%20api/Guide_prod_backup_06_11_2024.html#_authentication_and_authorisation)
- Una conexión de red

## Por dónde seguir

1. [Instalación]({{ site.baseurl }}/es/instalacion) — pon Strom en marcha
2. [Configuración]({{ site.baseurl }}/es/configuracion) — claves de API, credenciales del enchufe y parámetros de la casa
3. [Uso]({{ site.baseurl }}/es/uso) — ejecutar Strom y entender qué hace
4. [Personalización]({{ site.baseurl }}/es/personalizacion) — tu ciudad, tu país, tu casa
5. [Ejemplo de uso]({{ site.baseurl }}/es/ejemplo-de-uso) — un caso de estudio con ahorros reales
6. [Contribuir]({{ site.baseurl }}/es/contribuir) — cómo ayudar
