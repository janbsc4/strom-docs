---
layout: post
title:  "Usage Example"
date:   2025-03-06 09:57:47 +0100
categories: docs
--- 
The idea for the Strom project came from realizing the huge energy price fluctuations in Spain. Since heating has a bit of flexibility, on which time you turn it on, there is an opportunity to pick the optimal hours and lower the energy bill.

<figure class="image-container">
  <img src="{{ site.baseurl }}/assets/images/screenshot-energy-2025.PNG" alt="Screenshot of energy price fluctuation throughout a day">
  <figcaption class="image-caption">Screenshot of the energy price fluctuation throughout a day</figcaption>
</figure>

## Proof of Concept Hackathon
Over a weekend in January 2025 we worked on the main code for Strom. We got the code to work and interact correctly with the smart plug that we bought. Despite there being a lot of room for improvement, we celebrated this first "it works" achievement.

## Results

# One day Case study

We modeled a house as a coupled, two-component system: the indoor air inside the house and its insulated wall.

The rate at which the indoor temperature drops depends on both the heat contained in the air (its heat capacity, `C_air`) and the ease with which heat is exchanged with the wall (its thermal resistance, `R_interior`). The isolated wall has its own heat capacity (`C_wall`) and thermal resistance (`R_exterior`).

The electricity price paid by private consumers roughly follows the day-ahead market price, which can be fetched through an open API. However, it typically has a minimum cost that does not reach zero, even if the overall day-ahead price does. We include this tax floor as a variable parameter, `P_base`, in our model.

| Parameter              | Value | Units  | Description                                     |
|------------------------|-------|--------|-------------------------------------------------|
| `C_air`                | 0.56  | kWh/°C | Heat capacity of indoor air                    |
| `C_wall`               | 3.5   | kWh/°C | Heat capacity of the insulated wall            |
| `R_interior`           | 1.0   | °C/kW  | Thermal resistance between air and wall        |
| `R_exterior`           | 6.06  | °C/kW  | Thermal resistance between wall and outside    |
| `T_min`                | 18.0  | °C     | Minimum allowed indoor temperature             |
| `T_max`                | 24.0  | °C     | Maximum allowed indoor temperature             |
| `T_interior_init`      | 18.5  | °C     | Initial indoor temperature                     |
| `T_wall_init`          | 20.0  | °C     | Initial wall temperature                       |
| `Q_heater`             | 2.0   | kW     | Power of the heating unit                      |
| `P_base`               | 0.01  | €/kWh  | Estimated base price from the provider         |

The wall acts as a thermal battery, and a smart heating pattern can charge it.

We compare two scenarios: 
1. A **base case** with a constant thermostat set to `T_min`,
2. An **electricity cost-optimized** case, where heating is scheduled based on forecasted electricity prices. Both scenarios are restricted to operate within the temperature range of `[T_min, T_max]`.

<figure class="image-container">
  <img src="{{ site.baseurl }}assets/images/compare_costs_temps.png" alt="Comparison between our forecast-aware optimal cost policy and the constant thermostat temperature policy on March 28th 2025">
  <figcaption class="image-caption">Comparison between our forecast-aware optimal cost policy and the constant thermostat temperature policy on March 28th 2025</figcaption>
</figure>

The graph shows the following:

- The fluctuations in outdoor temperature.
- Their impact on the rate of cooling of the wall and interior.
- The counteracting effects of heating the home interior on the wall. This process heats up the wall, slowing the later cooling of the interior, as the interior temperature falls only to the wall’s elevated afternoon temperature.
- The cost-aware strategy that heats the interior during the central portion of the day, taking advantage of the daily "duck curve" energy oversupply.
- Significant cost savings of at least 10%, which can be further reduced with good insulation and a low minimum daily price.
- Over long period the effect of the update period of the heating control also leads to significant gains

Additionally, we observe that **fixed costs of electricity** (such as taxes and tolls from the provider) significantly impact the overall cost.

# Historical analysis for november 2024

<figure class="image-container">
  <img src="{{ site.baseurl }}assets/images/compare_costs_temps_Barcelona_Nov.png" alt="Comparison between our forecast-aware optimal cost policy and the constant thermostat temperature policy during November 2024">
  <figcaption class="image-caption">Comparison between our forecast-aware optimal cost policy and the constant thermostat temperature policy during November 2024</figcaption>
</figure>


## Dedicated hardware
In order to send updated instructions to the smart plug, we needed an efficient piece of hardware, that could be running at all times. This is where Le Potato V2 came into the picture.