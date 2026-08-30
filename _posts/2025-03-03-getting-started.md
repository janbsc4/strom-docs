---
layout: post
title:  "Getting Started"
date:   2025-03-05 09:00:00 +0100
categories: docs
lang: en
ref: getting-started
---
Strom is a free, open-source script for smart heating. It uses weather forecasts and **day-ahead electricity prices** — the hourly prices of an electricity market that are published one day in advance — to find the cheapest heating schedule that still keeps your home comfortable. The schedule is computed with **convex optimization**, a mathematical technique that provably finds the best possible schedule rather than a good guess. A smart plug then carries the schedule out.

This documentation will guide you through setting up and using the Strom system.

## How a run works

Each time you run Strom, it:

1. **Validates your configuration** — credentials, API keys and house parameters are checked before anything else happens. A mistake stops the run with a clear error message instead of a surprise later.
2. **Finds your smart plug** on the network.
3. **Fetches data** — a weather forecast from OpenWeatherMap and day-ahead electricity prices from the ENTSO-E transparency platform.
4. **Computes the cheapest heating schedule** for the next 24 hours (configurable).
5. **Runs the plug for the current hour** using a bounded duty cycle: if the optimizer decides on 40% heating for this hour, the plug is ON for 24 minutes and OFF for the rest. An independent watchdog forces the plug OFF if it ever stays on for more than 3 hours continuously.

## Key features

- Real-time weather data fetching via the OpenWeatherMap API
- Electricity price data retrieval from the ENTSO-E API
- Convex optimization (via CVXPY) for cost-effective heating decisions
- Smart plug control of a TP-Link Kasa device via the Kasa library
- Bounded duty-cycle control with an independent max-on watchdog
- Fail-fast behavior: invalid configuration, gaps in data coverage and solver failures all produce clear errors instead of silent guesses
- Visualization tools for analyzing heating strategies and cost savings

## What you need

- Python **3.12.8** (Strom is pinned to the 3.12 series)
- A TP-Link Kasa smart plug with a known IP address
- API keys for [OpenWeather](https://openweathermap.org/appid) and [ENTSO-E](https://transparency.entsoe.eu/content/static_content/Static%20content/web%20api/Guide_prod_backup_06_11_2024.html#_authentication_and_authorisation)
- A network connection

## Where to go next

1. [Installation]({{ site.baseurl }}/installation) — get Strom running
2. [Configuration]({{ site.baseurl }}/configuration) — API keys, plug credentials and house parameters
3. [Usage]({{ site.baseurl }}/usage) — running Strom and reading what it does
4. [Customization]({{ site.baseurl }}/customization) — your city, your country, your house
5. [Usage Example]({{ site.baseurl }}/usage-example) — a case study with real savings
6. [Contributing]({{ site.baseurl }}/contributing) — how to help
