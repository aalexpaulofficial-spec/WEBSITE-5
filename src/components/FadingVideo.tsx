import React, { useEffect, useRef, useState } from 'react';

interface FadingVideoProps {
  src: string | string[];
  className?: string;
  style?: React.CSSProperties;
}

export function FadingVideo({ src, className = '', style = {} }: FadingVideoProps) {
  const sources = Array.isArray(src) ? src : [src];
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isFadingOutRef = useRef(false);

  const activeSrc = sources[currentIndex] || sources[0];

  const fadeIn = (duration = 500) => {
    const video = videoRef.current;
    if (!video) return;
    isFadingOutRef.current = false;
    const startTime = performance.now();
    const startOpacity = parseFloat(video.style.opacity || '0');

    const step = (now: number) => {
      if (!videoRef.current || isFadingOutRef.current) return;
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentOpacity = startOpacity + (1 - startOpacity) * progress;
      videoRef.current.style.opacity = currentOpacity.toString();

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  const fadeOut = (duration = 550) => {
    const video = videoRef.current;
    if (!video || isFadingOutRef.current) return;
    isFadingOutRef.current = true;
    const startTime = performance.now();
    const startOpacity = parseFloat(video.style.opacity || '1');

    const step = (now: number) => {
      if (!videoRef.current || !isFadingOutRef.current) return;
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentOpacity = startOpacity * (1 - progress);
      videoRef.current.style.opacity = Math.max(0, currentOpacity).toString();

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  const handleLoadedData = () => {
    const video = videoRef.current;
    if (!video) return;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => fadeIn(500))
        .catch(() => fadeIn(500));
    } else {
      fadeIn(500);
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const remainingTime = video.duration - video.currentTime;
    if (remainingTime <= 0.55 && !isFadingOutRef.current) {
      fadeOut(550);
    }
  };

  const handleEnded = () => {
    const video = videoRef.current;
    if (!video) return;

    if (Array.isArray(src) && src.length > 1) {
      isFadingOutRef.current = false;
      video.style.opacity = '0';
      setCurrentIndex((prev) => (prev + 1) % src.length);
    } else {
      isFadingOutRef.current = false;
      video.currentTime = 0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => fadeIn(500))
          .catch(() => fadeIn(500));
      } else {
        fadeIn(500);
      }
    }
  };

  // When source changes, reset opacity to 0
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.style.opacity = '0';
      isFadingOutRef.current = false;
      videoRef.current.load();
    }
  }, [activeSrc]);

  return (
    <video
      ref={videoRef}
      src={activeSrc}
      className={`pointer-events-none transition-none ${className}`}
      style={{
        opacity: 0,
        ...style,
      }}
      autoPlay
      muted
      playsInline
      preload="auto"
      onLoadedData={handleLoadedData}
      onTimeUpdate={handleTimeUpdate}
      onEnded={handleEnded}
    />
  );
}
