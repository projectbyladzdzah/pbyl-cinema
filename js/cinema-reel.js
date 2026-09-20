/* ==========================================================================
   CINEMA REEL ENGINE — BESPOKE CINEMA ATELIER (cinema-reel.md v3)
   Darkroom Enlarger Crosshairs, Film Stock Rebate, Multi-Album Filtering & Aspect Masks
   ========================================================================== */

import { loadSlides, getPhotosByAlbum, getSlideImageUrl, loadAlbums } from "./portfolio-manager.js?v=2.4";

// Layout & Physics Constants (Full-Screen Edge-to-Edge 100vw x 100dvh)
const SLIDE_VH = 100;
const GAP_VH = 0;
const PITCH_VH = 100;
const PAD_X_VH = 0;
const MASK_VH = 0;
const TOP_PAD_VH = 0;

const WHEEL_PER_EVENT_CAP = 200;
const WHEEL_PAUSE_MS = 100;
const DRAG_THRESHOLD_VH = 14;
const EASE = 0.11;

const FADE_THRESHOLD = 0.55;
const PARALLAX_FACTOR = 0.42;
const ENTRY_OFFSET_PX = 64;
const IMG_HEIGHT_RATIO = 1.2;

const LOOP_COPIES = 7;
const AUTO_SCALE_FROM = 1;
const AUTO_SCROLL_MS = 3000;
const AUTO_FADE_MS = 1000;

export class CinemaReelApp {
  constructor() {
    this.activeAlbumId = "all";
    this.currentAspectMask = "standard"; // 'standard', 'scope', 'euro', 'medium', 'square'
    this.slides = loadSlides();
    this.albums = loadAlbums();
    this.initConstants();

    // State & Refs
    this.idx = this.AUTO_START_IDX;
    this.prevIdx = this.AUTO_START_IDX;
    this.y = 0;
    this.targetY = 0;
    this.wheelLastTime = 0;
    this.autoScrolling = true;
    this.openSlideKey = null;

    this.drag = {
      active: false,
      startClientY: 0,
      startTrackY: 0,
      delta: 0,
      pointerId: 0,
    };

    this.onSection = false;
    this.isPointerDown = false;
    this.cursorPos = { x: 0, y: 0 };
    this.cursorRender = { x: 0, y: 0, scale: 0, opacity: 0 };
    this.cursorInit = false;
    this.cursorZone = null;
    this.cursorOnUi = false;

    this.lastBlurP = 0;
    this.lastBlurTs = 0;
    this.imgDims = { w: 1920, h: 1200 };

    this.dom = {};
    this.slideRefs = [];
    this.rafId = null;
  }

  initConstants() {
    this.N_SLIDES = Math.max(1, this.slides.length);
    this.TOTAL_RENDERED = this.N_SLIDES * LOOP_COPIES;
    this.INITIAL_IDX = Math.floor(LOOP_COPIES / 2) * this.N_SLIDES;
    this.AUTO_START_IDX = this.INITIAL_IDX + Math.min(1, this.N_SLIDES - 1);
    this.AUTO_END_IDX = this.INITIAL_IDX + 3 * this.N_SLIDES;
  }

  init() {
    this.cacheDom();
    this.computeDimensions();
    this.renderSlides();
    this.renderIndicators();
    this.preloadImages();
    this.setupInitialTransforms();
    this.attachEventListeners();
    this.startEntranceAnimation();
    this.startRafLoop();
  }

  reloadSlides(newSlides) {
    this.slides = newSlides;
    this.initConstants();
    this.idx = this.INITIAL_IDX;
    this.prevIdx = this.INITIAL_IDX;
    this.computeDimensions();
    this.renderSlides();
    this.renderIndicators();
    this.targetY = this.topPad - this.idx * this.pitch;
    this.y = this.targetY;
    this.dom.track.style.transform = `translate3d(0, ${this.y}px, 0)`;
  }

  filterByAlbum(albumId) {
    this.activeAlbumId = albumId;
    const filtered = getPhotosByAlbum(albumId);
    this.reloadSlides(filtered);
  }

  setAspectMask(ratio) {
    this.currentAspectMask = ratio;
    this.renderSlides();
    this.targetY = this.topPad - this.idx * this.pitch;
    this.y = this.targetY;
    this.dom.track.style.transform = `translate3d(0, ${this.y}px, 0)`;
  }

  cacheDom() {
    this.dom.section = document.getElementById("cinema-section");
    this.dom.track = document.getElementById("cinema-track");
    this.dom.blurFilter = document.getElementById("cinema-fe-blur");
    this.dom.scanlines = document.getElementById("cinema-scanlines");
    this.dom.indicator = document.getElementById("reel-indicator");
    this.dom.indicatorPips = document.getElementById("pip-column");
    this.dom.indicatorCurrent = document.getElementById("indicator-current");
    this.dom.indicatorTotal = document.getElementById("indicator-total");

    this.dom.cursor = document.getElementById("cinema-cursor");
    this.dom.cursorScroll = document.getElementById("cursor-scroll");
    this.dom.cursorDrag = document.getElementById("cursor-drag");
    this.dom.cursorUp = document.getElementById("cursor-up");
    this.dom.cursorDown = document.getElementById("cursor-down");
  }

  computeDimensions() {
    const vh = window.innerHeight;
    this.viewportH = vh;
    this.pitch = (vh * PITCH_VH) / 100;
    this.slideH = (vh * SLIDE_VH) / 100;
    this.slideW = window.innerWidth - 2 * ((vh * PAD_X_VH) / 100);
    this.dragThresh = (vh * DRAG_THRESHOLD_VH) / 100;
    this.topPad = (vh * TOP_PAD_VH) / 100;

    const IMG_BUCKET_PX = 50;
    const w = Math.max(600, Math.round(window.innerWidth / IMG_BUCKET_PX) * IMG_BUCKET_PX);
    const h = Math.max(500, Math.round((window.innerHeight * IMG_HEIGHT_RATIO) / IMG_BUCKET_PX) * IMG_BUCKET_PX);
    this.imgDims = { w, h };
  }

  preloadImages() {
    this.slides.forEach((slide) => {
      const img = new Image();
      img.src = getSlideImageUrl(slide, this.imgDims.w, this.imgDims.h);
    });
  }

  renderSlides() {
    this.dom.track.innerHTML = "";
    this.slideRefs = [];

    if (!this.slides || this.slides.length === 0) {
      const emptyMsg = document.createElement("div");
      emptyMsg.className = "empty-album-msg";
      emptyMsg.style.cssText = "display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:60dvh; text-align:center; padding:4rem 2rem; color:#a39887;";
      emptyMsg.innerHTML = `
        <p style="font-family:'Playfair Display',serif; font-size:1.75rem; color:#f6efe2; margin-bottom:0.75rem;">Belum Ada Foto dalam Album Ini</p>
        <p style="font-size:0.875rem; letter-spacing:0.08em; text-transform:uppercase; color:#a39887; max-width:400px; line-height:1.6;">Gunakan tombol <strong>+ Add Photo</strong> atau buka <strong>Admin Panel</strong> untuk memasukkan karya ke album ini.</p>
      `;
      this.dom.track.appendChild(emptyMsg);
      return;
    }

    for (let slotIndex = 0; slotIndex < this.TOTAL_RENDERED; slotIndex++) {
      const slide = this.slides[slotIndex % this.N_SLIDES];
      const isFirst = slotIndex === this.AUTO_END_IDX;
      const isPortrait = slide.orientation === "portrait";

      const slideEl = document.createElement("div");
      slideEl.className = `slide-frame ${isPortrait ? "portrait-slide" : ""} mask-${this.currentAspectMask}`;
      slideEl.dataset.slotIndex = slotIndex;
      slideEl.dataset.slideId = slide.id;

      // Inner Presentation Container (Full-Bleed Borderless)
      const inner = document.createElement("div");
      inner.className = "slide-inner";

      // Image Parallax Wrapper
      const imgWrap = document.createElement("div");
      imgWrap.className = `slide-image-wrapper ${isPortrait ? "is-portrait" : "is-landscape"}`;
      imgWrap.setAttribute("data-slide-image", "");

      const imageUrl = getSlideImageUrl(slide, this.imgDims.w, this.imgDims.h);

      if (isPortrait) {
        // Dual-Layer Portrait: Ambient Diffusion + Focused Vertical Frame
        imgWrap.innerHTML = `
          <img src="${imageUrl}" class="portrait-ambient-bg" alt="" aria-hidden="true" draggable="false" />
          <div class="portrait-pillar-container">
            <img src="${imageUrl}" class="portrait-main-img" alt="${slide.titleLines.join(" ")}" loading="eager" decoding="async" fetchpriority="${isFirst ? "high" : "auto"}" draggable="false" />
          </div>
          <div class="slide-vignette-vertical"></div>
          <div class="slide-vignette-radial"></div>
        `;
      } else {
        // Dual-Layer Landscape: Full-Bleed on Desktop, Ambient Backdrop + Contained Cinema Frame on Mobile!
        imgWrap.innerHTML = `
          <img src="${imageUrl}" class="landscape-ambient-bg" alt="" aria-hidden="true" draggable="false" />
          <div class="landscape-pillar-container">
            <img src="${imageUrl}" class="landscape-main-img" alt="${slide.titleLines.join(" ")}" loading="eager" decoding="async" fetchpriority="${isFirst ? "high" : "auto"}" draggable="false" />
          </div>
          <div class="slide-vignette-vertical"></div>
          <div class="slide-vignette-radial"></div>
        `;
      }

      // Content Layer (Bespoke Fullscreen Editorial Photography Overlay)
      const content = document.createElement("div");
      content.className = "slide-content-layer";
      content.setAttribute("data-slide-content", "");

      const albums = loadAlbums();
      const currentAlbum = albums.find((a) => a.id === slide.albumId);
      const albumTitle = currentAlbum ? currentAlbum.title : "Koleksi Mandiri";

      const editorialBar = document.createElement("div");
      editorialBar.className = "slide-editorial-bar";
      editorialBar.setAttribute("data-reveal", "");

      // Left Column: Frame Index, Album Title, Photo Title, Artist, Year
      const leftCol = document.createElement("div");
      leftCol.className = "editorial-left";
      leftCol.innerHTML = `
        <div class="editorial-tag-row">
          <span class="editorial-frame-num">${String((slotIndex % this.N_SLIDES) + 1).padStart(2, "0")} / ${String(this.N_SLIDES).padStart(2, "0")}</span>
          <span class="editorial-album-name">${albumTitle}</span>
          <span class="editorial-separator">&middot;</span>
          <span>${slide.category}</span>
        </div>
        <h2 class="editorial-title">${slide.titleLines.join(" ")}</h2>
        <div class="editorial-meta">
          <span>${slide.director}</span>
          <span>&middot;</span>
          <span>${slide.year}</span>
          ${isPortrait ? `<span style="color:var(--accent-amber);">&middot; PORTRAIT</span>` : ""}
        </div>
      `;

      // Right Column: Story Narrative & Camera Specs
      const rightCol = document.createElement("div");
      rightCol.className = "editorial-right";
      rightCol.innerHTML = `
        <p class="editorial-story">&ldquo;${slide.description}&rdquo;</p>
        <div class="editorial-specs">
          <span>${slide.stats?.format || "35MM"}</span>
          <span>&middot;</span>
          <span>${slide.stats?.aspect || (isPortrait ? "4:5" : "2.39:1")}</span>
          <span>&middot;</span>
          <span>${slide.filmCode || "KODAK"}</span>
        </div>
      `;

      editorialBar.appendChild(leftCol);
      editorialBar.appendChild(rightCol);
      content.appendChild(editorialBar);

      inner.appendChild(imgWrap);
      inner.appendChild(content);
      slideEl.appendChild(inner);

      this.dom.track.appendChild(slideEl);
      this.slideRefs.push(slideEl);
    }
  }

  renderIndicators() {
    if (!this.slides || this.slides.length === 0) {
      this.dom.indicatorCurrent.textContent = "00";
      this.dom.indicatorTotal.textContent = "00";
      this.dom.indicatorPips.innerHTML = "";
      return;
    }

    this.dom.indicatorCurrent.textContent = String(this.modN(this.idx) + 1).padStart(2, "0");
    this.dom.indicatorTotal.textContent = String(this.N_SLIDES).padStart(2, "0");

    this.dom.indicatorPips.innerHTML = "";
    for (let i = 0; i < this.N_SLIDES; i++) {
      const pipBtn = document.createElement("button");
      pipBtn.type = "button";
      pipBtn.setAttribute("data-no-drag", "");
      pipBtn.className = "pip-btn";
      pipBtn.setAttribute("aria-label", `Go to plate ${i + 1}`);

      const dot = document.createElement("span");
      dot.className = `pip-dot ${i === this.modN(this.idx) ? "active" : "idle"}`;
      pipBtn.appendChild(dot);

      pipBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.navigateToMod(i);
      });
      this.dom.indicatorPips.appendChild(pipBtn);
    }
  }

  updateIndicator() {
    if (!this.slides || this.slides.length === 0) return;
    const activeMod = this.modN(this.idx);
    this.dom.indicatorCurrent.textContent = String(activeMod + 1).padStart(2, "0");
    const pips = this.dom.indicatorPips.querySelectorAll(".pip-dot");
    pips.forEach((dot, i) => {
      dot.className = `pip-dot ${i === activeMod ? "active" : "idle"}`;
    });
  }

  setupInitialTransforms() {
    const initialVPitchVh = SLIDE_VH * AUTO_SCALE_FROM + GAP_VH;
    this.y = ((TOP_PAD_VH - this.AUTO_START_IDX * initialVPitchVh) * window.innerHeight) / 100;
    this.targetY = this.y;
    this.dom.track.style.transform = `translate3d(0, ${this.y}px, 0)`;
  }

  startEntranceAnimation() {
    const tweenObj = { p: 0 };
    const SCROLL_TOTAL_S = AUTO_SCROLL_MS / 1000;
    const FADE_S = AUTO_FADE_MS / 1000;
    const vhToPx = window.innerHeight / 100;

    let timelineCompletedOnce = false;

    const mainTween = gsap.timeline({
      onUpdate: () => {
        const p = tweenObj.p;
        const scale = AUTO_SCALE_FROM;
        const idxF = this.AUTO_START_IDX + (this.AUTO_END_IDX - this.AUTO_START_IDX) * p;
        const vpVh = SLIDE_VH * scale + GAP_VH;

        this.y = (TOP_PAD_VH - idxF * vpVh) * vhToPx;
        this.targetY = this.y;
        this.dom.track.style.transform = `translate3d(0, ${this.y}px, 0)`;

        const now = performance.now();
        let norm = 1;
        if (this.lastBlurTs > 0) {
          const dt = Math.max(now - this.lastBlurTs, 1);
          const dp = Math.abs(p - this.lastBlurP);
          const idxRange = Math.max(1, this.AUTO_END_IDX - this.AUTO_START_IDX);
          const idxSpeed = (dp * idxRange) / dt;
          const peakSpeed = (idxRange * 3) / (SCROLL_TOTAL_S * 1000);
          norm = Math.min(idxSpeed / peakSpeed, 1);
        }
        this.lastBlurP = p;
        this.lastBlurTs = now;

        if (this.dom.blurFilter) {
          this.dom.blurFilter.setAttribute("stdDeviation", `0 ${(norm * 18).toFixed(2)}`);
        }
        if (this.dom.scanlines) {
          this.dom.scanlines.style.opacity = norm.toFixed(3);
        }
      },
      onComplete: () => {
        if (timelineCompletedOnce) return;
        timelineCompletedOnce = true;

        if (this.dom.blurFilter) {
          this.dom.blurFilter.setAttribute("stdDeviation", "0 0");
        }
        if (this.dom.scanlines) {
          this.dom.scanlines.style.opacity = "0";
        }

        this.autoScrolling = false;
        this.dom.track.style.filter = "";

        this.idx = this.AUTO_END_IDX;
        this.prevIdx = this.AUTO_END_IDX;
        this.targetY = this.topPad - this.AUTO_END_IDX * this.pitch;
        this.y = this.targetY;
        this.updateIndicator();
        this.maybeWrap();

        const landing = this.slideRefs[this.idx];
        if (landing) {
          const reveals = landing.querySelectorAll("[data-reveal]");
          if (reveals.length) {
            gsap.fromTo(
              reveals,
              { autoAlpha: 0, y: 32, filter: "blur(10px)" },
              {
                autoAlpha: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 1.0,
                ease: "power4.out",
                stagger: 0.07,
              }
            );
          }
        }
      },
    });

    mainTween.to(this.slideRefs, { autoAlpha: 1, duration: FADE_S, ease: "power2.out" }, 0);
    mainTween.to(tweenObj, { p: 1, duration: SCROLL_TOTAL_S, ease: "power3.out" }, 0);
  }

  startRafLoop() {
    const tick = () => {
      const now = performance.now();
      const isDragging = this.drag.active;
      const wheelActive = now - this.wheelLastTime < WHEEL_PAUSE_MS;

      if (!isDragging && !wheelActive && !this.autoScrolling) {
        const dy = this.targetY - this.y;
        if (Math.abs(dy) < 0.5) this.y = this.targetY;
        else this.y += dy * EASE;
      }

      this.dom.track.style.transform = `translate3d(0, ${this.y}px, 0)`;

      const viewCenter = this.viewportH / 2;
      for (let i = 0; i < this.TOTAL_RENDERED; i++) {
        const ref = this.slideRefs[i];
        if (!ref) continue;

        const effectiveTop = i * this.pitch + this.y;
        const slideCenter = effectiveTop + this.slideH / 2;
        const dy = slideCenter - viewCenter;
        const dn = Math.abs(dy) / this.slideH;

        if (dn > 2) {
          const content = ref.querySelector("[data-slide-content]");
          if (content && content.style.opacity !== "0") {
            content.style.opacity = "0";
            content.style.filter = "blur(16px)";
          }
          continue;
        }

        const wrap = ref.querySelector("[data-slide-image]");
        const content = ref.querySelector("[data-slide-content]");

        // Image Parallax (Desktop full bleed only, keep centered on mobile)
        const isMobileScreen = window.innerWidth <= 768 || (window.innerHeight > window.innerWidth);
        if (wrap && !this.autoScrolling && !isMobileScreen) {
          const imgY = -dy / IMG_HEIGHT_RATIO;
          wrap.style.transform = `translate3d(0, ${imgY.toFixed(2)}px, 0)`;
        } else if (wrap && isMobileScreen) {
          wrap.style.transform = "";
        }

        if (this.autoScrolling) {
          if (content && content.style.opacity !== "0") {
            content.style.opacity = "0";
            content.style.filter = "blur(16px)";
          }
          continue;
        }

        const isActive = i === this.idx;
        const isLeaving = i === this.prevIdx && this.prevIdx !== this.idx;

        let opacity = 0,
          blur = 16,
          cy = 0;

        if (isActive) {
          const t = Math.max(0, Math.min(1, 1 - dn / FADE_THRESHOLD));
          opacity = t * t * (3 - 2 * t);
          blur = (1 - opacity) * 14;
          cy = (1 - opacity) * ENTRY_OFFSET_PX * Math.sign(dy || 1);
        } else if (isLeaving) {
          const fade = Math.max(0, 1 - Math.max(0, dn - 0.6) / 0.6);
          opacity = fade;
          blur = (1 - fade) * 6;
          cy = -dy * PARALLAX_FACTOR;
        } else {
          opacity = 0;
          blur = 16;
          cy = 0;
        }

        if (content) {
          content.style.transform = `translate3d(0, ${cy.toFixed(2)}px, 0)`;
          content.style.opacity = opacity.toFixed(3);
          content.style.filter = `blur(${blur.toFixed(2)}px)`;
        }
      }

      this.updateCursor();
      this.rafId = requestAnimationFrame(tick);
    };

    this.rafId = requestAnimationFrame(tick);
  }

  updateCursor() {
    const cur = this.dom.cursor;
    if (!cur) return;

    const px = this.cursorPos.x;
    const py = this.cursorPos.y;

    if (!this.cursorInit && (px !== 0 || py !== 0)) {
      this.cursorRender.x = px;
      this.cursorRender.y = py;
      this.cursorInit = true;
    }

    this.cursorRender.x += (px - this.cursorRender.x) * 0.22;
    this.cursorRender.y += (py - this.cursorRender.y) * 0.22;

    const targetOpacity = this.onSection && this.cursorInit ? 1 : 0;
    this.cursorRender.opacity += (targetOpacity - this.cursorRender.opacity) * 0.18;

    const targetScale = this.isPointerDown ? 1.18 : 1;
    this.cursorRender.scale += (targetScale - this.cursorRender.scale) * 0.22;

    cur.style.transform = `translate3d(${this.cursorRender.x}px, ${this.cursorRender.y}px, 0) translate(-50%, -50%) scale(${this.cursorRender.scale.toFixed(
      3
    )})`;
    cur.style.opacity = this.cursorRender.opacity.toFixed(3);

    const zone = this.cursorZone;
    const isDown = this.isPointerDown;
    const onUi = this.cursorOnUi;

    if (this.dom.cursorScroll) {
      this.dom.cursorScroll.style.opacity = zone === null && !isDown && !onUi ? "1" : "0";
    }
    if (this.dom.cursorDrag) {
      this.dom.cursorDrag.style.opacity = isDown && zone === null ? "1" : "0";
    }
    if (this.dom.cursorUp) {
      this.dom.cursorUp.style.opacity = zone === "top" || (isDown && zone === null) ? "1" : "0";
    }
    if (this.dom.cursorDown) {
      this.dom.cursorDown.style.opacity = zone === "bottom" || (isDown && zone === null) ? "1" : "0";
    }
  }

  attachEventListeners() {
    const section = this.dom.section;

    const onWheel = (e) => {
      if (!this.onSection) return;
      const target = e.target;
      if (target?.closest("[data-no-drag]")) return;

      e.preventDefault();
      const delta = Math.max(-WHEEL_PER_EVENT_CAP, Math.min(WHEEL_PER_EVENT_CAP, e.deltaY));
      this.y -= delta;
      this.wheelLastTime = performance.now();

      const idealFloat = (this.topPad - this.y) / this.pitch;
      const nearest = Math.round(idealFloat);
      if (nearest !== this.idx) {
        this.setIndex(nearest);
      }
    };
    section.addEventListener("wheel", onWheel, { passive: false });

    const onPointerDown = (e) => {
      if (!this.onSection) return;
      if (e.pointerType === "mouse" && e.button !== 0) return;
      const target = e.target;
      if (target?.closest("[data-no-drag]")) return;

      this.wheelLastTime = 0;
      this.drag.active = true;
      this.drag.startClientY = e.clientY;
      this.drag.startTrackY = this.y;
      this.drag.delta = 0;
      this.drag.pointerId = e.pointerId;
      this.isPointerDown = true;
      try {
        section.setPointerCapture(e.pointerId);
      } catch (err) {}
    };

    const onPointerMove = (e) => {
      this.cursorPos.x = e.clientX;
      this.cursorPos.y = e.clientY;

      const topThreshold = (window.innerHeight * MASK_VH) / 100;
      const bottomThreshold = window.innerHeight - (window.innerHeight * MASK_VH) / 100;
      if (e.clientY < topThreshold) this.cursorZone = "top";
      else if (e.clientY > bottomThreshold) this.cursorZone = "bottom";
      else this.cursorZone = null;

      this.cursorOnUi = !!e.target?.closest("[data-no-drag]");

      if (!this.drag.active) return;
      const delta = e.clientY - this.drag.startClientY;
      this.drag.delta = delta;
      this.y = this.drag.startTrackY + delta;
    };

    const endDrag = (committed) => {
      const delta = this.drag.delta;
      const zone = this.cursorZone;
      this.drag.active = false;
      this.isPointerDown = false;
      if (!committed) return;

      if (zone && Math.abs(delta) < 8) {
        const next = this.idx + (zone === "top" ? -1 : 1);
        this.closeDetails();
        this.setIndex(next);
        return;
      }

      if (Math.abs(delta) > this.dragThresh) {
        const next = this.idx + (delta < 0 ? 1 : -1);
        this.setIndex(next);
      }
    };

    const onPointerUp = (e) => {
      if (!this.drag.active) return;
      try {
        section.releasePointerCapture(this.drag.pointerId);
      } catch (err) {}
      endDrag(true);
    };

    const onPointerCancel = () => {
      this.drag.delta = 0;
      this.y = this.drag.startTrackY;
      endDrag(false);
    };

    section.addEventListener("pointerdown", onPointerDown);
    section.addEventListener("pointermove", onPointerMove);
    section.addEventListener("pointerup", onPointerUp);
    section.addEventListener("pointercancel", onPointerCancel);

    section.addEventListener("pointerenter", () => {
      this.onSection = true;
    });
    section.addEventListener("pointerleave", () => {
      this.onSection = false;
      if (this.drag.active) endDrag(true);
    });

    window.addEventListener("resize", () => {
      this.computeDimensions();
      if (!this.autoScrolling) {
        this.targetY = this.topPad - this.idx * this.pitch;
        this.y = this.targetY;
      }
    });

    window.addEventListener("keydown", (e) => {
      // Don't trigger shortcuts if typing inside an input/textarea
      if (["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName)) return;

      if (e.key === "Escape") {
        if (this.dom.section.classList.contains("zen-mode")) {
          this.toggleZenMode();
        }
      } else if (e.key === "z" || e.key === "Z" || e.key === " ") {
        e.preventDefault();
        this.toggleZenMode();
      } else if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        this.setIndex(this.idx + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        this.setIndex(this.idx - 1);
      }
    });

    const zenBtn = document.getElementById("btn-zen-mode");
    if (zenBtn) {
      zenBtn.addEventListener("click", () => this.toggleZenMode());
    }
  }

  setIndex(next) {
    if (next === this.idx) return;
    this.prevIdx = this.idx;
    this.idx = next;
    this.targetY = this.topPad - next * this.pitch;
    this.updateIndicator();
    this.maybeWrap();
  }

  navigateToMod(targetMod) {
    const currentMod = this.modN(this.idx);
    let diff = targetMod - currentMod;
    if (diff > this.N_SLIDES / 2) diff -= this.N_SLIDES;
    else if (diff < -this.N_SLIDES / 2) diff += this.N_SLIDES;
    if (diff === 0) return;
    this.setIndex(this.idx + diff);
  }

  maybeWrap() {
    while (this.idx < this.N_SLIDES) {
      this.idx += this.N_SLIDES;
      this.prevIdx += this.N_SLIDES;
      const shift = this.N_SLIDES * this.pitch;
      this.y -= shift;
      this.targetY -= shift;
      if (this.drag.active) this.drag.startTrackY -= shift;
    }
    while (this.idx >= (LOOP_COPIES - 1) * this.N_SLIDES) {
      this.idx -= this.N_SLIDES;
      this.prevIdx -= this.N_SLIDES;
      const shift = this.N_SLIDES * this.pitch;
      this.y += shift;
      this.targetY += shift;
      if (this.drag.active) this.drag.startTrackY += shift;
    }
  }

  modN(i) {
    return ((i % this.N_SLIDES) + this.N_SLIDES) % this.N_SLIDES;
  }

  toggleZenMode() {
    this.dom.section.classList.toggle("zen-mode");
    const zenBtn = document.getElementById("btn-zen-mode");
    if (zenBtn) {
      const isZen = this.dom.section.classList.contains("zen-mode");
      zenBtn.innerHTML = isZen
        ? `<span class="zen-icon">✕</span> <span>Tutup Zen</span>`
        : `<span class="zen-icon">👁</span> <span>Zen View</span>`;
    }
  }

  openDetails() {}
  closeDetails() {}
}
