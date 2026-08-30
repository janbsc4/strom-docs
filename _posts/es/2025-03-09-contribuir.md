---
layout: post
title:  "Contribuir"
date:   2025-03-09 12:57:47 +0100
categories: docs
lang: es
ref: contributing
---
¡Las contribuciones a Strom son bienvenidas! Por favor, abre primero un issue para comentar la idea o el cambio que tienes en mente.

Después puedes proponer cambios así:
1. Haz un fork del repositorio
2. Crea una rama con tu funcionalidad
3. Envía un pull request con una descripción clara de tus cambios

## Entorno de desarrollo

```bash
git clone https://github.com/Bloodwing1/Strom.git
cd Strom
mise run install   # crea el venv, instala Strom con las herramientas de desarrollo y configura los git hooks
```

Si no usas [mise](https://mise.jdx.dev/): crea un entorno virtual con Python 3.12.8 y ejecuta `pip install -e ".[dev]"`.

Los comandos más útiles (todos definidos en `.mise.toml`):

- `mise run check` — lint, comprobación de tipos y tests deterministas; es lo que bloquea CI
- `mise run test-integration` — canarios con proveedores en vivo (requiere claves de API)
- `mise run mutation` — testing de mutación de los módulos críticos de seguridad (lento)

Los git hooks (vía [husky](https://typicode.github.io/husky/)) ejecutan el linter en cada commit y la comprobación completa en cada push; actívalos con `mise run hooks`. Los tests de `tests/` funcionan sin acceso a red ni claves de API, así que puedes ejecutarlos localmente cuando quieras.
