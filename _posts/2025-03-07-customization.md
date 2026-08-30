---
layout: post
title:  "Customization"
date:   2025-03-07 11:57:47 +0100
categories: docs
lang: en
ref: customization
---
Strom ships with defaults for Barcelona and Spain, but every input can be adjusted: your city, your price zone and your house.

## Weather location

Weather comes from the OpenWeatherMap forecast API. The city is the first argument of `get_weather_data`, passed as the `q` query parameter:

```python
from strom import get_weather_data

weather = get_weather_data(city="Madrid, ES")
```

Example formats: `"Barcelona, ES"`, `"Madrid, ES"`, `"Berlin, DE"`, `"Paris, FR"`, `"London, GB"`, `"Rome, IT"` — any string the OpenWeatherMap API accepts for its `q` parameter works.

## Electricity price zone

Prices come from the ENTSO-E transparency platform, which serves day-ahead prices per bidding zone. The zone defaults to `"ES"` (Spain):

```python
from strom import get_price_series

prices = get_price_series(zone="ES")
```

## House parameters

The thermal model of your house — heat capacities, insulation, heater power, comfort bounds and more — is configured through `house_config.json`. See [Configuration]({{ site.baseurl }}/configuration) for the full parameter table and the validation rules.

## Optimization modes

The optimizer (`find_heating_output`) runs in two modes:

- **`optimal`** minimizes the electricity cost while keeping the indoor temperature within `[T_min, T_max]`. This is what a normal run uses.
- **`baseline`** tracks a comfort target (a smoothed 24-hour average of the outdoor temperature, clipped to the comfort band) with a small cost term. It mimics a plain thermostat and exists as the reference strategy for comparison.

`compare_output_costs` runs both modes on the same data and returns both schedules, which is what the cost comparisons in the [usage example]({{ site.baseurl }}/usage-example) are built on.

Both modes solve a convex optimization problem, so the solver returns a provably cheapest (or best-tracking) schedule rather than a heuristic guess.

## How data is handled

Strom never invents data:

- Weather observations (3-hourly from OpenWeatherMap) are linearly interpolated to hourly values, but only where a real observation is within 3 hours; larger gaps raise a `CoverageError`.
- Prices are never interpolated. Each price belongs to its exact market interval; an unpublished interval reuses the previous price for at most 1 hour, then the run stops.
- All timestamps are handled in UTC internally, so results are consistent across daylight-saving transitions.

## How the plug is driven

A smart plug can only be ON or OFF, but the optimizer produces fractional values between 0 and 1. Strom bridges the gap with a **duty cycle**: within each control interval, the plug is ON for exactly the fraction the optimizer requested, then OFF. On-times shorter than 60 seconds are rounded up so the relay is not chattered, and a watchdog independent of the optimizer forces the plug OFF after 3 hours of continuous ON time as a safety net.

## Scheduling

For automated operation, run `strom` at regular intervals — the recommended cadence is once an hour. See [Usage]({{ site.baseurl }}/usage#scheduling-runs) for a cron example.
