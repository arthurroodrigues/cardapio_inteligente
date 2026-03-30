import {
  Suspense,
  lazy,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type JSX,
} from 'react'
import './App.css'

type NavIconKey = 'burger' | 'fries' | 'drink' | 'icecream'

type NavLink = {
  label: string
  icon: NavIconKey
  href: string
}

type BurgerCard = {
  id: string
  name: string
  price: string
  note: string
  image: string
  accent: string
  imageRotate: string
  imageScale: string
  imageShift: string
  popular?: boolean
}

type SideCard = {
  id: string
  name: string
  price: string
  note: string
  image: string
  accent: string
}

type CarouselSideCard = SideCard & {
  carouselId: string
  sourceId: string
}

type SmartSuggestion = {
  combo: string
  note: string
  image: string
}

type BeverageSize = 'Pequeno' | 'Médio' | 'Grande'

type BeverageCard = {
  id: string
  name: string
  note: string
  prices: Record<BeverageSize, string>
  image: string
  accent: string
  sizes: BeverageSize[]
  highlightedSize: BeverageSize
}

const Burger3D = lazy(async () => {
  const module = await import('@/components/ui/burger-3d')
  return { default: module.Burger3D }
})

const navLinks: NavLink[] = [
  { label: 'Hambúrgueres', icon: 'burger', href: '#hamburgueres' },
  { label: 'Acompanhamentos', icon: 'fries', href: '#acompanhamentos' },
  { label: 'Bebidas', icon: 'drink', href: '#bebidas' },
  { label: 'Sobremesas', icon: 'icecream', href: '#' },
]

const navIcons: Record<NavIconKey, JSX.Element> = {
  burger: (
    <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true">
      <path d="M4 10a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6" />
      <path d="M3 12h18" />
      <path d="M5 16h14" />
      <path d="M4 18h16" />
    </svg>
  ),
  fries: (
    <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true">
      <path d="M8 9V4" />
      <path d="M12 9V3" />
      <path d="M16 9V4" />
      <path d="M10 9V5" />
      <rect x="6" y="9" width="12" height="10" rx="2" />
    </svg>
  ),
  drink: (
    <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true">
      <path d="M7 4h10l-1 15a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2L7 4Z" />
      <path d="M9 4l-1-3h8l-1 3" />
    </svg>
  ),
  icecream: (
    <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true">
      <path d="M8 10a4 4 0 1 1 8 0" />
      <path d="M7 12h10" />
      <path d="M9 12l3 9 3-9" />
    </svg>
  ),
}

const burgerCards: BurgerCard[] = [
  {
    id: 'big-mac',
    name: 'Big Mac',
    price: 'R$ 29,90',
    note: 'O clássico de camadas lendárias que nunca sai de cena.',
    image: '/assets/bigmac.png',
    accent: 'rgba(148, 163, 184, 0.14)',
    imageRotate: '-5deg',
    imageScale: '1.06',
    imageShift: '-12px',
    popular: true,
  },
  {
    id: 'quarterao',
    name: 'Quarteirão',
    price: 'R$ 31,90',
    note: 'Carne marcante, queijo derretido e presença de sobra.',
    image: '/assets/quarteirao.png',
    accent: 'rgba(203, 213, 225, 0.16)',
    imageRotate: '4deg',
    imageScale: '1.03',
    imageShift: '-4px',
  },
  {
    id: 'cheddar-mcmelt',
    name: 'Cheddar McMelt',
    price: 'R$ 33,90',
    note: 'Cremoso, intenso e com assinatura indulgente.',
    image: '/assets/cheddar.png',
    accent: 'rgba(226, 232, 240, 0.18)',
    imageRotate: '-3deg',
    imageScale: '1.08',
    imageShift: '-8px',
  },
  {
    id: 'duplo-bacon',
    name: 'Duplo Bacon',
    price: 'R$ 34,90',
    note: 'Perfil robusto com crocância e final defumado.',
    image: '/assets/duplobacon.png',
    accent: 'rgba(148, 163, 184, 0.12)',
    imageRotate: '5deg',
    imageScale: '1.05',
    imageShift: '-2px',
  },
  {
    id: 'mcchicken',
    name: 'McChicken',
    price: 'R$ 27,90',
    note: 'Leve, crocante e equilibrado para qualquer hora.',
    image: '/assets/mcchicken.png',
    accent: 'rgba(226, 232, 240, 0.16)',
    imageRotate: '-4deg',
    imageScale: '1.02',
    imageShift: '-6px',
  },
  {
    id: 'big-tasty',
    name: 'Big Tasty',
    price: 'R$ 36,90',
    note: 'Tamanho generoso e sabor que chega primeiro no aroma.',
    image: '/assets/tasty.png',
    accent: 'rgba(203, 213, 225, 0.14)',
    imageRotate: '3deg',
    imageScale: '1.09',
    imageShift: '-10px',
  },
  {
    id: 'duplo-cheddar-mcmelt',
    name: 'Duplo Cheddar McMelt',
    price: 'R$ 37,90',
    note: 'Camada dupla e ainda mais cheddar intenso.',
    image: '/assets/duplocheddar.png',
    accent: 'rgba(226, 232, 240, 0.2)',
    imageRotate: '-2deg',
    imageScale: '1.1',
    imageShift: '-9px',
  },
  {
    id: 'mcnifico-bacon',
    name: 'McNífico Bacon',
    price: 'R$ 38,90',
    note: 'Mais corpo, bacon crocante e uma assinatura bem marcante.',
    image: '/assets/mcnifico.pngc.png',
    accent: 'rgba(148, 163, 184, 0.16)',
    imageRotate: '4deg',
    imageScale: '1.07',
    imageShift: '-7px',
  },
]

const sideCards: SideCard[] = [
  {
    id: 'fries-p',
    name: 'McFritas Pequena',
    price: 'R$ 11,90',
    note: 'Opção pra quem quer rapidez, crocância e praticidade.',
    image: '/assets/mcfritasp.png',
    accent: 'rgba(255, 199, 44, 0.2)',
  },
  {
    id: 'fries-m',
    name: 'McFritas Média',
    price: 'R$ 18,90',
    note: 'Crocante por fora, macia por dentro e dourada na medida e tamanho certos.',
    image: '/assets/mcfritasm.png',
    accent: 'rgba(95, 18, 0, 0.12)',
  },
  {
    id: 'fries-grande',
    name: 'McFritas Grande',
    price: 'R$ 12,90',
    note: 'Crocante por fora, macia por dentro e dourada na medida certa mas num tamanho maior.',
    image: '/assets/mcfritasg.png',
    accent: 'rgba(255, 199, 44, 0.26)',
  },
  {
    id: 'cheddar-melt-fries',
    name: 'McFritas Cheddar Bacon',
    price: 'R$ 16,90',
    note: 'Batatas cobertas com cheddar cremoso e bacon crocante para um toque mais indulgente.',
    image: '/assets/mcfritascheddar.png',
    accent: 'rgba(219, 0, 7, 0.14)',
  },
  {
    id: 'nuggets-4',
    name: 'Chicken McNuggets 4 Unidades',
    price: 'R$ 13,90',
    note: 'Porção perfeita para um complemento rápido e crocante.',
    image: '/assets/n4.png',
    accent: 'rgba(255, 199, 44, 0.16)',
  },
  {
    id: 'nuggets-6',
    name: 'Chicken McNuggets 6 Unidades',
    price: 'R$ 17,90',
    note: 'Mais unidades para dividir ou aproveitar sem pressa.',
    image: '/assets/n6.png',
    accent: 'rgba(219, 0, 7, 0.12)',
  },
  {
    id: 'nuggets-10',
    name: 'Chicken McNuggets 10 Unidades',
    price: 'R$ 23,90',
    note: 'Opcão generosa para quem quer mais mordidas crocantes.',
    image: '/assets/n10.png',
    accent: 'rgba(95, 18, 0, 0.1)',
  },
  {
    id: 'nuggets-15',
    name: 'Chicken McNuggets 15 Unidades',
    price: 'R$ 34,90',
    note: 'Opcão máxima para quem quer compartilhar e aproveitar ao máximo.',
    image: '/assets/n15.png',
    accent: 'rgba(255, 199, 44, 0.24)',
  },
  {
    id: 'molho-agridoce',
    name: 'Molho Agridoce',
    price: 'R$ 8,90',
    note: 'Complemento adocicado e levemente picante para realçar o sabor de batatas e nuggets.',
    image: '/assets/agridocee..png',
    accent: 'rgba(255, 199, 44, 0.18)',
  },
  {
    id: 'molho-barbecue',
    name: 'Molho Barbecue',
    price: 'R$ 8,90',
    note: 'Complemento defumado e adocicado para realçar o sabor de batatas e nuggets.',  
    image: '/assets/bbq.png',
    accent: 'rgba(219, 0, 7, 0.16)',
  },
  {
    id: 'molho-ranch',
    name: 'Molho Ranch',
    price: 'R$ 8,90',
    note: 'Complemento cremoso para elevar batatas, nuggets e anéis.',
    image: '/assets/ranch.png',
    accent: 'rgba(95, 18, 0, 0.11)',
  },
  {
    id: 'cheddar-dip',
    name: 'Piscininha Cheddar',
    price: 'R$ 8,90',
    note: 'Complemento cremoso de cheddar para elevar batatas e nuggets.',
    image: '/assets/cheddardip.png',
    accent: 'rgba(255, 199, 44, 0.15)',
  },
  {
    id: 'chicken-salad',
    name: 'Salada Crispy Chicken',
    price: 'R$ 14,90',
    note: 'Pedaços de frango crocante sobre cama de folhas frescas, cenoura ralada e tomate cereja, acompanhada de molho especial para um toque extra de sabor.',
    image: '/assets/saladachicken.png',
    accent: 'rgba(255, 199, 44, 0.18)',
  },
  {
    id: 'salada-beef',
    name: 'Salada Crispy Beef',
    price: 'R$ 24,90',
    note: 'Pedaços de carne crocante sobre cama de folhas frescas, cenoura ralada e tomate cereja, acompanhada de molho especial para um toque extra de sabor.',
    image: '/assets/saladabeef.png',
    accent: 'rgba(219, 0, 7, 0.14)',
  },
]

const orderedSideCards = sideCards

const carouselSideCards: CarouselSideCard[] = Array.from(
  { length: 3 },
  (_, copyIndex) =>
    orderedSideCards.map((card, cardIndex) => ({
      ...card,
      sourceId: card.id,
      carouselId: `${copyIndex}-${cardIndex}-${card.id}`,
    })),
).flat()

const smartSuggestions: SmartSuggestion[] = [
  {
    combo: 'Big Mac + Batata + Refrigerante',
    note: 'O combo clássico com equilíbrio entre crocância, intensidade e refrescância.',
    image: '/assets/bigmac.png',
  },
  {
    combo: 'McChicken + Nuggets + Bebida',
    note: 'Uma combinação leve e indulgente para quem quer variar sem perder sabor.',
    image: '/assets/bigmac.png',
  },
]

const beverageCards: BeverageCard[] = [
  {
    id: 'coca-cola',
    name: 'Coca-Cola',
    note: 'Gelada, sabor clássico e refrescância imediata para acompanhar qualquer pedido.',
    prices: {
      Pequeno: 'R$ 7,90',
      Médio: 'R$ 9,90',
      Grande: 'R$ 11,90',
    },
    image: '/assets/coca.png',
    accent: 'rgba(219, 0, 7, 0.18)',
    sizes: ['Pequeno', 'Médio', 'Grande'],
    highlightedSize: 'Médio',
  },
  {
    id: 'coca-cola-zero',
    name: 'Coca-Cola Zero',
    note: 'Leve no paladar e intensa no frescor, com o mesmo ritual gelado do clássico.',
    prices: {
      Pequeno: 'R$ 7,90',
      Médio: 'R$ 9,90',
      Grande: 'R$ 11,90',
    },
    image: '/assets/coca.png',
    accent: 'rgba(255, 255, 255, 0.18)',
    sizes: ['Pequeno', 'Médio', 'Grande'],
    highlightedSize: 'Médio',
  },
  {
    id: 'fanta-laranja',
    name: 'Fanta Laranja',
    note: 'Cítrica, vibrante e cheia de energia para trazer contraste ao pedido.',
    prices: {
      Pequeno: 'R$ 7,50',
      Médio: 'R$ 9,50',
      Grande: 'R$ 11,50',
    },
    image: '/assets/fanta.png',
    accent: 'rgba(255, 199, 44, 0.2)',
    sizes: ['Pequeno', 'Médio', 'Grande'],
    highlightedSize: 'Médio',
  },
  {
    id: 'sprite',
    name: 'Sprite',
    note: 'Perfil crisp, borbulhas leves e uma sensação super refrescante do primeiro gole.',
    prices: {
      Pequeno: 'R$ 7,50',
      Médio: 'R$ 9,50',
      Grande: 'R$ 11,50',
    },
    image: '/assets/sprite.png',
    accent: 'rgba(208, 255, 228, 0.22)',
    sizes: ['Pequeno', 'Médio', 'Grande'],
    highlightedSize: 'Médio',
  },
  {
    id: 'suco-laranja',
    name: 'Suco de Laranja',
    note: 'Mais natural, aromático e equilibrado para quem quer frescor com toque frutado.',
    prices: {
      Pequeno: 'R$ 8,90',
      Médio: 'R$ 11,90',
      Grande: 'R$ 14,90',
    },
    image: '/assets/laranja.png',
    accent: 'rgba(255, 184, 77, 0.2)',
    sizes: ['Pequeno', 'Médio', 'Grande'],
    highlightedSize: 'Médio',
  },
  {
    id: 'guarana',
    name: 'Guaraná',
    note: 'Doce na medida, super gelado e com um perfil clássico para combos mais intensos.',
    prices: {
      Pequeno: 'R$ 7,90',
      Médio: 'R$ 9,90',
      Grande: 'R$ 11,90',
    },
    image: '/assets/guarana.png',
    accent: 'rgba(87, 171, 74, 0.22)',
    sizes: ['Pequeno', 'Médio', 'Grande'],
    highlightedSize: 'Médio',
  },
  {
    id: 'sprite-zero',
    name: 'Sprite Zero',
    note: 'Refrescância suave com perfil leve e um toque aromático para equilibrar o pedido.',
    prices: {
      Pequeno: 'R$ 8,50',
      Médio: 'R$ 10,50',
      Grande: 'R$ 12,50',
    },
    image: '/assets/sprite.png',
    accent: 'rgba(251, 191, 36, 0.22)',
    sizes: ['Pequeno', 'Médio', 'Grande'],
    highlightedSize: 'Médio',
  },
  {
    id: 'del-valle-uva',
    name: 'Del Valle Uva',
    note: 'Mais encorpado, frutado e com uma pegada doce que funciona muito bem gelado.',
    prices: {
      Pequeno: 'R$ 8,90',
      Médio: 'R$ 11,90',
      Grande: 'R$ 14,90',
    },
    image: '/assets/uva.png',
    accent: 'rgba(147, 51, 234, 0.22)',
    sizes: ['Pequeno', 'Médio', 'Grande'],
    highlightedSize: 'Médio',
  },
  {
    id: 'agua-mineral',
    name: 'Água Mineral',
    note: 'Leve, limpa e essencial para quem quer uma escolha mais neutra e refrescante.',
    prices: {
      Pequeno: 'R$ 5,50',
      Médio: 'R$ 7,50',
      Grande: 'R$ 9,50',
    },
    image: '/assets/agua.png',
    accent: 'rgba(125, 211, 252, 0.22)',
    sizes: ['Pequeno', 'Médio', 'Grande'],
    highlightedSize: 'Médio',
  },
]

const beverageSizeLabels: Record<BeverageSize, string> = {
  Pequeno: '300 ml',
  Médio: '500 ml',
  Grande: '700 ml',
}

const initialBeverageSizes = beverageCards.reduce<Record<string, BeverageSize>>(
  (selectedSizes, drink) => {
    selectedSizes[drink.id] = drink.highlightedSize
    return selectedSizes
  },
  {},
)

function App() {
  const [cartCount, setCartCount] = useState(5)
  const [addedItemId, setAddedItemId] = useState<string | null>(null)
  const [elevatedSideCardId, setElevatedSideCardId] = useState<string | null>(null)
  const [selectedBeverageSizes, setSelectedBeverageSizes] =
    useState<Record<string, BeverageSize>>(initialBeverageSizes)
  const feedbackTimeoutRef = useRef<number | null>(null)
  const sidesCarouselRef = useRef<HTMLDivElement | null>(null)
  const isSidesCarouselPausedRef = useRef(false)
  const sidesCarouselMetricsRef = useRef({ step: 0, gap: 14, cycleWidth: 0 })

  const getSidesCarouselMetrics = () => {
    const track = sidesCarouselRef.current

    if (!track) {
      return null
    }

    const firstCard = track.querySelector<HTMLElement>('.side-card')

    if (!firstCard) {
      return null
    }

    const styles = window.getComputedStyle(track)
    const gap = Number.parseFloat(styles.columnGap || styles.gap || '14') || 14
    const step = firstCard.offsetWidth + gap
    const cycleWidth = step * orderedSideCards.length

    sidesCarouselMetricsRef.current = { step, gap, cycleWidth }

    return {
      track,
      step,
      gap,
      cycleWidth,
    }
  }

  const syncSidesCarousel = () => {
    const metrics = getSidesCarouselMetrics()

    if (!metrics) {
      return null
    }

    if (metrics.track.scrollLeft <= metrics.step * 0.5) {
      metrics.track.scrollLeft += metrics.cycleWidth
    } else if (
      metrics.track.scrollLeft >= metrics.cycleWidth * 2 - metrics.step * 0.5
    ) {
      metrics.track.scrollLeft -= metrics.cycleWidth
    }

    const visibleCards = Math.max(
      1,
      Math.round((metrics.track.clientWidth + metrics.gap) / metrics.step),
    )
    const centeredIndex =
      Math.round(metrics.track.scrollLeft / metrics.step) +
      Math.floor(visibleCards / 2)
    const nextElevatedId = carouselSideCards[centeredIndex]?.carouselId ?? null

    setElevatedSideCardId((currentId) =>
      currentId === nextElevatedId ? currentId : nextElevatedId,
    )

    return metrics
  }

  useEffect(() => {
    return () => {
      if (feedbackTimeoutRef.current !== null) {
        window.clearTimeout(feedbackTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const track = sidesCarouselRef.current

    if (!track) {
      return
    }

    let frameId = 0

    const requestSync = () => {
      if (frameId !== 0) {
        return
      }

      frameId = window.requestAnimationFrame(() => {
        frameId = 0
        syncSidesCarousel()
      })
    }

    const resizeObserver = new ResizeObserver(() => {
      requestSync()
    })

    resizeObserver.observe(track)

    const initialFrameId = window.requestAnimationFrame(() => {
      const metrics = syncSidesCarousel()

      if (metrics) {
        metrics.track.scrollLeft = metrics.cycleWidth
        syncSidesCarousel()
      }
    })

    track.addEventListener('scroll', requestSync, { passive: true })

    return () => {
      track.removeEventListener('scroll', requestSync)
      resizeObserver.disconnect()
      window.cancelAnimationFrame(initialFrameId)

      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId)
      }
    }
  }, [])

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      if (isSidesCarouselPausedRef.current) {
        return
      }

      const metrics = syncSidesCarousel()

      if (!metrics) {
        return
      }

      metrics.track.scrollBy({
        left: metrics.step,
        behavior: 'smooth',
      })
    }, 3000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [])

  const handleSidesCarousel = (direction: -1 | 1) => {
    const metrics = getSidesCarouselMetrics()

    if (!metrics) {
      return
    }

    metrics.track.scrollBy({
      left: metrics.step * direction,
      behavior: 'smooth',
    })
  }

  const handleAddToOrder = (itemId: string) => {
    setCartCount((currentCount) => currentCount + 1)
    setAddedItemId(itemId)

    if (feedbackTimeoutRef.current !== null) {
      window.clearTimeout(feedbackTimeoutRef.current)
    }

    feedbackTimeoutRef.current = window.setTimeout(() => {
      setAddedItemId((currentId) => (currentId === itemId ? null : currentId))
      feedbackTimeoutRef.current = null
    }, 1400)
  }

  const handleBeverageSizeSelect = (drinkId: string, size: BeverageSize) => {
    setSelectedBeverageSizes((currentSizes) => {
      if (currentSizes[drinkId] === size) {
        return currentSizes
      }

      return {
        ...currentSizes,
        [drinkId]: size,
      }
    })
  }

  return (
    <div className="landing">
      <header className="navbar">
        <div className="brand">
          <img className="brand-logo" src="/assets/logo.png" alt="McDonald's" />
        </div>
        <nav className="nav-links" aria-label="Primary">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href}>
              <span className="nav-icon" aria-hidden="true">
                {navIcons[link.icon]}
              </span>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <button className="cart" type="button" aria-label="Carrinho">
            <span className="cart-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true">
                <path d="M3 5h2l2.2 9.2a1 1 0 0 0 1 .8h7.9a1 1 0 0 0 1-.8L19 8H7.2" />
                <circle cx="10" cy="19" r="1.5" />
                <circle cx="17" cy="19" r="1.5" />
              </svg>
            </span>
            <span className="cart-badge">{cartCount}</span>
          </button>
          <button className="cta" type="button">
            Finalizar pedido
          </button>
        </div>
      </header>

      <main className="page-shell">
        <section className="hero">
          <div className="hero-stage">
            <div className="hero-decor" aria-hidden="true">
              <span className="hero-word hero-word-left">BIG</span>
              <span className="hero-word hero-word-right">MAC</span>
            </div>

            <div className="hero-content">
              <h1>
                Big Mac,
                <br />
                ícone instantâneo.
              </h1>
              <p>
                Camadas lendárias, presença premium e um clássico reconhecido na
                primeira olhada.
              </p>
              <div className="hero-actions">
                <a className="hero-primary" href="#hamburgueres">
                  Explorar cardápio
                </a>
              </div>
            </div>

            <Suspense
              fallback={
                <div className="projection-root hero-projection hero-projection-fallback" aria-hidden="true">
                  <img src="/assets/bigmac.png" alt="" />
                </div>
              }
            >
              <Burger3D className="hero-projection" />
            </Suspense>
          </div>
        </section>

        <section
          className="burgers-section"
          id="hamburgueres"
          aria-labelledby="hamburgueres-heading"
        >
          <div className="burgers-ambient" aria-hidden="true">
            <span className="burgers-ambient-ring burgers-ambient-ring-left" />
            <span className="burgers-ambient-ring burgers-ambient-ring-right" />
          </div>

          <div className="burgers-shell">
            <div className="burgers-heading">
              <p className="burgers-kicker">Seleção clássica</p>
              <h2 id="hamburgueres-heading">Hambúrgueres</h2>
              <p className="burgers-subtitle">
                Clássicos que definem o sabor
              </p>
            </div>

            <div className="burgers-grid">
              {burgerCards.map((burger, index) => {
                const isAdded = addedItemId === burger.id
                const cardStyle = {
                  '--card-accent': burger.accent,
                  '--image-rotate': burger.imageRotate,
                  '--image-scale': burger.imageScale,
                  '--image-shift': burger.imageShift,
                  '--card-delay': `${0.16 * index}s`,
                } as CSSProperties

                return (
                  <article
                    key={burger.id}
                    className={`burger-card${burger.popular ? ' burger-card-popular' : ''}${isAdded ? ' is-added' : ''}`}
                    style={cardStyle}
                  >
                    {burger.popular ? (
                      <span className="burger-card-trace" aria-hidden="true" />
                    ) : null}

                    {burger.popular ? (
                      <span className="burger-card-badge">Mais popular</span>
                    ) : null}

                    <div className="burger-card-media">
                      <div className="burger-card-halo" aria-hidden="true" />
                      <img
                        className="burger-card-image"
                        src={burger.image}
                        alt={burger.name}
                        loading="lazy"
                      />
                    </div>

                    <div className="burger-card-body">
                      <div className="burger-card-copy">
                        <h3>{burger.name}</h3>
                        <p>{burger.note}</p>
                      </div>

                      <div className="burger-card-footer">
                        <strong>{burger.price}</strong>
                        <button
                          className="burger-card-button"
                          type="button"
                          onClick={() => handleAddToOrder(burger.id)}
                        >
                          {isAdded ? 'Adicionado' : 'Adicionar ao pedido'}
                        </button>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section
          className="sides-section"
          id="acompanhamentos"
          aria-labelledby="acompanhamentos-heading"
        >
          <div className="sides-shell">
            <div className="sides-top">
              <div className="sides-panel sides-panel-full">
                <div className="sides-heading">
                  <p className="sides-kicker">Complete sua experiência</p>
                  <h2 id="acompanhamentos-heading">Acompanhamentos</h2>
                  <p className="sides-description">
                    Escolhas pensadas para elevar cada pedido com mais crocância,
                    cremosidade e contraste na medida certa.
                  </p>
                </div>

                <div
                  className="sides-carousel"
                  onMouseEnter={() => {
                    isSidesCarouselPausedRef.current = true
                  }}
                  onMouseLeave={() => {
                    isSidesCarouselPausedRef.current = false
                  }}
                >
                  <button
                    className="sides-arrow"
                    type="button"
                    aria-label="Mostrar acompanhamentos anteriores"
                    onClick={() => handleSidesCarousel(-1)}
                  >
                    &lt;
                  </button>

                  <div className="sides-grid" ref={sidesCarouselRef}>
                    {carouselSideCards.map((side, index) => {
                      const isAdded = addedItemId === side.sourceId
                      const cardStyle = {
                        '--side-accent': side.accent,
                        '--card-delay': `${0.12 * index}s`,
                      } as CSSProperties

                      const isElevated = elevatedSideCardId === side.carouselId

                      return (
                        <article
                          key={side.carouselId}
                          data-side-card-id={side.carouselId}
                          className={`side-card${isAdded ? ' is-added' : ''}${isElevated ? ' is-elevated' : ''}`}
                          style={cardStyle}
                        >
                          <div className="side-card-media">
                            <div className="side-card-glow" aria-hidden="true" />
                            <img
                              className="side-card-image"
                              src={side.image}
                              alt={side.name}
                              loading="lazy"
                            />
                          </div>

                          <div className="side-card-body">
                            <div className="side-card-copy">
                              <h3>{side.name}</h3>
                              <p>{side.note}</p>
                            </div>

                            <div className="side-card-footer">
                              <strong>{side.price}</strong>
                              <button
                                className="side-card-button"
                                type="button"
                                onClick={() => handleAddToOrder(side.sourceId)}
                              >
                                {isAdded ? 'Adicionado' : 'Adicionar'}
                              </button>
                            </div>
                          </div>
                        </article>
                      )
                    })}
                  </div>

                  <button
                    className="sides-arrow"
                    type="button"
                    aria-label="Mostrar próximos acompanhamentos"
                    onClick={() => handleSidesCarousel(1)}
                  >
                    &gt;
                  </button>
                </div>
              </div>
            </div>

            <div className="smart-suggestions">
              <div className="smart-suggestions-heading">
                <span className="smart-suggestions-label">
                  Sugestões inteligentes
                </span>
                <p>Combinações prontas para um pedido mais gostoso.</p>
              </div>

              <div className="smart-suggestions-grid">
                {smartSuggestions.map((suggestion) => (
                  <article
                    key={suggestion.combo}
                    className="smart-suggestion-card"
                  >
                    <div className="smart-suggestion-media">
                      <img
                        className="smart-suggestion-image"
                        src={suggestion.image}
                        alt={suggestion.combo}
                        loading="lazy"
                      />
                    </div>
                    <div className="smart-suggestion-copy">
                      <strong>{suggestion.combo}</strong>
                      <span>{suggestion.note}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="drinks-section" id="bebidas" aria-labelledby="bebidas-heading">
          <div className="drinks-shell">
            <div className="drinks-content">
              <div className="drinks-heading">
                <p className="drinks-kicker">Escolha gelada</p>
                <h2 id="bebidas-heading">Bebidas</h2>
                <p className="drinks-description">
                  Refresque seu pedido com a escolha perfeita. Cada opção foi pensada
                  para entrar com equilíbrio, frescor e uma presença gelada que valoriza o combo.
                </p>
              </div>

              <div className="drinks-grid">
                {beverageCards.map((drink, index) => {
                  const isAdded = addedItemId === drink.id
                  const selectedSize =
                    selectedBeverageSizes[drink.id] ?? drink.highlightedSize
                  const selectedPrice = drink.prices[selectedSize]
                  const cardStyle = {
                    '--drink-accent': drink.accent,
                    '--card-delay': `${0.08 * index}s`,
                  } as CSSProperties

                  return (
                    <article
                      key={drink.id}
                      className={`drink-card${isAdded ? ' is-added' : ''}`}
                      style={cardStyle}
                    >
                      <div className="drink-card-top">
                        <div className="drink-card-media">
                          <div className="drink-card-glow" aria-hidden="true" />
                          <img
                            className="drink-card-image"
                            src={drink.image}
                            alt=""
                            loading="lazy"
                            aria-hidden="true"
                          />
                        </div>

                        <div className="drink-card-copy">
                          <h3>{drink.name}</h3>
                          <p>{drink.note}</p>
                        </div>
                      </div>

                      <div className="drink-card-footer">
                        <div className="drink-card-meta">
                          <strong>{selectedPrice}</strong>
                          <div className="drink-card-sizes" aria-label={`Tamanhos de ${drink.name}`}>
                            {drink.sizes.map((size) => {
                              const isSelected = size === selectedSize

                              return (
                                <button
                                  key={`${drink.id}-${size}`}
                                  className={`drink-size-chip${isSelected ? ' is-active' : ''}`}
                                  type="button"
                                  aria-pressed={isSelected}
                                  onClick={() => handleBeverageSizeSelect(drink.id, size)}
                                >
                                  <span>{size}</span>
                                  <small>{beverageSizeLabels[size]}</small>
                                </button>
                              )
                            })}
                          </div>
                        </div>

                        <button
                          className="drink-card-button"
                          type="button"
                          onClick={() => handleAddToOrder(drink.id)}
                        >
                          {isAdded ? 'Adicionado' : 'Adicionar'}
                        </button>
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App

