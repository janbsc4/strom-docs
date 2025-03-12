---
layout: post
title:  "Installation"
date:   2025-03-05 11:57:47 +0100
categories: docs
---
**Note:** This application requires **Python 3.12.8** to run properly. Please ensure you have this specific version installed on your system before proceeding with the installation steps below. Earlier or later versions may not be compatible with all dependencies or features used in this project.


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
device_ip = "192.191.1.14"  # Replace with your device's IP address
```