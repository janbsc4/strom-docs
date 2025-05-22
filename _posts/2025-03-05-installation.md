---
layout: post
title:  "Installation"
date:   2025-03-05 11:57:47 +0100
categories: docs
---
**Note:** This application requires **Python 3.12.8** to run properly. Please ensure you have this specific version installed on your system before proceeding with the installation steps below. Earlier or later versions may not be compatible with all dependencies or features used in this project.


1. Clone the repository:
   ```bash
   git clone https://github.com/Bloodwing1/Strom.git
   cd strom
   ```

2. Install required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Create necessary configuration files:
   - Create a `config` directory in the root folder of the project
   - Add your API keys and credentials (please see Configuration section bellow)

## Configuration

### API Keys Setup

1. Create the following files in the `config` directory:

   - `weather_api_key.txt`: Contains your OpenWeatherMap API key
   - `price_api_key.txt`: Contains your [ENTSO-E API key](https://transparency.entsoe.eu/content/static_content/Static%20content/web%20api/Guide_prod_backup_06_11_2024.html#_authentication_and_authorisation)
   - `tapologin.env`: Contains your TP-Link Kasa login credentials

2. For the `tapologin.env` file, use the following format:
   ```
   EMAIL=your_tplink_account_email
   PASSWORD=your_tplink_account_password
   ```
3. You can optionally add your custom house heating parameters to a `house_config.json` file with the following structure to the `config_` folder.

```json
{
    "C_air": 0.56,
    "C_wall": 3.5,
    "R_interior": 1.0,
    "R_exterior": 6.06,
    "Q_heater": 2.0,
    "Q_cooling": 0.0,
    "T_min": 18.0,
    "T_max": 24.0,
    "T_interior_init": 18.5,
    "T_wall_init": 18.5,
    "P_base": 0.01,
    "freq": "1h"
}
```
### Device Configuration

Update the `device_ip` variable in `main.py` with the IP address of your Kasa smart plug:

```python
device_ip = "192.191.1.14"  # Replace with your device's IP address
```