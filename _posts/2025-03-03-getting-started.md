---
layout: post
title:  "Getting Started"
date:   2025-03-05 11:57:47 +0100
categories: docs
---
Strom is an intelligent heating control system that optimizes energy usage based on weather forecasts and electricity price data. By leveraging convex optimization techniques, Strom determines the most cost-effective heating schedule while maintaining thermal comfort, automatically controlling a smart plug to implement the optimal heating plan.

This documentation will guide you through setting up and using the Strom system.

## System Overview

Strom consists of three main components:

1. **Data Collection**: Automatically fetches weather forecasts and electricity price data
2. **Optimization Engine**: Determines optimal heating schedules based on collected data
3. **Hardware Control**: Controls a TP-Link Kasa smart plug to implement the heating schedule

### Key Features

- Real-time weather data fetching via OpenWeatherMap API
- Electricity price data retrieval from ENTSO-E API
- Convex optimization for cost-effective heating decisions
- Smart plug control via the Kasa library
- Visualization tools for analyzing heating strategies and cost savings

Before you begin, ensure you have:

- Python 3.11 or newer installed
- A TP-Link Kasa smart plug (with known IP address)
- API keys for [OpenWeather](https://openweathermap.org/appid) and [ENTSO-E](https://transparency.entsoe.eu/content/static_content/Static%20content/web%20api/Guide_prod_backup_06_11_2024.html#_authentication_and_authorisation)
- A network connection