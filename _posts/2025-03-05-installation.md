---
layout: post
title:  "Installation"
date:   2025-03-05 11:57:47 +0100
categories: docs
---
Before you begin, ensure you have:

- Python 3.8 or newer installed
- A TP-Link Kasa smart plug (with known IP address)
- API keys for OpenWeatherMap and ENTSO-E
- A network connection

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/strom.git
   cd strom
   ```

2. Install required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Create necessary configuration files:
   - Create a `config` directory in the root of the project
   - Add your API keys and credentials (see Configuration section)

## Configuration

### API Keys Setup

1. Create the following files in the `config` directory:

   - `weather_api_key.txt`: Contains your OpenWeatherMap API key
   - `price_api_key.txt`: Contains your ENTSO-E API key
   - `tapologin.env`: Contains your TP-Link Kasa login credentials

2. For the `tapologin.env` file, use the following format:
   ```
   EMAIL=your_tplink_account_email
   PASSWORD=your_tplink_account_password
   ```

### Device Configuration

Update the `device_ip` variable in `main.py` with the IP address of your Kasa smart plug:

```python
device_ip = "192.168.1.16"  # Replace with your device's IP address
```