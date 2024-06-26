'use client';
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

import Image from "@interfaces/image";

import styles from './carousel.module.css';
import { useCallback, useState } from 'react';
import { useDotButton } from '@services/carousel';
import DotButton from './dot-button/dot-button';

export default function Carousel({ images, options }: { images: Image[], options?: EmblaOptionsType }) {
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);
    const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
        const autoplay = emblaApi?.plugins()?.autoplay
        if (!autoplay) return;

        const resetOrStop =
            autoplay.options.stopOnInteraction === false
                ? autoplay.reset
                : autoplay.stop

        resetOrStop()
    }, [])

    const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
        emblaApi,
        onNavButtonClick
    )
    return (
        <article className={styles.slider}>
            <section className={styles.slider__viewport} ref={emblaRef}>
                <div className={styles.slider__container}>
                    {
                        images.map((image, key) => (
                            <div className={styles.slider__container__image}>
                                <img className={styles.slider__image} key={key} src={image.path} alt={image.name} />
                            </div>
                        ))
                    }
                </div>
            </section>
            <section className={styles.slider__dots__container}>
                <div className={styles.slider__dots}>
                    {scrollSnaps.map((_, index) => (
                        <DotButton
                            key={index}
                            onClick={() => onDotButtonClick(index)}
                            className={ index !== selectedIndex ? `${styles.slider__dot}` : `${styles.slider__dot_selected}`}
                        />
                    ))}
                </div>
            </section>
        </article>
    );
}
