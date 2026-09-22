/**
 * Minhaj Rasool — Minimalist Cinematic Portfolio Script
 * - Pure Edge-to-Edge Experience (No margins, no letterboxing)
 * - Ultra-Fast Scroll: No autoplays, zero background video decoding overhead
 * - Universal Hover-to-Play: Any hovered video plays; when mouse leaves, it pauses at exact frame
 * - Interactive Hero & Lightbox Switcher
 */

document.addEventListener('DOMContentLoaded', () => {
  const heroVideo = document.getElementById('heroVideo');

  // --- 0. Cinematic Studio Preloader / Starting Screen (High-Speed & Advanced) ---
  const studioPreloader = document.getElementById('studioPreloader');
  const preloaderVideo = document.getElementById('preloaderVideo');
  const preloaderLineBar = document.getElementById('preloaderLineBar');
  const preloaderCounter = document.getElementById('preloaderCounter');
  let preloaderDismissed = false;

  function dismissPreloader() {
    if (preloaderDismissed || !studioPreloader) return;
    preloaderDismissed = true;

    if (preloaderLineBar) preloaderLineBar.style.width = '100%';
    if (preloaderCounter) preloaderCounter.textContent = '100%';

    studioPreloader.classList.add('loaded');

    if (heroVideo) {
      heroVideo.muted = true;
      heroVideo.play().catch(() => {});
    }

    setTimeout(() => {
      if (preloaderVideo) {
        try { preloaderVideo.pause(); } catch (e) {}
      }
      studioPreloader.style.display = 'none';
      if (heroVideo) {
        heroVideo.muted = true;
        heroVideo.play().catch(() => {});
      }
    }, 400);
  }

  if (studioPreloader && preloaderVideo) {
    studioPreloader.style.backgroundColor = '#ffffff';
    preloaderVideo.muted = true;
    preloaderVideo.playsInline = true;

    // Fast playback speed for instant kinetic energy
    preloaderVideo.playbackRate = 2.4;

    const START_OFFSET_SEC = 0.55;

    const enforceStartTime = () => {
      try {
        preloaderVideo.playbackRate = 2.4;
        if (preloaderVideo.currentTime < START_OFFSET_SEC) {
          preloaderVideo.currentTime = START_OFFSET_SEC;
        }
      } catch (e) {}
    };

    preloaderVideo.addEventListener('loadedmetadata', enforceStartTime);
    preloaderVideo.addEventListener('canplay', enforceStartTime);
    preloaderVideo.addEventListener('play', enforceStartTime);

    // Synchronize fast progress bar & counter
    preloaderVideo.addEventListener('timeupdate', () => {
      if (!preloaderDismissed && preloaderVideo.duration) {
        const start = START_OFFSET_SEC;
        const total = Math.max(0.1, preloaderVideo.duration - start);
        const current = Math.max(0, preloaderVideo.currentTime - start);
        const progress = Math.min(100, Math.round((current / total) * 100));

        if (preloaderLineBar) preloaderLineBar.style.width = `${progress}%`;
        if (preloaderCounter) preloaderCounter.textContent = `${progress}%`;

        if (preloaderVideo.currentTime >= preloaderVideo.duration - 0.08) {
          dismissPreloader();
        }
      }
    });

    preloaderVideo.addEventListener('ended', () => {
      dismissPreloader();
    });

    // Rapid immediate playback trigger
    const p = preloaderVideo.play();
    if (p !== undefined) {
      p.catch(() => {});
    }

    // Click or keypress to skip immediately
    studioPreloader.addEventListener('click', dismissPreloader);
    window.addEventListener('keydown', (e) => {
      if (!preloaderDismissed && (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ')) {
        dismissPreloader();
      }
    }, { once: true });

    // Ultra-fast safety timeout cap (maximum 1.6s so page is guaranteed fast)
    setTimeout(dismissPreloader, 1600);
  } else if (studioPreloader) {
    dismissPreloader();
  }

  // --- 0.1 Universal Interactive Animated SVGs on Click ---
  function triggerSvgClickAnimation(el) {
    if (!el) return;
    const svg = el.tagName.toLowerCase() === 'svg' ? el : el.querySelector('svg');
    if (!svg) return;

    // Pick targeted animation class based on icon context
    let animClass = 'svg-clicked';
    if (el.closest('#soundToggleBtn, #leftSoundToggleBtn, [aria-label*="Sound" i]')) {
      animClass = 'svg-sound-clicked';
    } else if (el.closest('#themeToggleBtn, #leftThemeToggleBtn, [aria-label*="Theme" i], [data-section="gear"]')) {
      animClass = 'svg-rotate-clicked';
    } else if (el.closest('#playPauseBtn, [aria-label*="Play" i]')) {
      animClass = 'svg-play-clicked';
    } else if (el.closest('#fullscreenBtn, [aria-label*="Fullscreen" i]')) {
      animClass = 'svg-fullscreen-clicked';
    } else if (el.closest('.frame-social-link, .contact-social-pill')) {
      animClass = 'svg-social-clicked';
    }

    svg.classList.remove('svg-clicked', 'svg-rotate-clicked', 'svg-sound-clicked', 'svg-play-clicked', 'svg-fullscreen-clicked', 'svg-social-clicked');
    // Force DOM reflow to restart keyframe animation seamlessly
    void svg.offsetWidth;
    svg.classList.add(animClass);

    setTimeout(() => {
      svg.classList.remove(animClass);
    }, 500);
  }

  // Global listener: animate any clicked SVG or SVG parent button/link
  document.addEventListener('click', (e) => {
    const target = e.target;
    if (!target) return;
    const clickableWithSvg = target.closest('button, a, .nav-item-btn, .nav-ctrl-btn, .frame-social-link, .frame-aux-btn, .frame-action-btn, .contact-social-pill, svg');
    if (clickableWithSvg) {
      triggerSvgClickAnimation(clickableWithSvg);
    }
  }, { passive: true });

  // --- 0.2 Brand Logo Interaction on Page ---
  const brandLogos = document.querySelectorAll('.frame-brand-logo');
  brandLogos.forEach(brand => {
    const video = brand.querySelector('.header-logo-video');
    if (!video) return;
    brand.addEventListener('mouseenter', () => {
      video.currentTime = 0;
      video.play().catch(() => {});
    });
    brand.addEventListener('mouseleave', () => {
      video.pause();
    });
  });

  // --- 1. Hero Video Player Controls ---
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  const soundLabel = document.getElementById('soundLabel');
  const iconMuted = document.getElementById('iconMuted');
  const iconSound = document.getElementById('iconSound');
  const leftSoundToggleBtn = document.getElementById('leftSoundToggleBtn');
  const leftIconMuted = document.getElementById('leftIconMuted');
  const leftSoundWave = document.getElementById('leftSoundWave');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const iconPlay = document.getElementById('iconPlay');
  const iconPause = document.getElementById('iconPause');
  const fitFillBtn = document.getElementById('fitFillBtn');
  const fitFillLabel = document.getElementById('fitFillLabel');
  const cinemaModeBtn = document.getElementById('cinemaModeBtn');
  const exitCinemaBtn = document.getElementById('exitCinemaBtn');
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  const progressContainer = document.getElementById('progressContainer');
  const progressBar = document.getElementById('progressBar');
  const timeBubble = document.getElementById('timeBubble');
  const currentFilmTitle = document.getElementById('currentFilmTitle');
  const heroSoundHint = document.getElementById('heroSoundHint');
  const heroSection = document.getElementById('heroFrame') || document.querySelector('.frame-canvas-stage');
  const heroFrame = document.getElementById('heroFrame');
  const frameStartBtn = document.getElementById('frameStartBtn');

  function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return '00:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  // Audio state toggle
  function setAudioState(unmute) {
    if (!heroVideo) return;
    heroVideo.muted = !unmute;
    if (heroVideo.muted) {
      if (iconMuted) iconMuted.style.display = 'block';
      if (iconSound) iconSound.style.display = 'none';
      if (soundLabel) soundLabel.textContent = 'Sound Off';
      if (leftIconMuted) leftIconMuted.style.display = 'block';
      if (leftSoundWave) leftSoundWave.style.display = 'none';
    } else {
      if (iconMuted) iconMuted.style.display = 'none';
      if (iconSound) iconSound.style.display = 'block';
      if (soundLabel) soundLabel.textContent = 'Sound On';
      if (heroSoundHint) heroSoundHint.classList.add('hidden');
      if (leftIconMuted) leftIconMuted.style.display = 'none';
      if (leftSoundWave) leftSoundWave.style.display = 'flex';
    }
  }

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      if (heroVideo) setAudioState(heroVideo.muted);
    });
  }

  if (leftSoundToggleBtn) {
    leftSoundToggleBtn.addEventListener('click', () => {
      if (heroVideo) setAudioState(heroVideo.muted);
    });
  }

  // Play / Pause Toggle Helper
  function togglePlay() {
    if (!heroVideo) return;
    if (heroVideo.paused) {
      heroVideo.play().then(() => {
        if (iconPlay) iconPlay.style.display = 'none';
        if (iconPause) iconPause.style.display = 'block';
      }).catch(() => {});
    } else {
      heroVideo.pause();
      if (iconPlay) iconPlay.style.display = 'block';
      if (iconPause) iconPause.style.display = 'none';
    }
  }

  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', togglePlay);
  }

  // Cinema Mode Toggle
  function toggleCinemaMode(force) {
    const active = typeof force === 'boolean' ? force : !document.body.classList.contains('cinema-mode-active');
    document.body.classList.toggle('cinema-mode-active', active);
    if (cinemaModeBtn) {
      cinemaModeBtn.classList.toggle('active', active);
    }
  }

  if (cinemaModeBtn) {
    cinemaModeBtn.addEventListener('click', () => toggleCinemaMode());
  }

  if (exitCinemaBtn) {
    exitCinemaBtn.addEventListener('click', () => toggleCinemaMode(false));
  }

  // Video Progress Update & Cine HUD Live Telemetry
  const cineLiveTc = document.getElementById('cineLiveTc');
  if (heroVideo) {
    heroVideo.addEventListener('timeupdate', () => {
      if (heroVideo.duration && progressBar) {
        const percent = (heroVideo.currentTime / heroVideo.duration) * 100;
        progressBar.style.width = `${percent}%`;
      }
      if (cineLiveTc) {
        const totalSec = heroVideo.currentTime || 0;
        const h = Math.floor(totalSec / 3600);
        const m = Math.floor((totalSec % 3600) / 60);
        const s = Math.floor(totalSec % 60);
        const f = Math.floor((totalSec % 1) * 24);
        cineLiveTc.textContent = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}:${f.toString().padStart(2, '0')}`;
      }
    });

    // Update play/pause icons when video naturally plays/pauses
    heroVideo.addEventListener('play', () => {
      if (iconPlay) iconPlay.style.display = 'none';
      if (iconPause) iconPause.style.display = 'block';
    });
    heroVideo.addEventListener('pause', () => {
      if (iconPlay) iconPlay.style.display = 'block';
      if (iconPause) iconPause.style.display = 'none';
    });
  }

  // Progress Bar Scrubbing
  if (progressContainer) {
    progressContainer.addEventListener('click', (e) => {
      const rect = progressContainer.getBoundingClientRect();
      const clickPos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      if (heroVideo && heroVideo.duration) {
        heroVideo.currentTime = clickPos * heroVideo.duration;
      }
    });

    progressContainer.addEventListener('mousemove', (e) => {
      if (!heroVideo || !heroVideo.duration || !timeBubble) return;
      const rect = progressContainer.getBoundingClientRect();
      const hoverPos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const scrubTime = hoverPos * heroVideo.duration;
      timeBubble.textContent = formatTime(scrubTime);
      timeBubble.style.left = `${hoverPos * 100}%`;
    });
  }

  // Fullscreen
  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        const target = heroFrame || heroVideo;
        if (target && target.requestFullscreen) {
          target.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    });
  }

  // START HERE Button Action: Unmute & Scroll to Showcase
  if (frameStartBtn) {
    frameStartBtn.addEventListener('click', () => {
      if (heroVideo) {
        setAudioState(true);
        heroVideo.play().catch(() => {});
      }
      const filmsSec = document.getElementById('films');
      if (filmsSec) {
        filmsSec.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Helper to ensure hero video autoplays safely
  function playHeroVideo() {
    if (!heroVideo) return;
    heroVideo.muted = true;
    const playPromise = heroVideo.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        if (iconPlay) iconPlay.style.display = 'none';
        if (iconPause) iconPause.style.display = 'block';
      }).catch(() => {
        heroVideo.muted = true;
        heroVideo.play().catch(() => {});
      });
    }
  }

  if (heroVideo) {
    playHeroVideo();
    heroVideo.addEventListener('loadeddata', playHeroVideo, { once: true });
    heroVideo.addEventListener('canplay', playHeroVideo, { once: true });
  }

  // --- 2. HERO VIEWPORT OBSERVER & SHOWCASE CONTROLLERS ---
  // A. Hero Frame: Plays automatically when in viewport; pauses when scrolled out of view to save performance
  if ('IntersectionObserver' in window && heroFrame && heroVideo) {
    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          playHeroVideo();
        } else {
          heroVideo.pause();
        }
      });
    }, { threshold: 0.15 });
    heroObserver.observe(heroFrame);
  }

  // Contact Section 16:9 Chef Video Autoplay Observer
  const contactBlock = document.getElementById('contact');
  const contactBgVideo = document.getElementById('contactBgVideo');
  if ('IntersectionObserver' in window && contactBlock && contactBgVideo) {
    const contactObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          contactBgVideo.muted = true;
          contactBgVideo.play().catch(() => {});
        } else {
          contactBgVideo.pause();
        }
      });
    }, { threshold: 0.1 });
    contactObserver.observe(contactBlock);
  }



  // --- 2.2. Vertical Campaign Showcase Controller ---
  const verticalRows = document.querySelectorAll('.vertical-showcase-row');

  // Format SMPTE Timecode: HH:MM:SS:FF
  function formatSMPTE(seconds) {
    if (isNaN(seconds) || seconds < 0) return '00:00:00:00';
    const totalMs = seconds * 1000;
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    const frames = Math.floor((totalMs % 1000) / (1000 / 24));
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}:${frames.toString().padStart(2, '0')}`;
  }

  // Mute all other vertical showcase videos and hero video when one plays with audio
  function muteAllOtherVideos(exceptVideo) {
    verticalRows.forEach(row => {
      const v = row.querySelector('.showcase-media-video');
      if (v && v !== exceptVideo) {
        v.muted = true;
        updateRowSoundUI(row, false);
      }
    });
    if (exceptVideo && heroVideo && !heroVideo.muted) {
      setAudioState(false);
    }
  }

  function updateRowSoundUI(row, isSoundOn) {
    const soundBtn = row.querySelector('.showcase-btn-sound');
    const hudSoundBtn = row.querySelector('.showcase-hud-sound-toggle');
    
    if (soundBtn) {
      soundBtn.classList.toggle('sound-active', isSoundOn);
      const label = soundBtn.querySelector('.sound-label');
      const offIcon = soundBtn.querySelector('.sound-off-icon');
      const onIcon = soundBtn.querySelector('.sound-on-icon');
      if (label) label.textContent = isSoundOn ? 'Audio On' : 'Audio Off';
      if (offIcon) offIcon.style.display = isSoundOn ? 'none' : 'block';
      if (onIcon) onIcon.style.display = isSoundOn ? 'block' : 'none';
    }

    if (hudSoundBtn) {
      const hudMuted = hudSoundBtn.querySelector('.hud-sound-icon-muted');
      const hudActive = hudSoundBtn.querySelector('.hud-sound-icon-active');
      if (hudMuted) hudMuted.style.display = isSoundOn ? 'none' : 'block';
      if (hudActive) hudActive.style.display = isSoundOn ? 'block' : 'none';
    }
  }

  verticalRows.forEach(row => {
    const video = row.querySelector('.showcase-media-video');
    const ambientVideo = row.querySelector('.showcase-ambient-video');
    const frame = row.querySelector('.showcase-clean-video-frame') || row.querySelector('.showcase-phone-frame');
    const cinemaBtn = row.querySelector('.edge-cinema-view-btn');
    const soundBtn = row.querySelector('.showcase-btn-sound');
    const hudSoundBtn = row.querySelector('.showcase-hud-sound-toggle');
    const progressTrack = row.querySelector('.showcase-progress-track');
    const progressBar = row.querySelector('.showcase-progress-bar');
    const timeDisplay = row.querySelector('.showcase-time-display');
    const hudTc = row.querySelector('[data-hud-tc]');
    const playIcon = row.querySelector('.showcase-icon-play');
    const pauseIcon = row.querySelector('.showcase-icon-pause');
    const videoSrc = row.getAttribute('data-video-src');
    const filmTitle = row.getAttribute('data-title');

    if (!video) return;

    // Helper to play both foreground and ambient background video
    function playRowVideos() {
      row.classList.add('is-playing');
      if (frame) frame.classList.add('is-playing');
      if (playIcon) playIcon.style.display = 'none';
      if (pauseIcon) pauseIcon.style.display = 'block';

      video.play().catch(() => {});
      if (ambientVideo) {
        ambientVideo.muted = true;
        ambientVideo.play().catch(() => {});
      }
    }

    // Helper to pause both foreground and ambient background video
    function pauseRowVideos() {
      row.classList.remove('is-playing');
      if (frame) frame.classList.remove('is-playing');
      if (playIcon) playIcon.style.display = 'block';
      if (pauseIcon) pauseIcon.style.display = 'none';

      video.pause();
      if (ambientVideo) {
        ambientVideo.pause();
      }
    }

    // Hover on entire row or frame triggers playback
    row.addEventListener('mouseenter', () => {
      playRowVideos();
    });

    // Click frame or play overlay toggles play/pause
    if (frame) {
      frame.addEventListener('click', (e) => {
        if (e.target.closest('.showcase-hud-bottom') || e.target.closest('button')) return;
        if (video.paused) {
          playRowVideos();
        } else {
          pauseRowVideos();
        }
      });
    }

    // Sound toggle helper
    function toggleVideoSound() {
      const willUnmute = video.muted;
      if (willUnmute) {
        muteAllOtherVideos(video);
        video.muted = false;
        playRowVideos();
        updateRowSoundUI(row, true);
      } else {
        video.muted = true;
        updateRowSoundUI(row, false);
      }
    }

    if (soundBtn) {
      soundBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleVideoSound();
      });
    }

    if (hudSoundBtn) {
      hudSoundBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleVideoSound();
      });
    }

    // Real-time progress, timecode updates, and ambient video sync
    video.addEventListener('timeupdate', () => {
      if (video.duration && progressBar) {
        const percent = (video.currentTime / video.duration) * 100;
        progressBar.style.width = `${percent}%`;
      }
      if (timeDisplay) {
        timeDisplay.textContent = formatTime(video.currentTime);
      }
      if (hudTc) {
        hudTc.textContent = formatSMPTE(video.currentTime);
      }
      // Ensure ambient video is synced within 0.25s
      if (ambientVideo && Math.abs(ambientVideo.currentTime - video.currentTime) > 0.25) {
        try {
          ambientVideo.currentTime = video.currentTime;
        } catch (e) {}
      }
    });

    video.addEventListener('play', () => {
      if (ambientVideo && ambientVideo.paused) {
        ambientVideo.currentTime = video.currentTime;
        ambientVideo.muted = true;
        ambientVideo.play().catch(() => {});
      }
      row.classList.add('is-playing');
      if (frame) frame.classList.add('is-playing');
      if (playIcon) playIcon.style.display = 'none';
      if (pauseIcon) pauseIcon.style.display = 'block';
    });

    video.addEventListener('pause', () => {
      if (ambientVideo && !ambientVideo.paused) {
        ambientVideo.pause();
      }
      row.classList.remove('is-playing');
      if (frame) frame.classList.remove('is-playing');
      if (playIcon) playIcon.style.display = 'block';
      if (pauseIcon) pauseIcon.style.display = 'none';
    });

    // Progress Bar Scrubbing
    if (progressTrack) {
      progressTrack.addEventListener('click', (e) => {
        e.stopPropagation();
        const rect = progressTrack.getBoundingClientRect();
        const clickPos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        if (video.duration) {
          const newTime = clickPos * video.duration;
          video.currentTime = newTime;
          if (ambientVideo) {
            ambientVideo.currentTime = newTime;
          }
        }
      });
    }

    // Fullscreen Cinema button
    if (cinemaBtn) {
      cinemaBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openLightboxVideo(videoSrc, filmTitle);
      });
    }
  });

  // Scroll Autoplay Intersection Observer for Showcase Rows (plays foreground + ambient when scrolled to section)
  if ('IntersectionObserver' in window) {
    const rowObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const row = entry.target;
        const video = row.querySelector('.showcase-media-video');
        const ambientVideo = row.querySelector('.showcase-ambient-video');

        if (entry.isIntersecting) {
          row.classList.add('in-view');
          if (video) {
            video.muted = true;
            video.play().catch(() => {});
          }
          if (ambientVideo) {
            ambientVideo.muted = true;
            ambientVideo.play().catch(() => {});
          }
        } else {
          row.classList.remove('in-view');
          if (video && video.muted) {
            video.pause();
          }
          if (ambientVideo) {
            ambientVideo.pause();
          }
        }
      });
    }, { threshold: 0.25 });

    verticalRows.forEach(row => rowObserver.observe(row));
  } else {
    verticalRows.forEach(row => row.classList.add('in-view'));
  }

  // --- 2.5. Interactive Category Filter System ---
  const categoryTabs = document.querySelectorAll('.category-tab-btn');
  const allCategorizedCards = document.querySelectorAll('.vertical-showcase-row');

  categoryTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      if (e && e.preventDefault) e.preventDefault();
      const filter = tab.getAttribute('data-filter');
      categoryTabs.forEach(t => t.classList.toggle('active', t === tab));

      let firstMatch = null;
      allCategorizedCards.forEach(card => {
        const cardCat = card.getAttribute('data-category') || '';
        const isMatch = filter === 'all' || cardCat.includes(filter);

        if (isMatch) {
          card.classList.remove('category-hidden');
          if (!firstMatch) firstMatch = card;
        } else {
          card.classList.add('category-hidden');
        }
      });

      // Navigate smoothly to the matching video in the showcase section
      if (firstMatch && filter !== 'all') {
        const headerOffset = 80;
        const cardPosition = firstMatch.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({
          top: cardPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- 2.6. Kinetic Word-by-Word Scroll Typography Engine ---
  const manifestoSection = document.getElementById('manifesto');
  const manifestoText = document.getElementById('manifestoText');

  if (manifestoSection && manifestoText) {
    const rawText = manifestoText.textContent.trim();
    const words = rawText.split(/\s+/);
    manifestoText.innerHTML = words.map((w, idx) => `<span class="scroll-word" data-word-index="${idx}">${w}</span> `).join('');

    const wordElements = manifestoText.querySelectorAll('.scroll-word');
    const totalWords = wordElements.length;
    let ticking = false;

    function updateWordScroll() {
      const rect = manifestoSection.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;

      // Calculate smooth normalized scroll progress (0 when entering bottom, 1 when focused in center)
      const startOffset = vh * 0.92;
      const endOffset = vh * 0.28;
      const progress = Math.max(0, Math.min(1, (startOffset - rect.top) / (startOffset - endOffset)));

      wordElements.forEach((wordEl, i) => {
        const wordThreshold = i / totalWords;
        const wordEnd = (i + 1) / totalWords;

        if (progress >= wordEnd) {
          // Scrolled down past word: fully illuminated, crisp, cohesive
          wordEl.style.opacity = '1';
          wordEl.style.filter = 'blur(0px)';
          wordEl.style.transform = 'translateY(0) scale(1)';
          wordEl.style.letterSpacing = 'normal';
          wordEl.classList.add('revealed');
        } else if (progress <= wordThreshold) {
          // Scrolling back UP to upper section: words spread out, disperse and hide
          const dist = wordThreshold - progress;
          wordEl.style.opacity = Math.max(0.08, 0.18 - dist * 0.5).toFixed(3);
          wordEl.style.filter = `blur(${Math.min(7, 2 + dist * 14)}px)`;
          wordEl.style.transform = `translateY(${Math.min(26, dist * 40)}px) scale(${Math.max(0.92, 1 - dist * 0.15)})`;
          wordEl.style.letterSpacing = `${Math.min(0.22, 0.03 + dist * 0.38)}em`;
          wordEl.classList.remove('revealed');
        } else {
          // Interpolating in real time between word bounds
          const p = (progress - wordThreshold) / (wordEnd - wordThreshold);
          wordEl.style.opacity = (0.18 + p * 0.82).toFixed(3);
          wordEl.style.filter = `blur(${(1 - p) * 4.5}px)`;
          wordEl.style.transform = `translateY(${(1 - p) * 16}px) scale(${0.95 + p * 0.05})`;
          wordEl.style.letterSpacing = `${(1 - p) * 0.1}em`;
          wordEl.classList.toggle('revealed', p > 0.5);
        }
      });

      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(updateWordScroll);
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateWordScroll();
  }

  // --- 3. Lightbox Cinema Viewer ---
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxVideo = document.getElementById('lightboxVideo');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxTriggers = document.querySelectorAll('[data-lightbox]');

  function openLightboxImage(src, caption) {
    if (!lightboxModal) return;
    if (lightboxVideo) {
      lightboxVideo.pause();
      lightboxVideo.style.display = 'none';
      lightboxVideo.src = '';
    }
    if (lightboxImage) {
      lightboxImage.src = src;
      lightboxImage.style.display = 'block';
    }
    if (lightboxCaption) {
      lightboxCaption.textContent = caption || 'Minhaj Rasool — Visual Works';
    }
    lightboxModal.classList.add('open', 'active');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function openLightboxVideo(src, caption) {
    if (!lightboxModal) return;
    if (lightboxImage) {
      lightboxImage.style.display = 'none';
      lightboxImage.src = '';
    }
    if (lightboxVideo) {
      lightboxVideo.src = src;
      lightboxVideo.style.display = 'block';
      lightboxVideo.load();
      lightboxVideo.play().catch(() => {});
    }
    if (lightboxCaption) {
      lightboxCaption.textContent = caption || 'Minhaj Rasool — Cinema Showcase';
    }
    lightboxModal.classList.add('open', 'active');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    if (lightboxVideo) {
      lightboxVideo.pause();
      lightboxVideo.src = '';
      lightboxVideo.style.display = 'none';
    }
    if (lightboxImage) {
      lightboxImage.src = '';
      lightboxImage.style.display = 'none';
    }
    lightboxModal.classList.remove('open', 'active');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  lightboxTriggers.forEach(el => {
    el.addEventListener('click', () => {
      const src = el.getAttribute('data-lightbox');
      const caption = el.getAttribute('data-caption');
      if (src) openLightboxImage(src, caption);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  // --- 4. Booking Inquiry Modal ---
  const inquireModal = document.getElementById('inquireModal');
  const openInquireBtn = document.getElementById('openInquireBtn');
  const openInquireHeaderBtn = document.getElementById('openInquireHeaderBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const cancelModalBtn = document.getElementById('cancelModalBtn');
  const inquireForm = document.getElementById('inquireForm');

  function openInquireModal(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (!inquireModal) return;
    inquireModal.classList.add('open', 'active');
    inquireModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      document.getElementById('clientName')?.focus();
    }, 100);
  }

  function closeInquireModal(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (!inquireModal) return;
    inquireModal.classList.remove('open', 'active');
    inquireModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (openInquireBtn) openInquireBtn.addEventListener('click', openInquireModal);
  if (openInquireHeaderBtn) openInquireHeaderBtn.addEventListener('click', openInquireModal);
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeInquireModal);
  if (cancelModalBtn) cancelModalBtn.addEventListener('click', closeInquireModal);

  if (inquireModal) {
    inquireModal.addEventListener('click', (e) => {
      if (e.target === inquireModal) closeInquireModal();
    });
  }

  if (inquireForm) {
    inquireForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const clientName = document.getElementById('clientName').value;
      closeInquireModal();
      inquireForm.reset();
      showToast(`Thank you, ${clientName}! Your inquiry has been dispatched.`);
    });
  }

  // --- 5. Toast Feedback ---
  const toastNotification = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');
  let toastTimer;

  function showToast(message) {
    if (!toastNotification || !toastMessage) return;
    toastMessage.textContent = message;
    toastNotification.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 4000);
  }

  // --- 6. Copy Email ---
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const copyEmailText = document.getElementById('copyEmailText');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'minhaj.rasool.visuals@gmail.com';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(() => {
          showToast(`Copied ${email} to clipboard!`);
          if (copyEmailText) copyEmailText.textContent = 'Email Copied!';
          setTimeout(() => {
            if (copyEmailText) copyEmailText.textContent = 'Copy Contact Email';
          }, 3000);
        });
      } else {
        showToast(`Contact: ${email}`);
      }
    });
  }

  // --- 7. Minimal Left Navigation Bar Controller ---
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const minimalLeftNavbar = document.getElementById('minimalLeftNavbar');
  const headerBar = document.querySelector('.frame-header-bar');

  function openNavbar() {
    if (minimalLeftNavbar) {
      minimalLeftNavbar.classList.remove('closed');
      minimalLeftNavbar.setAttribute('aria-hidden', 'false');
    }
    if (hamburgerBtn) {
      hamburgerBtn.classList.add('is-active');
      hamburgerBtn.setAttribute('aria-expanded', 'true');
      hamburgerBtn.setAttribute('title', 'Close Navigation Menu');
    }
    if (typeof onScrollSpy === 'function') {
      setTimeout(onScrollSpy, 60);
    }
  }

  function closeNavbar() {
    if (minimalLeftNavbar) {
      minimalLeftNavbar.classList.add('closed');
      minimalLeftNavbar.setAttribute('aria-hidden', 'true');
    }
    if (hamburgerBtn) {
      hamburgerBtn.classList.remove('is-active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      hamburgerBtn.setAttribute('title', 'Open Navigation Menu');
    }
  }

  function toggleNavbar() {
    if (minimalLeftNavbar && !minimalLeftNavbar.classList.contains('closed')) {
      closeNavbar();
    } else {
      openNavbar();
    }
  }

  const openDrawer = openNavbar;
  const closeDrawer = closeNavbar;

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', toggleNavbar);
  }

  // On mobile screens only, close navbar when a section link is clicked
  if (minimalLeftNavbar) {
    minimalLeftNavbar.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          closeNavbar();
        }
      });
    });
  }

  // Close navbar on click or tap outside
  function handleOutsideCollapse(e) {
    if (minimalLeftNavbar && !minimalLeftNavbar.classList.contains('closed')) {
      if (!minimalLeftNavbar.contains(e.target) && !hamburgerBtn?.contains(e.target)) {
        closeNavbar();
      }
    }
  }
  document.addEventListener('pointerdown', handleOutsideCollapse);
  document.addEventListener('click', handleOutsideCollapse);

  // Dynamic header bar background blur when scrolled past hero
  function onHeaderScroll() {
    const isScrolled = window.scrollY > 60;
    if (headerBar) headerBar.classList.toggle('scrolled', isScrolled);
    if (hamburgerBtn) hamburgerBtn.classList.toggle('scrolled', isScrolled);
  }
  window.addEventListener('scroll', onHeaderScroll, { passive: true });
  onHeaderScroll();

  // --- 8. Theme Switcher (Dark & Light Mode) ---
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const headerIconSun = document.getElementById('headerIconSun');
  const headerIconMoon = document.getElementById('headerIconMoon');
  const themeLabel = document.getElementById('themeLabel');

  const leftThemeToggleBtn = document.getElementById('leftThemeToggleBtn');
  const leftIconSun = document.getElementById('leftIconSun');
  const leftIconMoon = document.getElementById('leftIconMoon');
  const leftThemeIconWrap = document.getElementById('leftThemeIconWrap');

  const drawerThemeToggleBtn = document.getElementById('drawerThemeToggleBtn');
  const drawerIconSun = document.getElementById('drawerIconSun');
  const drawerIconMoon = document.getElementById('drawerIconMoon');
  const drawerThemeLabel = document.getElementById('drawerThemeLabel');

  function getPreferredTheme() {
    const saved = localStorage.getItem('minhaj_portfolio_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  function applyTheme(theme, notify = false) {
    const isDark = theme === 'dark';

    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.body.setAttribute('data-theme', 'dark');
      document.body.classList.add('dark-mode');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      document.body.setAttribute('data-theme', 'light');
      document.body.classList.remove('dark-mode');
    }

    // Update Header Button UI (displays icon to switch TO the other theme)
    if (headerIconSun && headerIconMoon) {
      headerIconSun.style.display = isDark ? 'block' : 'none';
      headerIconMoon.style.display = isDark ? 'none' : 'block';
    }
    if (themeLabel) {
      themeLabel.textContent = isDark ? 'Light' : 'Dark';
    }
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute('title', isDark ? 'Switch to Light Mode (T)' : 'Switch to Dark Mode (T)');
    }

    // Update Left Navbar Button UI
    if (leftIconSun && leftIconMoon) {
      leftIconSun.style.display = isDark ? 'block' : 'none';
      leftIconMoon.style.display = isDark ? 'none' : 'block';
    }
    if (leftThemeToggleBtn) {
      leftThemeToggleBtn.setAttribute('title', isDark ? 'Switch to Light Mode (T)' : 'Switch to Dark Mode (T)');
    }

    // Update Drawer Button UI
    if (drawerIconSun && drawerIconMoon) {
      drawerIconSun.style.display = isDark ? 'block' : 'none';
      drawerIconMoon.style.display = isDark ? 'none' : 'block';
    }
    if (drawerThemeLabel) {
      drawerThemeLabel.textContent = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    }

    localStorage.setItem('minhaj_portfolio_theme', isDark ? 'dark' : 'light');

    if (notify) {
      showToast(isDark ? 'Switched to Cinematic Dark Mode' : 'Switched to Gallery Light Mode');
    }
  }

  function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme') || (document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme, true);
  }

  if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
  if (leftThemeToggleBtn) leftThemeToggleBtn.addEventListener('click', toggleTheme);
  if (drawerThemeToggleBtn) drawerThemeToggleBtn.addEventListener('click', toggleTheme);

  // --- 8.5. Minimal Left-Side Navbar Controller ("With Effect") ---
  const navActiveBar = document.getElementById('navActiveBar');
  const navItemBtns = document.querySelectorAll('.nav-items-stack .nav-item-btn');
  const navBrandBtn = document.getElementById('navBrandBtn');
  const leftInquireBtn = document.getElementById('leftInquireBtn');

  // Track sections for scroll-spy
  const trackedSections = [
    { id: 'heroFrame', btn: document.querySelector('.nav-item-btn[data-section="heroFrame"]') },
    { id: 'films', btn: document.querySelector('.nav-item-btn[data-section="films"]') },
    { id: 'about', btn: document.querySelector('.nav-item-btn[data-section="about"]') },
    { id: 'gear', btn: document.querySelector('.nav-item-btn[data-section="gear"]') },
    { id: 'contact', btn: document.querySelector('.nav-item-btn[data-section="contact"]') }
  ];

  function updateActiveIndicator(activeBtn) {
    if (!activeBtn || !navActiveBar || !minimalLeftNavbar) return;

    navItemBtns.forEach(btn => {
      if (btn === activeBtn) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    const isMobile = window.innerWidth <= 768;
    const navRect = minimalLeftNavbar.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();

    if (isMobile) {
      const leftOffset = btnRect.left - navRect.left + (btnRect.width - 24) / 2;
      navActiveBar.style.left = `${leftOffset}px`;
      navActiveBar.style.width = '24px';
      navActiveBar.style.top = '0px';
    } else {
      const topOffset = btnRect.top - navRect.top + (btnRect.height - 28) / 2;
      navActiveBar.style.top = `${topOffset}px`;
      navActiveBar.style.height = '28px';
      navActiveBar.style.left = '0px';
    }
  }

  function onScrollSpy() {
    const scrollPos = window.scrollY + window.innerHeight * 0.38;
    let currentActive = trackedSections[0]?.btn;

    for (let i = 0; i < trackedSections.length; i++) {
      const secEl = document.getElementById(trackedSections[i].id);
      if (secEl) {
        const top = secEl.offsetTop;
        if (scrollPos >= top) {
          currentActive = trackedSections[i].btn;
        }
      }
    }

    if (currentActive) {
      updateActiveIndicator(currentActive);
    }
  }

  window.addEventListener('scroll', onScrollSpy, { passive: true });
  window.addEventListener('resize', onScrollSpy, { passive: true });
  setTimeout(onScrollSpy, 350);

  // Smooth scroll and immediate indicator slide on click
  navItemBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const href = btn.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetSec = document.querySelector(href);
        if (targetSec) {
          targetSec.scrollIntoView({ behavior: 'smooth' });
          updateActiveIndicator(btn);
        }
      }
    });
  });

  if (navBrandBtn) {
    navBrandBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeNavbar();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (trackedSections[0]?.btn) {
        updateActiveIndicator(trackedSections[0].btn);
      }
    });
  }

  if (leftInquireBtn) {
    leftInquireBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openInquireModal();
    });
  }

  // Initialize theme on load
  applyTheme(getPreferredTheme(), false);

  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      const saved = localStorage.getItem('minhaj_portfolio_theme');
      if (!saved) {
        applyTheme(e.matches ? 'dark' : 'light', false);
      }
    });
  }

  // Keyboard Shortcuts
  document.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

    if (e.code === 'Space') {
      e.preventDefault();
      togglePlay();
    } else if (e.key === 'm' || e.key === 'M') {
      if (heroVideo) setAudioState(heroVideo.muted);
    } else if (e.key === 't' || e.key === 'T') {
      toggleTheme();
    } else if (e.key === 'c' || e.key === 'C') {
      toggleCinemaMode();
    } else if (e.key === 'f' || e.key === 'F') {
      if (fullscreenBtn) fullscreenBtn.click();
    } else if (e.key === 'n' || e.key === 'N') {
      toggleNavbar();
    } else if (e.key === 'Escape') {
      closeLightbox();
      closeInquireModal();
      closeNavbar();
      toggleCinemaMode(false);
    }
  });
});
