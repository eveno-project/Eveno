/* eslint-disable @next/next/no-img-element */
'use client';
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

import Image from "@interfaces/image";

import styles from './carousel.module.css';
import { useCallback, useState } from 'react';
import { useDotButton } from '@services/carousel';
import { Box, Radio } from '@mui/material';

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
        <Box component="article" className={styles.slider}>
            <Box component="section" className={styles.slider__viewport} ref={emblaRef}>
                <Box className={styles.slider__container}>
                    {
                        images.map((image, key) => (
                            <Box key={key} className={styles.slider__container__image}>
                                <img className={styles.slider__image} key={key} src={image.src} alt={image.alt} />
                            </Box>
                        ))
                    }
                </Box>
            </Box>
            {
                images.length > 0 && (
                    <Box component="section" className={styles.slider__dots__container}>
                        <Box className={styles.slider__dots}>
                            {scrollSnaps.map((_: any, index: number) => (
                                <Radio
                                    key={index}
                                    onClick={() => onDotButtonClick(index)}
                                    checked={index === selectedIndex}
                                />
                            ))}
                        </Box>
                    </Box>
                )
            }
        </Box>
    );
}
