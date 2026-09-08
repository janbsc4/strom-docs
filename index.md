---
layout: landing
lang: en
ref: home
title: Heat when power is cheap
description: >-
  Open-source smart heating: Strom reads day-ahead electricity prices and the
  weather forecast to plan lower-cost heating through a smart plug.
---

<section class="hero">
  <div class="wrapper">
    <div class="hero-copy">
      <span class="eyebrow">Open-source smart heating</span>
      <h1 class="hero-title">A warmer home.<br><em>A smarter bill.</em></h1>
      <p class="hero-sub">Strom brings electricity prices and weather forecasts together to plan your heating. Your radiator, a smart plug, and better timing.</p>
      <div class="hero-actions">
        <a class="button button-primary" href="{{ site.baseurl }}/getting-started">Read the guide</a>
        <a class="button button-ghost" href="https://github.com/{{ site.github_username }}">View on GitHub</a>
      </div>
    </div>
    <div class="hero-art">
      <span class="orbit orbit-one" aria-hidden="true"></span>
      <span class="orbit orbit-two" aria-hidden="true"></span>
      <img class="hero-app-icon" src="{{ '/assets/images/strom-radiator-512.png' | relative_url }}"
        width="512" height="512" alt="Strom’s Little Radiator" fetchpriority="high">
      <p class="art-caption">A little radiator. A smarter plan.</p>
    </div>
  </div>
</section>

<section class="timing-section">
  <div class="wrapper timing-grid">
    <div><span class="eyebrow">A simple idea</span><h2>Same warmth.<br>Better timing.</h2><p>Electricity prices change by the hour. Strom finds a low-cost heating plan that keeps the predicted temperature within your comfort band.</p></div>
    <div class="hero-chart">{%- include hero-chart.html -%}<p class="chart-note">Illustrative schedule · not live prices</p></div>
  </div>
</section>

<section class="section">
  <div class="wrapper">
    <div class="section-head reveal">
      <span class="eyebrow">How a run works</span>
      <h2>A thoughtful routine, every run</h2>
      <p>Strom offers a Linux desktop app for running one heating cycle, plus a Python
      command you can schedule hourly with cron. Each run does the same thing:</p>
    </div>
    <ol class="steps" data-stagger>
      <li class="reveal">
        <span class="step-no">01</span>
        <h3>Validate</h3>
        <p>Credentials, API keys and house parameters are checked first. A mistake stops the
        run with a message that names the fix.</p>
      </li>
      <li class="reveal">
        <span class="step-no">02</span>
        <h3>Fetch</h3>
        <p>Hourly electricity prices from ENTSO-E and the weather forecast from
        OpenWeatherMap. Missing data stops the run — nothing is invented.</p>
      </li>
      <li class="reveal">
        <span class="step-no">03</span>
        <h3>Optimize</h3>
        <p>An optimizer finds a low-cost heating schedule for the next 24 hours while
        keeping the model’s predicted temperature within your comfort band
        (18&ndash;24&nbsp;&deg;C by default).</p>
      </li>
      <li class="reveal">
        <span class="step-no">04</span>
        <h3>Actuate</h3>
        <p>The plug runs this hour as a duty cycle — 40% heating means ON for 24 minutes. A
        watchdog cuts the power if the plug ever stays on too long.</p>
      </li>
    </ol>
  </div>
</section>

<section class="section savings">
  <div class="wrapper">
    <div class="reveal">
      <span class="eyebrow">The Barcelona case study</span>
      <h2>What it saves</h2>
      <p class="savings-figure"><span class="count" data-count-to="17">17</span>% <small>lower heating cost over two years than a constant
      thermostat &mdash; 66&nbsp;&euro; in our Barcelona case study, with the same comfort
      band.</small></p>
      <p class="note">Heating is flexible: <em>when</em> you heat matters as much as how much.
      The savings depend on your price zone, insulation and weather —
      <a href="{{ site.baseurl }}/usage-example">see how we measured it</a>.</p>
    </div>
    <figure class="savings-chart reveal" style="--reveal-delay: 120ms">
      <img src="{{ site.baseurl }}/assets/images/compare_costs_temps_Barcelona_Mar23_Mar25.png"
        alt="Comparison of cumulative heating cost between the price-aware optimal policy and a constant thermostat from March 2023 to March 2025">
      <figcaption>Optimal vs. thermostat policy, Barcelona, March 2023 – March 2025</figcaption>
    </figure>
  </div>
</section>

<section class="section">
  <div class="wrapper">
    <div class="section-head reveal">
      <span class="eyebrow">Before you start</span>
      <h2>What you need</h2>
    </div>
    <ul class="need" data-stagger>
      <li class="reveal">
        <span class="need-icon">requires</span>
        <h3>A smart plug</h3>
        <p>A compatible TP-Link plug on your network, controlled through python-kasa.
        You provide its IP address and account details. Support depends on your
        plug model and firmware.</p>
      </li>
      <li class="reveal">
        <span class="need-icon">requires</span>
        <h3>Two free API keys</h3>
        <p>One for <a href="https://openweathermap.org/appid">OpenWeatherMap</a>, one for
        <a href="https://transparency.entsoe.eu/">ENTSO-E</a>. Both have free tiers.</p>
      </li>
    </ul>
  </div>
</section>

<section class="section cta">
  <div class="wrapper reveal">
    <h2>Set it up tonight</h2>
    <p>Clone, configure, add one cron line. The guide walks through every step.</p>
    <div class="hero-actions">
      <a class="button button-primary" href="{{ site.baseurl }}/getting-started">Read the guide</a>
      <a class="button button-ghost" href="https://github.com/{{ site.github_username }}">See on GitHub</a>
    </div>
  </div>
</section>
