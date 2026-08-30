---
layout: post
title:  "Instalación"
date:   2025-03-05 10:00:00 +0100
categories: docs
lang: es
ref: installation
---
**Nota:** Strom requiere **Python 3.12.8**. No se admiten versiones anteriores ni posteriores. Si usas [mise](https://mise.jdx.dev/), el Python correcto se instala automáticamente.

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Bloodwing1/Strom.git
   cd Strom
   ```

2. Crea y activa un entorno virtual:
   ```bash
   python -m venv venv
   source venv/bin/activate  # En Windows usa `venv\Scripts\activate`
   ```

3. Instala el paquete. Todas las dependencias de ejecución están incluidas:
   ```bash
   pip install .
   ```

   Para desarrollo (tests, lint, comprobación de tipos):
   ```bash
   pip install -e ".[dev]"
   ```

4. Crea una carpeta `config` en la raíz del proyecto. Aquí viven todos tus ajustes personales: claves de API, credenciales del enchufe y (opcionalmente) los parámetros de la casa.

5. Coloca tus claves de API en dos archivos dentro de la carpeta `config`:
   - `weather_api_key.txt` — tu clave de API de OpenWeatherMap
   - `price_api_key.txt` — tu [clave de API de ENTSO-E](https://transparency.entsoe.eu/content/static_content/Static%20content/web%20api/Guide_prod_backup_06_11_2024.html#_authentication_and_authorisation)

6. Coloca las credenciales de tu enchufe inteligente en un archivo `tapologin.env` dentro de la carpeta `config`. Las tres líneas son obligatorias:
   ```env
   EMAIL=micorreo@hotmail.com
   PASSWORD=miPhone1234
   DEVICEIP=192.168.1.42
   ```

7. Opcionalmente, añade tus parámetros térmicos personalizados a un archivo `house_config.json` en la carpeta `config`. Consulta [Configuración]({{ site.baseurl }}/es/configuracion) para ver el formato completo y los valores por defecto usados cuando el archivo no existe.

Eso es todo. Ejecuta `strom` para iniciar tu primer ciclo de control — consulta [Uso]({{ site.baseurl }}/es/uso).

## Dónde busca Strom la carpeta de configuración

Por defecto Strom busca una carpeta `config/` en tu directorio actual o en cualquiera de sus padres. También puedes apuntar a otra con la opción `--config-dir` o la variable de entorno `STROM_CONFIG_DIR`. Detalles en la página de [Configuración]({{ site.baseurl }}/es/configuracion).
