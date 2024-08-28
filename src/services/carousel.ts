import { UseDotButtonType } from "@type/dot-button"
import { useCallback, useEffect, useState } from "react"
import { EmblaCarouselType } from 'embla-carousel';

export const useDotButton = (
    emblaApi: EmblaCarouselType | undefined,
    onButtonClick?: (emblaApi: EmblaCarouselType) => void
  ): UseDotButtonType => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

    const onDotButtonClick = useCallback(
      (index: number) => {
        if (!emblaApi) return;
        emblaApi.scrollTo(index)
        if (onButtonClick) onButtonClick(emblaApi)
      },
      [emblaApi, onButtonClick]
    )

    const onInit = useCallback((emblaApi: EmblaCarouselType) => {
      setScrollSnaps(emblaApi.scrollSnapList())
    }, [])

    const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }, [])

    useEffect(() => {
      if (!emblaApi) return

      onInit(emblaApi)
      onSelect(emblaApi)
      emblaApi.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect)
    }, [emblaApi, onInit, onSelect])

    return {
      selectedIndex,
      scrollSnaps,
      onDotButtonClick
    }
  }
