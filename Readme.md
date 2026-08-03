# mds-ui

## Description 
**mds-ui** is a package of basic components for implementing ***minimorphism*** style interfaces. Created specifically for fintech products in the ***minimorphism ecosystem***, where premium tactility, physicality of objects, and a strict monochrome aesthetic are essential.

---
## The Manifesto
Before you start working with components, be sure to familiarize yourself with our *philosophy*:

**[minimorphism Manifesto](https://github.com/minimorphism/mds-ui/blob/main/Manifest/Manifest.md)**

---
## Architecture
The main technical difference between **mds** and classic **UI** libraries is the separation of physical form and its optical properties.

To achieve volume without sacrificing performance, a *two-layer* architecture is used:

```
┌────────────────────────────────────────────────────────┐  
  DOM Layer (React / Web Components)                      
  ↳ Buttons, inputs, cards (content and logic) 
└───────────────────────────┬────────────────────────────┘  
│ Registration of coordinates and geometry
▼  
┌────────────────────────────────────────────────────────┐  
  WebGLCanvas Layer (Bottom canvas layer) 
  ↳ Drawing Inner Shadows, Inner Glow, Drop Shadows  
└────────────────────────────────────────────────────────┘

````

### How it works:
1. **Top Layer (DOM)**: Regular **HTML** elements. These are responsible for clicks, focuses, and text.
2. **Synchronization**: When widgets are mounted or resized, their coordinates are passed to the global bottom layer.
3. **Bottom Layer (WebGLCanvas)**: A single, high-performance Canvas that renders accurate, physically based shadows and glows for all **UI** elements simultaneously using shaders.

---
## Use mds-ui

Before implementing *components* in your projects, you must complete several steps. Detailed documentation for each component is available in **StoryBook**.

### Install

1. Install npm package
```bash
  npm i @minimorphism/mds-ui
```

### Init Singleton WebGL Canvas layer

```js
import React, { useEffect } from "react";
import { initWebGL, WebGLCanvas } from "@minimorphism/mds-ui";
import "@minimorphism/mds-ui/dist/index.css";

initWebGL();

export default function App() {
  return (
    <React.Fragment>
      <WebGLCanvas />
    </React.Fragment>
  );
}
```
---
## Development

We use **Storybook** for isolated development and testing of components in various scenarios.
### Preparation

1. **Clone the repository and install dependencies:**
   ```bash
   cd mds-ui
   npm install
   ```
### Run and Build Storybook

1. **Run Storybook in local development mode:**
   ```bash
   npm run story
   ```
   *After this, the interface will open at `http://localhost:6006`.*

2. **Build a static version of Storybook for production:**
   ```bash
   npm run build:story
   ```
   *The static files will be compiled into the `storybook-static/` directory, ready for deployment.
### Assembly and packaging MDS-UI

1. **Build**
```bash
 npm run build
```

2. Packaging 
```bash
 npm pack
```
### Tests
Command for run Unit-Tests
```bash
 npm run test
```

---
## LICENSE

The source code of this npm package is distributed under the **GPLv3** license, but the design style of **minimorphism** is distributed under **CC-BY-NC 4.0**. View licenses: [LICENSES](./Licenses/)

***

*© 2026 minimorphism. All rights reserved.*
