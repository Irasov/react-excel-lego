import { useEffect, useRef } from 'react';

type FrameSize = 'large' | 'medium' | 'small';

type OptimizationSettings = [FrameSize, string] | null;

const getOptimizationSettings = (
  largeFormat?: string,
  mediumFormat?: string,
  smallFormat?: string,
): OptimizationSettings => {
  if (window.innerWidth >= 1068) {
    if (largeFormat) return ['large', largeFormat];
    if (mediumFormat) return ['medium', mediumFormat];
    if (smallFormat) return ['small', smallFormat];
    return null;
  }
  if (window.innerWidth >= 734 && window.innerWidth < 1068) {
    if (mediumFormat) return ['medium', mediumFormat];
    if (largeFormat) return ['large', largeFormat];
    if (smallFormat) return ['small', smallFormat];
    return null;
  }
  if (smallFormat) return ['small', smallFormat];
  if (mediumFormat) return ['medium', mediumFormat];
  if (largeFormat) return ['large', largeFormat];
  return null;
};

interface ImageSequenceLoopProps {
  /** Базовый путь к папкам с кадрами, например './assets/images/logo/' */
  basePath: string;
  /** Формат/расширение файлов для десктопа (>= 1068px) */
  largeFormat?: string;
  /** Формат/расширение файлов для планшетов (734px - 1067px) */
  mediumFormat?: string;
  /** Формат/расширение файлов для мобильных (< 734px) */
  smallFormat?: string;
  /** Общее количество кадров в последовательности */
  totalFrames: number;
  /** Сколько пикселей скролла нужно для смены одного кадра */
  pxPerFrame?: number;
  /** Зацикливать анимацию (true) или останавливать на последнем кадре (false) */
  loop?: boolean;
  /** CSS-класс для canvas */
  className?: string;
}

export default function ImageSequenceLoop({
  basePath,
  largeFormat,
  mediumFormat,
  smallFormat,
  totalFrames,
  pxPerFrame = 20,
  loop = false,
  className,
}: ImageSequenceLoopProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  const context = canvas.getContext('2d');
  if (!context) return;

  const frameCount = totalFrames;

  const settings = getOptimizationSettings(largeFormat, mediumFormat, smallFormat);
  if (!settings) return;
  const [size, format] = settings;
  const currentFrame = (index: number) => `${basePath}${size}/${index + 1}.${format}`;

  const images: HTMLImageElement[] = [];
  const animation = { frame: 0 };
  const loadPromises: Promise<void>[] = [];

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    images.push(img);

    const promise = new Promise<void>((resolve) => {
      if (img.complete) {
        resolve();
      } else {
        img.addEventListener('load', () => resolve(), { once: true });
        img.addEventListener('error', () => resolve(), { once: true });
      }
    });
    loadPromises.push(promise);
  }

  function render() {
    const c = canvasRef.current;
    if (!c || !context) return;

    c.width = c.getBoundingClientRect().width;
    c.height = c.getBoundingClientRect().height;
    context.clearRect(0, 0, c.width, c.height);

    const img = images[animation.frame];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const imgAspectRatio = img.width / img.height;
    const canvasAspectRatio = c.width / c.height;
    let drawWidth: number;
    let drawHeight: number;

    if (canvasAspectRatio > imgAspectRatio) {
      drawWidth = c.width;
      drawHeight = drawWidth / imgAspectRatio;
    } else {
      drawHeight = c.height;
      drawWidth = drawHeight * imgAspectRatio;
    }

    const offsetX = (c.width - drawWidth) / 2;
    const offsetY = (c.height - drawHeight) / 2;
    context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }

  function calcFrameFromScroll(): number {
    const scrollY = window.scrollY;
    let frame = Math.floor(scrollY / pxPerFrame);

    if (loop) {
      frame = frame % frameCount;
      if (frame < 0) frame += frameCount;
    } else {
      frame = Math.max(0, Math.min(frame, frameCount - 1));
    }
    return frame;
  }

  let ticking = false;

  function updateFrameFromScroll() {
    const frame = calcFrameFromScroll();
    if (frame !== animation.frame) {
      animation.frame = frame;
      render();
    }
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(updateFrameFromScroll);
      ticking = true;
    }
  }

  function onResize() {
    render();
  }

  window.addEventListener('scroll', onScroll);
  window.addEventListener('resize', onResize);

  // Первичная отрисовка нулевого кадра как можно раньше (чтобы не было пустоты, пока грузится остальное)
  images[0].addEventListener('load', () => render(), { once: true });
  if (images[0].complete) render();

  // Как только ВСЕ кадры загрузились — досчитываем актуальный кадр под текущий скролл
  Promise.all(loadPromises).then(() => {
    animation.frame = calcFrameFromScroll();
    render();
  });

  return () => {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onResize);
  };
}, [basePath, largeFormat, mediumFormat, smallFormat, totalFrames, pxPerFrame, loop]);

  return <canvas ref={canvasRef} className={className}></canvas>;
}
