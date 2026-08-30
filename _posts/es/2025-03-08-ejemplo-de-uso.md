---
layout: post
title:  "Ejemplo de uso"
date:   2025-03-08 09:57:47 +0100
categories: docs
lang: es
ref: usage-example
description: >-
  Un caso de estudio de dos años en Barcelona: la programación consciente
  de precios de Strom ahorró un 17% — 66 € — frente a un termostato
  constante.
---
La idea del proyecto Strom nació al ver las enormes fluctuaciones del precio de la energía en España. Como la calefacción tiene cierta flexibilidad —en qué momento la enciendes—, hay una oportunidad para elegir las horas óptimas y bajar la factura de la energía.

<figure class="image-container">
  <img
  src="{{ site.baseurl }}/assets/images/screenshot-energy-2025.PNG"
  alt="Captura de la fluctuación del precio de la energía a lo largo de un día"
  style="width: 50%; height: auto;"
  >
  <figcaption class="image-caption">Captura de la fluctuación del precio de la energía a lo largo de un día</figcaption>
</figure>

## Prueba de concepto en un hackathon
Durante un fin de semana de enero de 2025 escribimos el código principal de Strom. Conseguimos que funcionara e interactuara correctamente con el enchufe inteligente que compramos. Aunque había mucho margen de mejora, celebramos aquel primer logro de "montaje mínimo viable".

## Caso de estudio

Modelamos una casa como un sistema acoplado de dos componentes: el aire interior de la vivienda y su muro aislado.

El ritmo al que baja la temperatura interior depende tanto del calor contenido en el aire (su capacidad calorífica, `C_air`) como de la facilidad con la que se intercambia calor con el muro (su resistencia térmica, `R_interior`). El muro aislado tiene su propia capacidad calorífica (`C_wall`) y su resistencia térmica (`R_exterior`).

El precio de la electricidad que pagan los consumidores particulares sigue aproximadamente el precio de mercado del día anterior, que puede obtenerse mediante una API abierta. Sin embargo, suele tener un coste mínimo que no llega a cero aunque el precio del mercado llegue a hacerlo. Incluimos ese suelo de impuestos como parámetro variable, `P_base`, en nuestro modelo.

Los parámetros térmicos de la casa se tomaron del estupendo artículo del blog de Michael de Podesta, disponible [aquí](https://protonsforbreakfast.wordpress.com/2022/12/19/estimating-the-heat-capacity-of-my-house/) (en inglés).

| Parámetro              | Valor | Unidades | Descripción                                     |
|------------------------|-------|----------|-------------------------------------------------|
| `C_air`                | 0.56  | kWh/°C   | Capacidad calorífica del aire interior          |
| `C_wall`               | 3.5   | kWh/°C   | Capacidad calorífica del muro aislado           |
| `R_interior`           | 1.0   | °C/kW    | Resistencia térmica entre aire y muro           |
| `R_exterior`           | 6.06  | °C/kW    | Resistencia térmica entre muro y exterior       |
| `T_min`                | 18.0  | °C       | Temperatura interior mínima permitida           |
| `T_max`                | 24.0  | °C       | Temperatura interior máxima permitida           |
| `T_interior_init`      | 18.5  | °C       | Temperatura interior inicial                    |
| `T_wall_init`          | 18.5  | °C       | Temperatura inicial del muro                    |
| `Q_heater`             | 2.0   | kW       | Potencia de la unidad de calefacción            |
| `Q_cooling`            | 2.0   | kW       | Potencia de la unidad de refrigeración          |
| `P_base`               | 0.01  | €/kWh    | Precio base estimado del proveedor              |
| `freq`                 | 5min  | —        | Resolución de la simulación                     |

El muro actúa como una batería térmica, y un patrón de calefacción inteligente puede cargarlo.

Comparamos dos escenarios:
1. Un **caso base** con un termostato constante fijado a la temperatura objetivo `T_target`. Se calcula como la temperatura media semanal recortada a la temperatura de confort.
2. Un caso **optimizado por coste eléctrico**, donde la calefacción se programa según los precios previstos de la electricidad. Ambos escenarios operan dentro del rango de temperatura `[T_min, T_max]`.

Elegimos una serie de periodos históricos ilustrativos para mostrar las propiedades de la política optimizada. Los gráficos de abajo pueden reproducirse con los scripts de la carpeta `case_study/` del repositorio.

## Análisis histórico


### 25 de noviembre

<figure class="image-container">
  <img
  src="{{ site.baseurl }}/assets/images/compare_costs_temps_Barcelona_25th_Nov.png"
  alt="Comparación entre nuestra política óptima consciente de costes y la política de termostato constante el 25 de noviembre de 2024"
  style="width: 100%; height: auto;"
  >
  <figcaption class="image-caption">Comparación histórica entre nuestra política óptima consciente de costes y la política de termostato constante el 25 de noviembre de 2024</figcaption>
</figure>

El gráfico muestra las fluctuaciones de la temperatura exterior y su impacto en el ritmo de enfriamiento del muro y del interior. Se aprecian los efectos contrapuestos de calentar el interior de la casa sobre el muro: este proceso calienta el muro, lo que ralentiza el enfriamiento posterior del interior, ya que la temperatura interior solo baja hasta la temperatura elevada que el muro alcanza por la tarde.

La estrategia consciente del coste calienta el interior durante la parte central del día y de noche, aprovechando el excedente de energía de la "curva de pato" diaria. Este enfoque produce ahorros significativos de al menos un 10%, que pueden ampliarse con buen aislamiento y un precio mínimo diario bajo.

La dinámica de temperatura del modelo de dos masas muestra que la temperatura sube rápido al principio. Cuando la diferencia entre el ambiente interior y el muro alcanza 1 °C, el flujo de calor hacia el muro es lo bastante grande como para aumentar su temperatura de forma significativa, lo que mantiene la diferencia.

Una vez apagada la calefacción, la temperatura interior baja rápido hasta igualar la del muro, que solo desciende despacio por su gran masa térmica y su aislamiento del exterior. Además, observamos que los costes fijos de la electricidad (impuestos y peajes del proveedor) impactan de forma significativa en el coste total.

### Noviembre de 2024

Durante noviembre de 2024 observamos picos de temperatura interior, aunque sin alcanzar `T_max`, la parte alta de la zona de confort. El sistema sigue la `T_min` esperada en horas de precios altos, igual que la política de referencia, lo que también es razonable en coste. El pico más grande se produjo el 25 de noviembre, un día de precios de energía excepcionalmente bajos durante un periodo prolongado.

<figure class="image-container">
  <img
  src="{{ site.baseurl }}/assets/images/compare_costs_temps_Barcelona_Nov.png"
  alt="Comparación entre nuestra política óptima consciente de costes y la política de termostato constante durante noviembre de 2024"
  style="width: 100%; height: auto;"
  >
  <figcaption class="image-caption">Comparación entre nuestra política óptima consciente de costes y la política de termostato constante durante la segunda mitad de noviembre de 2024</figcaption>
</figure>

### De marzo de 2023 a marzo de 2025

Para este periodo de dos años añadimos la opción de refrigeración, importante en Barcelona donde los costes de refrigeración son significativos. La calefacción en invierno sigue siendo lo que más cuesta. De forma más realista y eficiente, la refrigeración puede hacerse pasivamente, lo que en nuestro modelo equivaldría a hacer controlables los parámetros efectivos de aislamiento.

Durante la primavera y el otoño, cuando la temperatura exterior media está dentro de la banda de confort, los costes de calefacción y refrigeración son bajos. Es lo adecuado, porque también es la época en la que simplemente no usaríamos ninguno de los dos sistemas.

Las mayores diferencias de coste diario entre la política de referencia y la óptima por coste se dan en periodos donde el precio medio de la electricidad no es demasiado bajo, pero tiene mínimos regulares que permiten cargar energía térmica de forma ventajosa, véase octubre de 2023.

La temperatura del modelo óptimo tiene muchos picos como en los gráficos anteriores, pero siempre contribuyen a que la temperatura sea más confortable en invierno y en verano. La diferencia acumulada en el periodo de dos años fue de 66 €, un 17% respecto al coste total de la política base.

<figure class="image-container">
  <img
  src="{{ site.baseurl }}/assets/images/compare_costs_temps_Barcelona_Mar23_Mar25.png"
  alt="Comparación entre nuestra política óptima consciente de costes y la política de termostato constante de marzo de 2023 a marzo de 2025"
  style="width: 100%; height: auto;"
  >
  <figcaption class="image-caption">Comparación entre nuestra política óptima consciente de costes y la política de termostato constante durante el periodo de dos años de marzo de 2023 a marzo de 2025.</figcaption>
</figure>

## Mejoras previstas

### Modelado

Al modelo aún le faltan añadidos para ser más realista. No incorporamos parámetros de eficiencia. Fijamos el precio base en un bajo 1 ct/kWh, tal como queríamos simular. Los parámetros de aislamiento y masa térmica proceden de una vivienda familiar del norte de Europa; en otras ubicaciones pueden aplicar valores distintos.

Incluso con este nivel de detalle, un análisis de factores sería interesante para trazar el ahorro potencial de este método según ubicación y parámetros térmicos.

### Hardware dedicado

La hoja de ruta actual (ver el README del repositorio) incluye un instalador de cron y un ejecutable autónomo, para que Strom pueda funcionar desatendido en hardware de gama baja para domótica.
