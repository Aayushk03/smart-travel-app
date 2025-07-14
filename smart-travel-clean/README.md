# 🌍 SmartRoam - Smart Travel Assistant

SmartRoam is a simple and responsive web app built using **React** and **CSS** that provides real-time location, weather, and network information to the user. It also includes smooth scrolling and responsive navigation, making it mobile-friendly.

---

## 🚀 Features

- 📍 Shows your current **geolocation** (latitude, longitude, and place name)
- 🌤 Displays current **weather** using your location
- 📶 Tells your **network connection status** (type, speed, RTT)
- ☁️ Smooth scrolling navigation
- 📱 Fully **responsive design** with a collapsible navbar on mobile
- 🎯 Clean UI and simple layout with animated section reveal

---

## 🔗 Live Demo

[👉 View Live Site](https://Aayushk03.github.io/smart-travel-app)

---

## 🌐 Web APIs Used

This app makes use of the following browser/web APIs:

1. **Geolocation API**  
   → To get your current coordinates (latitude & longitude)

2. **Network Information API**  
   → To check your internet connection type, speed, and response time

3. **Intersection Observer API**  
   → To reveal sections smoothly as they come into view (scroll effect)

4. **Open-Meteo Weather API**  
   → To fetch current weather based on your coordinates

5. **OpenStreetMap Nominatim API**  
   → To convert coordinates into a human-readable location (reverse geocoding)

---

## 🛠️ Tech Stack

- **React** (via Vite)
- **Plain CSS** (custom styling, no Tailwind)
- **HTML5 APIs** (Geolocation, Network, Observer)

---

## 📂 Project Setup

```bash
npm install
npm run dev
