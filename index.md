---
layout: landing
lang: en
ref: home
title: Heat when power is cheap
description: >-
  Open-source smart heating: Strom reads day-ahead electricity prices and the
  weather forecast, then heats through the cheapest safe hours.
---

<section class="hero">
  <div class="wrapper">
    <div class="hero-copy">
      <span class="eyebrow">Open-source smart heating</span>
      <h1 class="hero-title">Heat when power is cheap.</h1>
      <p class="hero-sub">
        Every day the electricity market publishes tomorrow's prices, hour by hour.
        <strong>Strom reads the curve, checks the weather, and runs your heater through the
        cheapest safe hours</strong> — automatically, through a smart plug.
      </p>
      <div class="hero-actions">
        <a class="button button-primary" href="{{ site.baseurl }}/getting-started">Read the guide</a>
        <a class="button button-ghost" href="https://github.com/{{ site.github_username }}">View on GitHub</a>
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
      <span class="eyebrow">How a run works</span>
      <h2>Four steps, once an hour</h2>
      <p>Strom is a plain Python script. Point it at a smart plug, give it two API keys, and
      let cron call it every hour. Each run does the same thing:</p>
    </div>
    <ol class="steps">
      <li>
        <span class="step-no">01</span>
        <h3>Validate</h3>
        <p>Credentials, API keys and house parameters are checked first. A mistake stops the
        run with a message that names the fix.</p>
      </li>
      <li>
        <span class="step-no">02</span>
        <h3>Fetch</h3>
        <p>Tomorrow's day-ahead prices from ENTSO-E and the weather forecast from
        OpenWeatherMap. Missing data stops the run — nothing is invented.</p>
      </li>
      <li>
        <span class="step-no">03</span>
        <h3>Optimize</h3>
        <p>Convex optimization finds the provably cheapest heating schedule for the next 24
        hours that stays inside your comfort band (18&ndash;24&nbsp;&deg;C by default).</p>
      </li>
      <li>
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
    <div>
      <span class="eyebrow">Measured, not promised</span>
      <h2>What it saves</h2>
      <p class="savings-figure">17% <small>lower heating cost over two years than a constant
      thermostat &mdash; 66&nbsp;&euro; in our Barcelona case study, with the same comfort
      band.</small></p>
      <p class="note">Heating is flexible: <em>when</em> you heat matters as much as how much.
      The savings depend on your price zone, insulation and weather —
      <a href="{{ site.baseurl }}/usage-example">see how we measured it</a>.</p>
    </div>
    <figure class="savings-chart">
      <img src="{{ site.baseurl }}/assets/images/compare_costs_temps_Barcelona_Mar23_Mar25.png"
        alt="Comparison of cumulative heating cost between the price-aware optimal policy and a constant thermostat from March 2023 to March 2025">
      <figcaption>Optimal vs. thermostat policy, Barcelona, March 2023 – March 2025</figcaption>
    </figure>
  </div>
</section>

<section class="section">
  <div class="wrapper">
    <div class="section-head">
      <span class="eyebrow">Before you start</span>
      <h2>What you need</h2>
    </div>
    <ul class="need">
      <li>
        <span class="need-icon">requires</span>
        <h3>Python 3.12</h3>
        <p>Strom is pinned to the 3.12 series. With mise, the right version is provisioned
        automatically.</p>
      </li>
      <li>
        <span class="need-icon">requires</span>
        <h3>A smart plug</h3>
        <p>Today that means any TP-Link Kasa plug on your network; its IP address goes in
        one config file. No Kasa at home? Strom is open source — fork it and adapt it to
        your hardware.</p>
      </li>
      <li>
        <span class="need-icon">requires</span>
        <h3>Two free API keys</h3>
        <p>One for <a href="https://openweathermap.org/appid">OpenWeatherMap</a>, one for
        <a href="https://transparency.entsoe.eu/">ENTSO-E</a>. Both have free tiers.</p>
      </li>
      <li>
        <span class="need-icon">optional</span>
        <h3>Your house numbers</h3>
        <p>Insulation, heater power, comfort band. Skip it and sensible defaults for a family
        home are used.</p>
      </li>
    </ul>
  </div>
</section>

<section class="section cta">
  <div class="wrapper">
    <h2>Set it up tonight</h2>
    <p>Clone, configure, add one cron line. The guide walks through every step.</p>
    <div class="hero-actions">
      <a class="button button-primary" href="{{ site.baseurl }}/getting-started">Read the guide</a>
      <a class="button button-ghost" href="https://github.com/{{ site.github_username }}">Star on GitHub</a>
    </div>
  </div>
</section>
