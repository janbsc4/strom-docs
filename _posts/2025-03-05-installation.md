---
layout: post
title:  "Installation"
date:   2025-03-05 10:00:00 +0100
categories: docs
lang: en
ref: installation
---
**Note:** Strom requires **Python 3.12.8**. Earlier or later versions are not supported. If you use [mise](https://mise.jdx.dev/), the correct Python is provisioned automatically.

1. Clone the repository:
   ```bash
   git clone https://github.com/Bloodwing1/Strom.git
   cd Strom
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install the package. All runtime dependencies are included:
   ```bash
   pip install .
   ```

   For development (tests, lint, type-check):
   ```bash
   pip install -e ".[dev]"
   ```

4. Create a `config` folder in the project root. This is where all your personal settings live — API keys, plug credentials and (optionally) house parameters.

5. Place your API keys in two files inside the `config` folder:
   - `weather_api_key.txt` — your OpenWeatherMap API key
   - `price_api_key.txt` — your [ENTSO-E API key](https://transparency.entsoe.eu/content/static_content/Static%20content/web%20api/Guide_prod_backup_06_11_2024.html#_authentication_and_authorisation)

6. Place your smart plug credentials in a `tapologin.env` file in the `config` folder. All three lines are required:
   ```env
   EMAIL=myemail@hotmail.com
   PASSWORD=myPassword12
   DEVICEIP=192.168.1.42
   ```

7. Optionally, add your custom house heating parameters to a `house_config.json` file in the `config` folder. See [Configuration]({{ site.baseurl }}/configuration) for the full format and the defaults used when the file is missing.

That's it. Run `strom` to start your first control cycle — see [Usage]({{ site.baseurl }}/usage).

## Where Strom looks for the config folder

By default Strom looks for a `config/` folder in your current directory or any parent of it. You can also point it elsewhere with the `--config-dir` flag or the `STROM_CONFIG_DIR` environment variable. Details on the [Configuration]({{ site.baseurl }}/configuration) page.
