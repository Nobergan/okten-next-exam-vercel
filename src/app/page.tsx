import { Suspense } from 'react';
import { Loader } from '@app/components/shared/Loader';
import { Media } from '@app/constants/media.constant';
import { MediaSource } from '@app/constants/media-source.constant';
import { HOME_WIDGET_SECTIONS } from '../components/films-widget/constants';
import { createGenreNames } from '@app/utils/genres';
import { FilmsWidgetComponent } from '@app/components/films-widget/FilmsWidgetComponent';
import { HeroSliderComponent } from '@app/components/shared/hero-slider/HeroSliderComponent';

const Home = async () => {
  const { getGenreNames } = await createGenreNames();

  return (
    <>
      <Suspense fallback={<Loader />}>
        <HeroSliderComponent
          source={MediaSource.Trend}
          mediaType={Media.All}
          getGenreNames={getGenreNames}
        />
      </Suspense>
      <div className='container'>
        <div className='mt-13 h-[2px] w-full bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,#f80032_50%,rgba(0,0,0,0)_100%)]' />

        {HOME_WIDGET_SECTIONS.map(({ key, title, source, mediaType }) => (
          <Suspense key={key} fallback={<Loader />}>
            <FilmsWidgetComponent
              title={title}
              source={source}
              mediaType={mediaType}
              getGenreNames={getGenreNames}
            />
          </Suspense>
        ))}

        <div className='mt-13 h-[2px] w-full bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,#f80032_50%,rgba(0,0,0,0)_100%)]' />
      </div>
    </>
  );
};

export default Home;
