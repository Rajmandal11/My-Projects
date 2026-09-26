"use client";

import { useEffect, useRef } from "react";

const FRAME_COUNT = 150;
const FRAME_PATH = "/frames/video-";

function ScrollSequence() {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const frames: HTMLImageElement[] = [];
    let currentFrame = 0;
    let targetFrame = 0;
    let frameRequest = 0;
    let resizeRequest = 0;
    let disposed = false;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const drawFrame = (frameIndex: number) => {
      const image = frames[frameIndex];
      if (!image?.complete || !image.naturalWidth) return;

      const canvasWidth = canvas.clientWidth;
      const canvasHeight = canvas.clientHeight;
      const imageRatio = image.naturalWidth / image.naturalHeight;
      const canvasRatio = canvasWidth / canvasHeight;
      const scale = imageRatio > canvasRatio ? canvasHeight / image.naturalHeight : canvasWidth / image.naturalWidth;
      const width = image.naturalWidth * scale;
      const height = image.naturalHeight * scale;

      context.clearRect(0, 0, canvasWidth, canvasHeight);
      context.drawImage(image, (canvasWidth - width) / 2, (canvasHeight - height) / 2, width, height);
    };

    const resizeCanvas = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.round(canvas.clientWidth * pixelRatio);
      const height = Math.round(canvas.clientHeight * pixelRatio);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      }
      drawFrame(Math.round(currentFrame));
    };

    const loadFrame = (index: number) => {
      if (frames[index]) return;
      const image = new Image();
      image.decoding = "async";
      image.src = `${FRAME_PATH}${String(index + 1).padStart(3, "0")}.jpg`;
      image.onload = () => {
        if (!disposed) {
          drawFrame(Math.round(currentFrame));
          if (index === 0 && !reducedMotion.matches) loadNearbyFrames(1);
        }
      };
      frames[index] = image;
    };

    const loadNearbyFrames = (center: number) => {
      const start = Math.max(0, center - 8);
      const end = Math.min(FRAME_COUNT, center + 14);
      for (let index = start; index < end; index += 1) loadFrame(index);
    };

    const updateTarget = () => {
      const bounds = stage.getBoundingClientRect();
      const travel = Math.max(1, stage.offsetHeight - window.innerHeight);
      const progress = Math.max(0, Math.min(1, -bounds.top / travel));
      targetFrame = progress * (FRAME_COUNT - 1);
      if (!reducedMotion.matches) loadNearbyFrames(Math.round(targetFrame));
      else targetFrame = 0;
    };

    const render = () => {
      if (disposed) return;
      currentFrame += (targetFrame - currentFrame) * (reducedMotion.matches ? 1 : 0.13);
      if (Math.abs(targetFrame - currentFrame) < 0.02) currentFrame = targetFrame;
      drawFrame(Math.round(currentFrame));
      frameRequest = window.requestAnimationFrame(render);
    };

    loadFrame(0);
    loadNearbyFrames(0);
    resizeCanvas();
    updateTarget();
    render();

    const handleScroll = () => updateTarget();
    const handleResize = () => {
      window.cancelAnimationFrame(resizeRequest);
      resizeRequest = window.requestAnimationFrame(resizeCanvas);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    return () => {
      disposed = true;
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.cancelAnimationFrame(frameRequest);
      window.cancelAnimationFrame(resizeRequest);
    };
  }, []);

  return (
    <div className="sequence-stage" ref={stageRef}>
      <canvas className="sequence-canvas" ref={canvasRef} aria-hidden="true" />
      <div className="sequence-vignette" aria-hidden="true" />
      <div className="sequence-content">
        <nav className="site-nav" aria-label="Main navigation">
          <a className="wordmark" href="#top" aria-label="Dreamframe home">
            <span className="wordmark-mark">✦</span>
            DREAMFRAME
          </a>
          <div className="nav-links">
            <a href="#studio">Studio</a>
            <a href="#gallery">Gallery</a>
            <a href="#about">About</a>
          </div>
          <a className="nav-login" href="#login">Log in <span aria-hidden="true">↗</span></a>
        </nav>

        <section className="hero" id="top">
          <div className="hero-copy">
            <div className="availability"><span className="status-dot" /> AI IMAGE GENERATOR</div>
            <p className="eyebrow">VISUALS FROM THE UNIMAGINED</p>
            <h1>DREAM<br /><em>FRAME</em></h1>
            <p className="hero-headline">Create images from imagination.</p>
            <p className="hero-description">
              Turn a thought into a world. Dreamframe creates striking, original images from the way you imagine them.
            </p>
            <a className="primary-button" href="#studio">
              Start creating <span aria-hidden="true">↗</span>
            </a>
            <p className="micro-copy">No design experience needed <span>·</span> Start for free</p>
          </div>

        </section>

        <footer className="hero-footer">
          <span>CREATE WITHOUT LIMITS</span>
          <span className="footer-line" />
          <span>SCROLL TO EXPLORE <b>↓</b></span>
        </footer>
      </div>
    </div>
  );
}

const logos = ["LUMA", "NORTHSTAR", "MOTION/01", "ARC STUDIO", "ORBITAL", "AETHER", "MONUMENT", "FORM & FIELD"];

function LogoMarquee({ reverse = false }: { reverse?: boolean }) {
  const items = [...logos, ...logos];
  return (
    <div className={`marquee-track ${reverse ? "marquee-reverse" : ""}`}>
      {items.map((logo, index) => <span className="marquee-logo" key={`${logo}-${index}`}>{logo}</span>)}
    </div>
  );
}

function LogoSection() {
  return (
    <section className="logo-section" id="gallery">
      <div className="section-kicker"><span>01</span><span>THE DREAMFRAME NETWORK</span></div>
      <p className="logo-intro">Made for the ones<br /><em>making what is next.</em></p>
      <div className="marquee-wrap"><LogoMarquee /><LogoMarquee reverse /></div>
    </section>
  );
}

function BentoSection() {
  return (
    <section className="bento-section" id="studio">
      <div className="section-heading">
        <div className="section-kicker"><span>02</span><span>THE CREATIVE SYSTEM</span></div>
        <h2>One idea.<br /><em>Endless worlds.</em></h2>
        <p>From the first spark to the final frame, Dreamframe gives your imagination room to move.</p>
      </div>
      <div className="bento-grid">
        <article className="bento-card bento-large"><span className="card-label">01 / PROMPT TO IMAGE</span><div className="bento-orb" /><h3>Shape the<br />unseen.</h3><span className="card-arrow">↗</span></article>
        <article className="bento-card bento-tall"><span className="card-label">02 / STYLE ENGINE</span><div className="style-stack"><i /><i /><i /></div><h3>Your visual<br />language.</h3><span className="card-arrow">↗</span></article>
        <article className="bento-card bento-wide"><span className="card-label">03 / ALWAYS IN MOTION</span><div className="signal-lines"><i /><i /><i /><i /></div><h3>Ideas, in their<br /><em>best light.</em></h3><span className="card-arrow">↗</span></article>
        <article className="bento-card bento-small"><span className="card-label">04 / PRIVATE BY DESIGN</span><p>Your work<br />stays yours.</p><span className="card-arrow">↗</span></article>
      </div>
    </section>
  );
}

function ModelSection() {
  return (
    <section className="model-section" id="about">
      <div className="model-copy">
        <div className="section-kicker"><span>03</span><span>DREAMFRAME OBJECTS</span></div>
        <h2>Build the<br /><em>impossible.</em></h2>
        <p>Bring your image into a new dimension. Explore form, light, and depth in a creator made for the next kind of visual.</p>
        <a className="model-link" href="#studio">Explore the model creator <span>↗</span></a>
      </div>
      <div className="model-stage" aria-hidden="true">
        <div className="model-grid" />
        <div className="model-orbit model-orbit-a" />
        <div className="model-orbit model-orbit-b" />
        <div className="model-object"><span /><i /><b /></div>
        <span className="model-coordinate">X 004.28 / Y 018.04 / Z 002.91</span>
      </div>
    </section>
  );
}

export default function DreamframeExperience() {
  return (
    <main className="dreamframe-shell">
      <ScrollSequence />
      <LogoSection />
      <BentoSection />
      <ModelSection />
    </main>
  );
}
