---
layout: landing
lang: es
ref: home
title: Calefacción inteligente
description: >-
  Calefacción inteligente de código abierto: Strom lee los precios del
  mercado eléctrico y la previsión del tiempo para planificar la calefacción
  con un enchufe inteligente.
image:
  path: /assets/images/og-image-es.png
  alt: >-
    Imagen de Strom para redes sociales: curva de precios de la electricidad
    day-ahead con las horas baratas de calefacción marcadas
---

<section class="hero">
  <div class="wrapper">
    <div class="hero-copy">
      <span class="eyebrow">Calefacción inteligente de código abierto</span>
      <h1 class="hero-title">Más calor.<br><em>Menos gasto.</em></h1>
      <p class="hero-sub">Strom combina los precios de la luz y la previsión del tiempo para planificar tu calefacción. Tu radiador, un enchufe inteligente y las horas más baratas.</p>
      <div class="hero-actions">
        <a class="button button-primary" href="{{ site.baseurl }}/es/primeros-pasos">Leer la guía</a>
        <a class="button button-ghost" href="https://github.com/{{ site.github_username }}">Ver en GitHub</a>
      </div>
    </div>
    <div class="hero-art">
      <span class="orbit orbit-one" aria-hidden="true"></span>
      <span class="orbit orbit-two" aria-hidden="true"></span>
      <img class="hero-app-icon" src="{{ '/assets/images/strom-radiator-512.png' | relative_url }}"
        width="512" height="512" alt="El pequeño radiador de Strom" fetchpriority="high">
      <p class="art-caption">Un pequeño radiador. Un plan más inteligente.</p>
    </div>
  </div>
</section>

<section class="timing-section">
  <div class="wrapper timing-grid">
    <div><span class="eyebrow">La idea es sencilla</span><h2>El mismo calor.<br>En el momento adecuado.</h2><p>El precio de la electricidad cambia cada hora. Strom busca un plan de bajo coste que mantenga la temperatura prevista dentro de tu banda de confort.</p></div>
    <div class="hero-chart">{%- include hero-chart.html -%}<p class="chart-note">Ejemplo ilustrativo · no son precios en directo</p></div>
  </div>
</section>

<section class="section">
  <div class="wrapper">
    <div class="section-head reveal">
      <span class="eyebrow">Cómo funciona una ejecución</span>
      <h2>Una rutina inteligente en cada ejecución</h2>
      <p>Strom ofrece una aplicación de escritorio para Linux que ejecuta un ciclo de
      calefacción y un comando de Python que puedes programar cada hora con cron.
      Cada ejecución hace lo mismo:</p>
    </div>
    <ol class="steps" data-stagger>
      <li class="reveal">
        <span class="step-no">01</span>
        <h3>Validar</h3>
        <p>Credenciales, claves de API y parámetros de la casa se comprueban primero. Un
        error detiene la ejecución con un mensaje que indica cómo arreglarlo.</p>
      </li>
      <li class="reveal">
        <span class="step-no">02</span>
        <h3>Obtener datos</h3>
        <p>Los precios horarios de electricidad desde ENTSO-E y la previsión meteorológica de
        OpenWeatherMap. Si falta un dato, la ejecución se detiene: no se inventa nada.</p>
      </li>
      <li class="reveal">
        <span class="step-no">03</span>
        <h3>Optimizar</h3>
        <p>Un optimizador busca un plan de calefacción de bajo coste para las próximas
        24 horas, manteniendo la temperatura prevista por el modelo dentro de tu
        banda de confort (18&ndash;24&nbsp;&deg;C por defecto).</p>
      </li>
      <li class="reveal">
        <span class="step-no">04</span>
        <h3>Actuar</h3>
        <p>El enchufe ejecuta esta hora en ciclo de trabajo: si toca un 40% de
        calefacción, 24 minutos encendido. Un vigilante corta la corriente si el enchufe
        se queda encendido demasiado tiempo.</p>
      </li>
    </ol>
  </div>
</section>

<section class="section savings">
  <div class="wrapper">
    <div class="reveal">
      <span class="eyebrow">El caso de estudio de Barcelona</span>
      <h2>Lo que ahorra</h2>
      <p class="savings-figure"><span class="count" data-count-to="17">17</span>% <small>menos de gasto en calefacción en dos años
      que con un termostato constante — 66&nbsp;&euro; en nuestro caso de estudio en
      Barcelona, con la misma banda de confort.</small></p>
      <p class="note">La calefacción es flexible: <em>cuándo</em> calientas importa tanto
      como cuánto. El ahorro depende de tu zona de precios, el aislamiento y el clima:
      <a href="{{ site.baseurl }}/es/ejemplo-de-uso">consulta cómo lo medimos</a>.</p>
    </div>
    <figure class="savings-chart reveal" style="--reveal-delay: 120ms">
      <img src="{{ site.baseurl }}/assets/images/compare_costs_temps_Barcelona_Mar23_Mar25.png"
        alt="Comparación del coste acumulado de calefacción entre la política óptima consciente de precios y un termostato constante de marzo de 2023 a marzo de 2025">
      <figcaption>Política óptima frente a termostato, Barcelona, marzo 2023 – marzo 2025</figcaption>
    </figure>
  </div>
</section>

<section class="section">
  <div class="wrapper">
    <div class="section-head reveal">
      <span class="eyebrow">Antes de empezar</span>
      <h2>Qué necesitas</h2>
    </div>
    <ul class="need" data-stagger>
      <li class="reveal">
        <span class="need-icon">imprescindible</span>
        <h3>Un enchufe inteligente</h3>
        <p>Un enchufe TP-Link compatible en tu red, controlado mediante python-kasa.
        Necesitas su dirección IP y los datos de tu cuenta. La compatibilidad
        depende del modelo y del firmware.</p>
      </li>
      <li class="reveal">
        <span class="need-icon">imprescindible</span>
        <h3>Dos claves de API gratuitas</h3>
        <p>Una de <a href="https://openweathermap.org/appid">OpenWeatherMap</a> y otra de
        <a href="https://transparency.entsoe.eu/">ENTSO-E</a>. Ambas tienen nivel gratuito.</p>
      </li>
    </ul>
  </div>
</section>

<section class="section cta">
  <div class="wrapper reveal">
    <h2>Ponla en marcha esta noche</h2>
    <p>Clona, configura, añade una línea al cron. La guía te acompaña en cada paso.</p>
    <div class="hero-actions">
      <a class="button button-primary" href="{{ site.baseurl }}/es/primeros-pasos">Leer la guía</a>
      <a class="button button-ghost" href="https://github.com/{{ site.github_username }}">Ver en GitHub</a>
    </div>
  </div>
</section>
