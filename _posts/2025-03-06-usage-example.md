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

We modeled a house as a coupled, two component system: the indoor air inside the house its insulated wall.

The rate at which the indoor temperature drops is given both by how much heat is contained in the air (its heat capacity C<sub>air</sub>) and how easy it is for the heat to get exchanged with the wall (its thermal resistance R<sub>interior</sub>). The isolated wall has its own heat capacity C<sub>wall</sub> and thermal resistance R<sub>exterior</sub>.

| Parameter | Value | Units | Description |
|-----------|-------|-------|-------------|
| C<sub>air</sub> | 0.56 | kWh/°C | Heat capacity of indoor air |
| C<sub>wall</sub> | 3.5 | kWh/°C | Heat capacity of insulated wall |
| R<sub>interior</sub> | 1.0 | °C/kW | Thermal resistance between air and wall |
| R<sub>exterior</sub> | 6.06 | °C/kW | Thermal resistance between wall and outside |
| Q<sub>heater</sub> | 2.0 | kW | Power of the heating unit |
| T<sub>min</sub> | 18.0 | °C | Minimum allowed indoor temperature |
| T<sub>max</sub> | 24.0 | °C | Maximum allowed indoor temperature |
| T<sub>indoor_init</sub> | 18.5 | °C | Initial indoor temperature |
| T<sub>wall_init</sub> | 20.0 | °C | Initial wall temperature |


Wall is thermal battery

Smart heating pattern can charge it 

We compare the base case constant thermostat scenario set to T<sub>min</sub> with the electricity cost optimized case. Both are restricted to operate within the temperature range of [T<sub>min</sub>, T<sub>max</sub>]. 

<figure class="image-container">
  <img src="{{ site.baseurl }}assets/images/compare_costs_temps.png" alt="Comparison between our forecast aware optimal cost policy and the constant thermostat temperature policy">
  <figcaption class="image-caption">Comparison between our forecast aware optimal cost policy and the constant thermostat temperature policy</figcaption>
</figure>

The graph shows us 

- The outdoor temperature fluctuations
- Its impact on the rate of cooling of the wall and the interior 
- The counteracting effects of heating the home interior on the wall
- This heats up the wall and slows down later cooling of the interior, as it falls down only to the wall's elevated afternoon temperature.
- The cost aware choice of heating to the central portion of the day, taking advantage of the daily duck curve energy oversupply.
- Significant cost saving of at least 10%, but with good insulation and low minimum daily price considerably lower.

Fixed costs of electricity (provider's taxes and tolls) matter greatly




## Dedicated hardware
In order to send updated instructions to the smart plug, we needed an efficient piece of hardware, that could be running at all times. This is where Le Potato V2 came into the picture.