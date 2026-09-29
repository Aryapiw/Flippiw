import React, { useEffect, useRef, useState } from 'react';

export type AnimationType =
  | 'pop-in'
  | 'slide-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right'
  | 'zoom'
  | 'flip'
  | 'fade';

interface AnimatedRevealProps {
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number; // milliseconds on entrance
  duration?: number; // milliseconds
  threshold?: number;
  lazy?: boolean; // triggers when scrolled into view
  once?: boolean; // if false, animates repeatedly every time scrolled in/out! Default false.
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const AnimatedReveal: React.FC<AnimatedRevealProps> = ({
  children,
  animation = 'pop-in',
  delay = 0,
  duration = 450,
  threshold = 0.08,
  lazy = true,
  once = false, // Set to false so it repeats EVERY TIME on scroll as requested!
  className = '',
  style = {},
  onClick,
}) => {
  const [isVisible, setIsVisible] = useState(!lazy);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lazy) return;

    const currentRef = ref.current;
    if (!currentRef) return;

    // Use IntersectionObserver that repeatedly toggles visibility as user scrolls in and out
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) {
              observer.unobserve(entry.target);
            }
          } else {
            if (!once) {
              // Reset when scrolled out of view so it re-animates every time
              setIsVisible(false);
            }
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -25px 0px',
      }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [lazy, threshold, once]);

  const getAnimationStyles = (): React.CSSProperties => {
    const isEntering = isVisible;
    const currentDuration = isEntering ? duration : 200;
    const currentDelay = isEntering ? delay : 0;
    const currentEasing = isEntering
      ? 'cubic-bezier(0.34, 1.56, 0.64, 1)' // springy overshoot on entry
      : 'cubic-bezier(0.4, 0, 0.2, 1)'; // clean quick transition on exit

    const baseTransition: React.CSSProperties = {
      transitionProperty: 'opacity, transform, filter',
      transitionDuration: `${currentDuration}ms`,
      transitionTimingFunction: currentEasing,
      transitionDelay: `${currentDelay}ms`,
      willChange: 'transform, opacity',
    };

    if (!isVisible) {
      switch (animation) {
        case 'pop-in':
          return {
            ...baseTransition,
            opacity: 0,
            transform: 'scale(0.8) translateY(24px)',
            pointerEvents: 'none',
          };
        case 'slide-up':
          return {
            ...baseTransition,
            opacity: 0,
            transform: 'translateY(36px)',
            pointerEvents: 'none',
          };
        case 'slide-down':
          return {
            ...baseTransition,
            opacity: 0,
            transform: 'translateY(-36px)',
            pointerEvents: 'none',
          };
        case 'slide-left':
          return {
            ...baseTransition,
            opacity: 0,
            transform: 'translateX(40px)',
            pointerEvents: 'none',
          };
        case 'slide-right':
          return {
            ...baseTransition,
            opacity: 0,
            transform: 'translateX(-40px)',
            pointerEvents: 'none',
          };
        case 'zoom':
          return {
            ...baseTransition,
            opacity: 0,
            transform: 'scale(0.72)',
            pointerEvents: 'none',
          };
        case 'flip':
          return {
            ...baseTransition,
            opacity: 0,
            transform: 'perspective(600px) rotateX(32deg) translateY(24px)',
            pointerEvents: 'none',
          };
        case 'fade':
        default:
          return {
            ...baseTransition,
            opacity: 0,
            pointerEvents: 'none',
          };
      }
    }

    return {
      ...baseTransition,
      opacity: 1,
      transform: 'none',
      filter: 'none',
      pointerEvents: 'auto',
    };
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...getAnimationStyles(),
        ...style,
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
