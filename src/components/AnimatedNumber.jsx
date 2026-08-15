import { useEffect, useRef, useState } from 'react';

const numberFormatter = new Intl.NumberFormat();
const easeOutCubic = (progress) => 1 - ((1 - progress) ** 3);
const initialDisplayValue = (value) => {
  if (!Number.isFinite(value)) return null;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? value : 0;
};

export default function AnimatedNumber({ value }) {
  const [displayValue, setDisplayValue] = useState(() => initialDisplayValue(value));
  const displayedValue = useRef(initialDisplayValue(value));

  useEffect(() => {
    if (!Number.isFinite(value)) {
      displayedValue.current = null;
      setDisplayValue(null);
      return undefined;
    }

    const startValue = Number.isFinite(displayedValue.current) ? displayedValue.current : 0;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || startValue === value) {
      displayedValue.current = value;
      setDisplayValue(value);
      return undefined;
    }

    const duration = 900;
    let animationFrame;
    let startTime;
    const update = (time) => {
      startTime ??= time;
      const progress = Math.min((time - startTime) / duration, 1);
      const nextValue = Math.round(startValue + ((value - startValue) * easeOutCubic(progress)));
      displayedValue.current = nextValue;
      setDisplayValue(nextValue);
      if (progress < 1) animationFrame = requestAnimationFrame(update);
    };

    animationFrame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrame);
  }, [value]);

  return displayValue === null ? '\u2014' : numberFormatter.format(displayValue);
}
