---
layout: landing
lang: es
ref: home
title: Calefacción inteligente
description: >-
  Calefacción inteligente de código abierto: Strom lee los precios del
  mercado day-ahead y la previsión del tiempo, y calienta en las horas
  baratas y seguras.
---

<section class="hero">
  <div class="wrapper">
    <div class="hero-copy">
      <span class="eyebrow">Calefacción inteligente de código abierto</span>
      <h1 class="hero-title">Calienta cuando la luz es barata. Quédate caliente <em>siempre</em>.</h1>
      <p class="hero-sub">
        Cada día el mercado eléctrico publica los precios de mañana, hora a hora.
        <strong>Strom lee la curva, mira el tiempo y pone tu calefacción en las horas
        baratas y seguras</strong> — automáticamente, a través de un enchufe
        inteligente que ya tienes en casa.
      </p>
      <div class="hero-actions">
        <a class="button button-primary" href="{{ site.baseurl }}/es/primeros-pasos">Leer la guía</a>
        <a class="button button-ghost" href="https://github.com/{{ site.github_username }}">Ver en GitHub</a>
      </div>
    </div>
    <div class="hero-chart">
      {%- include hero-chart.html -%}
    </div>
  </div>
</section>

<section class="section">
  <div class="wrapper">
    <div class="section-head">
      <span class="eyebrow">Cómo funciona una ejecución</span>
      <h2>Cuatro pasos, una vez por hora</h2>
      <p>Strom es un script de Python sin más. Apúntalo a un enchufe inteligente, dale dos
      claves de API y deja que cron lo llame cada hora. Cada ejecución hace lo mismo:</p>
    </div>
    <ol class="steps">
      <li>
        <span class="step-no">01</span>
        <h3>Validar</h3>
        <p>Credenciales, claves de API y parámetros de la casa se comprueban primero. Un
        error detiene la ejecución con un mensaje que indica cómo arreglarlo.</p>
      </li>
      <li>
        <span class="step-no">02</span>
        <h3>Obtener datos</h3>
        <p>Los precios day-ahead de mañana desde ENTSO-E y la previsión meteorológica de
        OpenWeatherMap. Si falta un dato, la ejecución se detiene: no se inventa nada.</p>
      </li>
      <li>
        <span class="step-no">03</span>
        <h3>Optimizar</h3>
        <p>La optimización convexa encuentra de forma demostrable el calendario de
        calefacción más barato para las próximas 24 horas, dentro de tu banda de
        confort (18&ndash;24&nbsp;&deg;C por defecto).</p>
      </li>
      <li>
        <span class="step-no">04</span>
        <h3>Actuar</h3>
        <p>El enchufe ejecuta esta hora como ciclo de trabajo: un 40% de calefacción son
        24 minutos encendido. Un vigilante corta la corriente si el enchufe se queda
        encendido demasiado tiempo.</p>
      </li>
    </ol>
  </div>
</section>

<section class="section savings">
  <div class="wrapper">
    <div>
      <span class="eyebrow">Medido, no prometido</span>
      <h2>Lo que ahorra</h2>
      <p class="savings-figure">17% <small>menos de coste de calefacción en dos años que un
      termostato constante — 66&nbsp;&euro; en nuestro caso de estudio en Barcelona, con la
      misma banda de confort.</small></p>
      <p class="note">La calefacción es flexible: <em>cuándo</em> calientas importa tanto
      como cuánto. El ahorro depende de tu zona de precios, el aislamiento y el clima:
      <a href="{{ site.baseurl }}/es/ejemplo-de-uso">consulta cómo lo medimos</a>.</p>
    </div>
    <figure class="savings-chart">
      <img src="{{ site.baseurl }}/assets/images/compare_costs_temps_Barcelona_Mar23_Mar25.png"
        alt="Comparación del coste acumulado de calefacción entre la política óptima consciente de precios y un termostato constante de marzo de 2023 a marzo de 2025">
      <figcaption>Política óptima frente a termostato, Barcelona, marzo 2023 – marzo 2025</figcaption>
    </figure>
  </div>
</section>

<section class="section">
  <div class="wrapper">
    <div class="section-head">
      <span class="eyebrow">Antes de empezar</span>
      <h2>Qué necesitas</h2>
    </div>
    <ul class="need">
      <li>
        <span class="need-icon">imprescindible</span>
        <h3>Python 3.12</h3>
        <p>Strom está fijado a la serie 3.12. Con mise, la versión correcta se instala
        automáticamente.</p>
      </li>
      <li>
        <span class="need-icon">imprescindible</span>
        <h3>Un enchufe Kasa</h3>
        <p>Cualquier enchufe TP-Link Kasa en tu red. Su dirección IP va en un archivo de
        configuración.</p>
      </li>
      <li>
        <span class="need-icon">imprescindible</span>
        <h3>Dos claves de API gratis</h3>
        <p>Una de <a href="https://openweathermap.org/appid">OpenWeatherMap</a> y otra de
        <a href="https://transparency.entsoe.eu/">ENTSO-E</a>. Ambas tienen nivel gratuito.</p>
      </li>
      <li>
        <span class="need-icon">opcional</span>
        <h3>Los números de tu casa</h3>
        <p>Aislamiento, potencia de la calefacción, banda de confort. Si lo omites, se
        usan valores por defecto razonables para una vivienda familiar.</p>
      </li>
    </ul>
  </div>
</section>

<section class="section cta">
  <div class="wrapper">
    <h2>Ponla en marcha esta noche</h2>
    <p>Clona, configura, añade una línea al cron. La guía te acompaña en cada paso.</p>
    <div class="hero-actions">
      <a class="button button-primary" href="{{ site.baseurl }}/es/primeros-pasos">Leer la guía</a>
      <a class="button button-ghost" href="https://github.com/{{ site.github_username }}">Star en GitHub</a>
    </div>
  </div>
</section>
