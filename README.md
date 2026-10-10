<p align="center">
  <img src="public/favicon.svg" alt="VItra Logo" width="80" height="80" />
</p>

<h1 align="center">VItra — Retinal Intelligence Platform</h1>

<p align="center">
  <strong>AI-Assisted Diabetic Retinopathy Screening & Visualization</strong>
</p>

<p align="center">
  <em>Detect. Explain. Refer.</em>
</p>

<p align="center">
  <a href="#overview">Overview</a> •
  <a href="#features">Features</a> •
  <a href="#technology-stack">Tech Stack</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#datasets">Datasets</a> •
  <a href="#license">License</a>
</p>

---

## Overview

**VItra** (Visual Intelligence for Retinal Analysis) is a modern web-based platform designed to demonstrate AI-assisted screening for **Diabetic Retinopathy (DR)** — one of the leading causes of preventable blindness worldwide. The platform combines a cinematic, scroll-driven retinal visualization experience with an interactive screening application that simulates the full clinical workflow: from fundus image upload, through quality assessment and AI analysis, to a comprehensive results dashboard with Grad-CAM explainability.

VItra bridges the gap between advanced deep learning research and accessible clinical tooling by presenting complex retinal analysis in an intuitive, visually stunning interface that both clinicians and patients can understand.

> **Note:** VItra is a frontend demonstration and visualization platform. AI inference results shown in the screening pipeline are simulated. The platform is designed to integrate with a MATLAB/Simulink backend for production-grade DR classification.

---

## Features

### 🎬 Cinematic Retinal Visualization
- **Scroll-driven eye animation** — 192-frame WebP sequence rendered on HTML5 Canvas, scrubbed in real-time as the user scrolls
- **GSAP + Lenis smooth scrolling** — Premium, buttery-smooth scroll physics with `ScrollTrigger` pinning and timeline-synchronized text reveals
- **Narrative storytelling** — Progressive reveal of retinal anatomy concepts (human eye → retinal structure → vascular network) as the user scrolls deeper

### 🔬 Interactive Screening Pipeline
- **Fundus Image Upload** — Drag-and-drop or click-to-upload interface with live preview and file validation
- **Image Quality Assessment** — Automated quality check simulation with progress indicators (brightness, contrast, focus, artifacts)
- **AI Analysis Pipeline** — Multi-stage analysis visualization (preprocessing → feature extraction → classification → explainability map generation)
- **Results Dashboard** — Comprehensive diagnostic output including:
  - Severity grade classification (No DR → Proliferative DR, 5-level scale)
  - Confidence score with visual progress bars
  - Referral recommendation engine
  - Detected clinical evidence breakdown (microaneurysms, hemorrhages, exudates, cotton wool spots, neovascularization)
  - Grad-CAM model explainability heatmap with Original / Heatmap / Overlay toggle
  - Downloadable analysis report
  
### 🤖 Virtual AI Assistant
- Context-aware conversational assistant that explains screening results in plain language
- Dynamically adapts responses based on detected DR severity, confidence level, and lesion distribution
- Designed to improve patient understanding and clinician communication

### 📊 Model Performance & Dataset Transparency
- Target performance metrics display (Sensitivity, Specificity, AUC-ROC)
- Dataset provenance cards for APTOS 2019, IDRiD, DRIVE, and Messidor-2

---

## Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | React 19 + TypeScript |
| **Build Tool** | Vite 8 |
| **Styling** | Tailwind CSS 4 |
| **Animation** | GSAP (ScrollTrigger) + Lenis Smooth Scroll |
| **Canvas** | HTML5 Canvas API (192-frame WebP sequence) |
| **Backend (Planned)** | MATLAB / Simulink DR Classification Model |

---

## Architecture

```
VItra/
├── public/
│   ├── eye-frames-clean/      # 192 WebP frames for scroll animation
│   ├── ai_doctor_avatar.jpg   # Virtual assistant avatar
│   ├── favicon.svg            # Application icon
│   └── icons.svg              # UI icon sprites
├── src/
│   ├── components/
│   │   ├── Hero.tsx            # Landing section with navigation
│   │   ├── Preloader.tsx       # Frame preloading with progress bar
│   │   ├── CanvasEye.tsx       # Canvas renderer for scroll-driven eye animation
│   │   ├── ScrollTimeline.tsx  # GSAP ScrollTrigger orchestration
│   │   ├── StoryOverlay.tsx    # Narrative text overlays
│   │   ├── TechnologySection.tsx # Datasets & model performance
│   │   └── application/
│   │       ├── ScreeningApp.tsx      # Main screening orchestrator
│   │       ├── UploadImage.tsx       # Fundus image upload
│   │       ├── QualityCheck.tsx      # Image quality assessment
│   │       ├── AnalysisPipeline.tsx  # Multi-stage AI analysis
│   │       ├── ResultsDashboard.tsx  # Comprehensive results view
│   │       ├── VirtualAssistant.tsx  # AI chatbot assistant
│   │       ├── CameraCapture.tsx     # Camera capture interface
│   │       └── DoctorSVG.tsx         # Animated doctor illustration
│   ├── context/
│   │   └── FrameContext.tsx    # Frame preloading state management
│   ├── config.ts              # External application URLs
│   ├── App.tsx                # Root application component
│   ├── main.tsx               # Application entry point
│   ├── App.css                # Global application styles
│   └── index.css              # CSS reset & base styles
├── index.html                 # HTML entry point
├── vite.config.ts             # Vite configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies & scripts
```

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x

### Installation

```bash
# Clone the repository
git clone https://github.com/ammenish/VItra.git
cd VItra

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173/`.

### Build for Production

```bash
npm run build
npm run preview
```

---

## Screening Pipeline Workflow

```
┌──────────────┐    ┌────────────────┐    ┌──────────────────┐    ┌──────────────────┐
│   UPLOAD     │───▶│  QUALITY CHECK │───▶│  AI ANALYSIS     │───▶│  RESULTS         │
│              │    │                │    │                  │    │  DASHBOARD       │
│ Drag & drop  │    │ Brightness     │    │ Preprocessing    │    │ Severity grade   │
│ fundus image │    │ Contrast       │    │ Feature extract  │    │ Confidence score │
│              │    │ Focus          │    │ Classification   │    │ Grad-CAM heatmap │
│              │    │ Artifacts      │    │ Explainability   │    │ Referral advice  │
└──────────────┘    └────────────────┘    └──────────────────┘    └──────────────────┘
```

---

## Datasets

VItra's AI model is designed to be trained and validated on the following benchmark datasets:

| Dataset | Purpose | Description |
|---|---|---|
| **APTOS 2019** | DR Grading Foundation | Large-scale fundus photography dataset for 5-level severity classification |
| **IDRiD** | Lesion Analysis | Pixel-level annotations for microaneurysms, hemorrhages, and exudates |
| **DRIVE** | Vascular Segmentation | Retinal vessel architecture mapping and segmentation ground truth |
| **Messidor-2** | External Validation | Independent evaluation cohort for cross-dataset robustness testing |

---

## Target Model Performance

| Metric | Target |
|---|---|
| Sensitivity (Referable DR) | >90% |
| Specificity | >85% |
| AUC-ROC (Overall) | 0.94 |

*Metrics reflect validation performance on held-out test sets.*

---

## Accessibility & Responsiveness

- Fully responsive across desktop, tablet, and mobile viewports
- Respects `prefers-reduced-motion` — disables smooth scrolling for users who opt out
- Semantic HTML structure with proper ARIA labels
- Keyboard-navigable interface elements

---

## Disclaimer

> **This application is a demonstration tool and does not provide clinical diagnoses.** All AI analysis results displayed are simulated for educational and presentation purposes. Retinal screening decisions must be made by qualified ophthalmologists. AI-assisted screening is a supplementary tool and should never replace professional clinical judgment.

---

## License

This project is developed for academic and research demonstration purposes.

---

<p align="center">
  <sub>Built with ❤️ for advancing accessible eye care through AI</sub>
</p>
