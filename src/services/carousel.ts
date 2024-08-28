import { UseDotButtonType } from "@type/dot-button"
import { useCallback, useEffect, useState } from "react"
import { EmblaCarouselType } from 'embla-carousel';

export const useDotButton = (
  emblaApi: EmblaCarouselType | undefined, // emblaApi est une instance d'EmblaCarousel, elle peut être undefined
  onButtonClick?: (emblaApi: EmblaCarouselType) => void // Callback optionnel à appeler lors du clic sur un bouton
): UseDotButtonType => {

  // Création d'un état pour suivre l'index sélectionné et les points de repère de défilement (scroll snaps)
  const [selectedIndex, setSelectedIndex] = useState(0) // Index de l'élément actuellement sélectionné
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]) // Liste des positions où le carrousel "snap" (arrête de défiler)

  // Fonction appelée lorsqu'un bouton est cliqué
  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return; // Si emblaApi n'est pas défini, ne rien faire
      emblaApi.scrollTo(index) // Faire défiler le carrousel jusqu'à l'index donné
      if (onButtonClick) onButtonClick(emblaApi) // Si un callback est défini pour le clic, l'exécuter
    },
    [emblaApi, onButtonClick] // useCallback dépend de emblaApi et onButtonClick
  )

  // Fonction appelée lors de l'initialisation du carrousel
  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList()) // Met à jour les points de repère de défilement
  }, [])

  // Fonction appelée lorsque l'élément sélectionné dans le carrousel change
  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap()) // Met à jour l'index sélectionné
  }, [])

  // useEffect qui se déclenche lorsque emblaApi change
  useEffect(() => {
    if (!emblaApi) return // Si emblaApi n'est pas défini, ne rien faire

    onInit(emblaApi) // Appeler onInit pour initialiser les scrollSnaps
    onSelect(emblaApi) // Appeler onSelect pour définir l'index sélectionné
    // S'abonner aux événements 'reInit' et 'select' de emblaApi
    emblaApi.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect)
  }, [emblaApi, onInit, onSelect]) // useEffect dépend de emblaApi, onInit, et onSelect

  // Retourne les valeurs nécessaires pour l'utilisation des boutons de navigation (dots)
  return {
    selectedIndex, // L'index actuellement sélectionné
    scrollSnaps, // Les positions de "snap" du carrousel
    onDotButtonClick // La fonction à appeler lors du clic sur un bouton
  }
}
