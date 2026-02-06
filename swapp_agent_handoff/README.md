# SWAPP Agent Handoff: Church Support & Onboarding System

## 1. Purpose
This bundle contains a fully integrated Support and Onboarding system for **SWAPP (Soulwinning Application)**. It is designed to transform the church experience from complex administration to a simplified "5-Step Launch Guide."

### Key Goals attained:
*   **Reduced Friction**: Replaced technical troubleshooting focus with a sequential Church Launch path.
*   **AI Integration**: A browser-side AI Chat Agent that uses the Knowledge Base to provide "biblical-grade" technical support.
*   **Documentation Hub**: A premium manual (`documentation.html`) with video placeholders for recording tutorials.

---

## 2. Component Breakdown

### A. The Manual (`documentation.html` & `help.html`)
*   **Location**: `content/`
*   **Logic**: Uses a sidebar-driven, responsive layout with anchor links.
*   **Video Strategy**: Contains `video-placeholder` divs for 6 core setup videos. (Refer to `knowledge/video_tutorial_plan.md` for recording scripts).

### B. The AI Chat Agent (`js/chat.js`)
*   **Logic**: Uses Google Gemini API (AI Studio).
*   **Setup**: 
    1.  The agent fetches `integrated_kb.md` on initialization.
    2.  It uses strict "System Prompt" rules to maintain a ministry-focused tone.
    3.  It supports **Dynamic Follow-up Buttons** via the `[FOLLOW_UP: text]` tag.
*   **Installation**:
    *   Ensure the `GEMINI_API_KEY` in `js/chat.js` is active.
    *   The `KB_PATH` must point to the relative location of the knowledge base.

### C. The Knowledge Base (`knowledge/`)
*   **integrated_kb.md**: The "Master Brain." Restructured for the 5-step launch path.
*   **historical_insights.md**: Synthesized findings from 1,200+ Tidio support logs (raw logs deleted for security).
*   **video_tutorial_plan.md**: The roadmap for the next agent to follow for video content creation.

---

## 3. Installation for the Next Agent

1.  **Deploy Files**: Move the files from `content/` to the website root (or relevant directories).
2.  **Verify KB Links**: In `js/chat.js`, ensure the `loadKB()` function can reach the converted markdown file.
3.  **Check API**: Verify the Gemini API key has the correct restrictions for your production domain.
4.  **SEO Check**: Titles and Meta descriptions in `documentation.html` are optimized for "Church Outreach Software" and "Soulwinning Management."

## 4. Immediate Next Steps
*   **Record Tutorials**: Open `documentation.html` and use the 6 placeholders as your recording list.
*   **CMS integration**: If moving to a dynamic site, ensure the markdown can be served via a public endpoint for the AI to fetch.

---
*Signed, Antigravity AI*
