export const SLIDER_BREAKPOINTS = {
  0: { slidesPerView: 4, spaceBetween: 8 },
  360: { slidesPerView: 5, spaceBetween: 8 },
  480: { slidesPerView: 6, spaceBetween: 8 },
  640: { slidesPerView: 7, spaceBetween: 10 },
  768: { slidesPerView: 8, spaceBetween: 10 },
  1024: { slidesPerView: 9, spaceBetween: 12 },
  1280: { slidesPerView: 10, spaceBetween: 12 }
} as const;

export const GRADIENT_OVERLAYS = {
  mobile:
    'bg-[linear-gradient(0deg,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.6)_65%,transparent_100%)]',
  tablet:
    'sm:bg-[linear-gradient(90deg,rgba(0,0,0,0.75)_0%,rgba(0,0,0,0.65)_40%,rgba(0,0,0,0.45)_70%,rgba(0,0,0,0.3)_100%)]',
  desktop:
    'lg:bg-[linear-gradient(90deg,rgba(0,0,0,0.95)_0%,rgba(0,0,0,0.85)_35%,rgba(0,0,0,0.55)_50%,rgba(0,0,0,0.25)_70%,transparent_100%)]'
} as const;

export const SLIDER_CONFIG = {
  mainSlider: {
    spaceBetween: 8
  },
  thumbsSlider: {
    spaceBetween: 8,
    loopThreshold: 10
  }
} as const;
