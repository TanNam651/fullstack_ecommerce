import React from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Thumbs, Pagination, Autoplay, EffectFade} from "swiper/modules";
import "swiper/css"
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import 'swiper/css/thumbs';
import {cn} from "@/lib/utils";
import {Swiper as SwiperType} from "swiper";


interface CarouselProps {
  images: string[];
}

export const Carousel: React.FC<CarouselProps> = ({
                                                    images
                                                  }) => {
  const [thumbsSwiper, setThumbsSwiper] = React.useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);
  // const [mainSwiper, setMainSwiper] = React.useState<SwiperType | null>(null);

  return (
    <>
      <Swiper
        autoplay={{delay: 3000, disableOnInteraction: false}}
        grabCursor={true}
        slidesPerView={1}
        spaceBetween={0}
        navigation={true}
        pagination={{clickable: true}}
        effect="fade"
        speed={500}
        fadeEffect={{crossFade: true}}
        onSwiper={(swiper) => {
        }}
        thumbs={{swiper: thumbsSwiper}}
        loop={true}
        modules={[Pagination, Thumbs, Navigation, EffectFade,
          Autoplay
        ]}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex)
        }}
        // className="mySwiper"
      >
        {images.map((image, index) => (
            <SwiperSlide key={index} className="relative w-full ">
              <div className="relative block before:content-[''] before:block before:pb-[100%]">
                <img className="absolute top-0 left-0 h-full w-full object-contain" src={image}
                     alt={`Slide ${index + 1}`}/>
              </div>
            </SwiperSlide>
          )
        )}
      </Swiper>
      <Swiper
        loop={true}
        grabCursor={true}
        slidesPerView={4}
        watchSlidesProgress
        onSwiper={(swiper) => {
          setThumbsSwiper(swiper);
        }}
        spaceBetween={5}
        modules={[Thumbs]}
        onSliderMove={() => {
          console.log("Move")
        }}
        onSlideChange={(swiper) => {
          // console.log("New active: ", swiper);
          // const previous = swiper.previousIndex;
          // const current = swiper.realIndex;
          // console.log("Prev: ", previous)
          // console.log("Curr: ", current)
          // if (current < previous) {
          //   mainSwiper?.slideToLoop(current);
          // } else {
          //   mainSwiper?.slideToLoop(current);
          // }
        }}
      >
        {images.map((image, index) => (
            <SwiperSlide key={index}
                         className={cn("relative w-full p-2", activeIndex === index ? "border" : "border-none")}>
              <div
                className={cn("block relative before:content-[''] before:block before:pb-[100%]")}>
                <img className="absolute top-0 left-0 h-full w-full object-contain swiper-slide-thumb-active:border"
                     src={image} alt={`Slide ${index + 1}`}/>
              </div>
            </SwiperSlide>
          )
        )}
      </Swiper>
    </>

  );
}