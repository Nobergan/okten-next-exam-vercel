'use client';

import { type FC, ReactNode, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { SLIDER_BREAKPOINTS, SLIDER_CONFIG } from './constants';

type HeroSliderClientProps = {
  slides: ReactNode | ReactNode[];
  thumbs: ReactNode | ReactNode[];
};

export const HeroSliderClient: FC<HeroSliderClientProps> = ({
  slides,
  thumbs
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const count = Array.isArray(slides) ? slides.length : 1;
  const thumbsArray = Array.isArray(thumbs) ? thumbs : [thumbs];
  const slidesArray = Array.isArray(slides) ? slides : [slides];

  const shouldLoop = count > 1;
  const shouldLoopThumbs = count > SLIDER_CONFIG.thumbsSlider.loopThreshold;

  return (
    <div className='hero-slider-container'>
      {/* Main Slider */}
      <Swiper
        loop={shouldLoop}
        rewind={!shouldLoop}
        spaceBetween={SLIDER_CONFIG.mainSlider.spaceBetween}
        navigation
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        className='hero-swiper'
      >
        {slidesArray.map((node, idx) => (
          <SwiperSlide key={`slide-${idx}`}>{node}</SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnails */}
      <div className='absolute bottom-0 left-0 z-20 h-20 w-full bg-gradient-to-t from-black/60 via-black/20 to-transparent pb-2 sm:h-24 sm:pb-4 md:h-28'>
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={shouldLoopThumbs}
          rewind={!shouldLoopThumbs}
          freeMode
          watchSlidesProgress
          breakpoints={SLIDER_BREAKPOINTS}
          spaceBetween={SLIDER_CONFIG.thumbsSlider.spaceBetween}
          modules={[FreeMode, Navigation, Thumbs]}
          className='thumbs-swiper h-full px-3 sm:px-4'
        >
          {thumbsArray.map((node, idx) => (
            <SwiperSlide key={`thumb-${idx}`}>{node}</SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
