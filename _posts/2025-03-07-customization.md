---
layout: post
title:  "Customization"
date:   2025-03-07 11:57:47 +0100
categories: docs
---
Strom API calls can be adjusted so that it works for a city of your choice.

### Weather Location

To change the location for weather data:
1. Modify the city parameter (YourCity) in the API call in `get_weather_data()`:
   ```python
   call_str = "https://api.openweathermap.org/data/2.5/forecast?q=YourCity&appid=" + API_KEY
   ```

### Electricity Price Country

To change the country for electricity prices:
1. Modify the country code in `get_prices()`:
   ```python
   country_code = 'XX'  # Replace with your country code
   ```

### Scheduling

For automated operation, consider setting up a cron job (Linux/Mac) or Task Scheduler (Windows) to run `main.py` at regular intervals. Our recommended cadence is once an hour.


## Further Details

### Data Collection

Weather data is fetched from OpenWeatherMap for Barcelona by default. The system:
- Gets 3-hour forecast data
- Interpolates to create hourly temperature forecasts
- Converts temperatures from Kelvin to Celsius

Price data is fetched from ENTSO-E for Spain by default. The system:
- Gets day-ahead market prices
- Converts prices to €/kWh
- Aligns timestamps with weather data

### Optimization Logic

The optimization uses convex programming (via CVXPY) to determine when to heat based on:

1. **Objective Function**: Minimize electricity cost while maintaining comfort
2. **Constraints**:
   - Indoor temperature must stay above minimum threshold
   - Thermal dynamics model (heating power, heat loss rate)
   - Initial temperature conditions

The optimization can run in two decision modes:
- **Relaxed**: Allows continuous values between 0-1 (partial heating)
- **Discrete**: Binary decisions (on/off)

And two optimization types:
- **Optimal**: Minimize monetary cost
- **Baseline**: Minimize temperature deviation from target

### Thermal Model

The system models building thermal dynamics with these parameters:

- `heat_loss`: Rate at which the building loses heat to the outdoors (°C/hr per °C difference)
- `heating_power`: Rate at which the heater can increase indoor temperature (°C/hr)
- `min_temperature`: Minimum acceptable indoor temperature (°C)