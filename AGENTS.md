# Project Instructions & Agent Governance

This repository contains the **Photography Portfolio** project.
AI coding agents (Antigravity, Claude Code, Cursor, Copilot, Gemini CLI, etc.) working on this repository must strictly adhere to the standards provided by **anti-slop** and **agent-skills**.

---

<!-- antislop:start -->
## antislop: Rules for AI Coding Agents

antislop is a filter, not a style guide: it stops generic AI slop in generated UI, copy, and code, without prescribing arbitrary aesthetics. Direction comes from `DESIGN.md`.

For UI, copy, people, mobile layout, or code comments work, consult the matching antislop skill:
- **Core Filter (R-01 to R-38)**: `.agents/skills/antislop/SKILL.md`
- **UI & Visual Craft**: `.agents/skills/antislop-ui/SKILL.md`
- **Copywriting & Voice**: `.agents/skills/antislop-copywriting/SKILL.md`
- **People & Accessibility**: `.agents/skills/antislop-human/SKILL.md`
- **Mobile & Responsive**: `.agents/skills/antislop-layoutmobile/SKILL.md`
- **Code Comments**: `.agents/skills/antislop-code/SKILL.md`

### Mandatory Anti-Slop Principles:
1. **No AI Clichés**: No purple/indigo gradients on dark themes, no sparkle icons (✨), no "Unlock the power of...", no fake 99.9% uptime or 10,000+ happy clients metrics unless authentic.
2. **Honest Copy**: Plain sentences, direct information, no hype, no emoji bullet lists.
3. **Real Usability**: Sufficient contrast (WCAG AA checked via `contrast-check.py`), keyboard focus indicators, no low-contrast tiny muted gray text.
4. **Direction via DESIGN.md**: Aesthetic direction and personality must strictly derive from `DESIGN.md`. Never invent generic placeholders.
<!-- antislop:end -->

---

## agent-skills: Engineering Lifecycle & Quality Gates

Development workflows must adhere to production-grade engineering principles from `@addyosmani/agent-skills`:

### 1. Intent → Skill Mapping
- **Define & Requirements**: `.agents/skills/spec-driven-development/SKILL.md`
- **Planning & Breakdown**: `.agents/skills/planning-and-task-breakdown/SKILL.md`
- **UI Engineering**: `.agents/skills/frontend-ui-engineering/SKILL.md`
- **Implementation**: `.agents/skills/incremental-implementation/SKILL.md`
- **Testing & Verification**: `.agents/skills/test-driven-development/SKILL.md`
- **Performance Audit**: `.agents/skills/performance-optimization/SKILL.md`
- **Code Review**: `.agents/skills/code-review-and-quality/SKILL.md`
- **Simplification**: `.agents/skills/code-simplification/SKILL.md`

### 2. Core Development Rules
- Spec before code: Never jump into coding complex features without defining expectations.
- Atomic increments: Small, verifiable steps over massive rewrites.
- Clarity over cleverness: Keep solutions simple, robust, and readable.
- High visual craft: Photography takes center stage. Responsive, accessible, and fast.
