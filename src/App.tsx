import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type JSX,
} from 'react'
import { Burger3D } from '@/components/ui/burger-3d'
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

type SmartSuggestion = {
  combo: string
  note: string
  image: string
}

const navLinks: NavLink[] = [
  { label: 'Hamburguers', icon: 'burger', href: '#hamburgueres' },
  { label: 'Acompanhamentos', icon: 'fries', href: '#acompanhamentos' },
  { label: 'Bebidas', icon: 'drink', href: '#' },
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
    note: 'O classico de camadas lendarias que nunca sai de cena.',
    image: '/assets/bigmac.png',
    accent: 'rgba(148, 163, 184, 0.14)',
    imageRotate: '-5deg',
    imageScale: '1.06',
    imageShift: '-12px',
    popular: true,
  },
  {
    id: 'quarterao',
    name: 'Quarterao',
    price: 'R$ 31,90',
    note: 'Carne marcante, queijo derretido e presenca de sobra.',
    image: '/assets/bigmac.png',
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
    image: '/assets/bigmac.png',
    accent: 'rgba(226, 232, 240, 0.18)',
    imageRotate: '-3deg',
    imageScale: '1.08',
    imageShift: '-8px',
  },
  {
    id: 'duplo-bacon',
    name: 'Duplo Bacon',
    price: 'R$ 34,90',
    note: 'Perfil robusto com crocancia e final defumado.',
    image: '/assets/bigmac.png',
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
    image: '/assets/bigmac.png',
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
    image: '/assets/bigmac.png',
    accent: 'rgba(203, 213, 225, 0.14)',
    imageRotate: '3deg',
    imageScale: '1.09',
    imageShift: '-10px',
  },
  {
    id: 'duplo-cheddar-mcmelt',
    name: 'Duplo Cheddar McMelt',
    price: 'R$ 37,90',
    note: 'Camada dupla, cheddar intenso e presenca ainda mais cremosa.',
    image: '/assets/bigmac.png',
    accent: 'rgba(226, 232, 240, 0.2)',
    imageRotate: '-2deg',
    imageScale: '1.1',
    imageShift: '-9px',
  },
  {
    id: 'mcnifico-bacon',
    name: 'McNifico Bacon',
    price: 'R$ 38,90',
    note: 'Mais corpo, bacon crocante e uma assinatura bem marcante.',
    image: '/assets/bigmac.png',
    accent: 'rgba(148, 163, 184, 0.16)',
    imageRotate: '4deg',
    imageScale: '1.07',
    imageShift: '-7px',
  },
]

const sideCards: SideCard[] = [
  {
    id: 'fries-grande',
    name: 'McFritas Grande',
    price: 'R$ 12,90',
    note: 'Crocante por fora, macia por dentro e dourada na medida certa mas num tamanho maior.',
    image: '/assets/acompanhamentos-1.svg',
    accent: 'rgba(255, 199, 44, 0.26)',
  },
  {
    id: 'cheddar-melt-fries',
    name: 'McFritas Cheddar Bacon',
    price: 'R$ 16,90',
    note: 'Batatas cobertas com cheddar cremoso e bacon crocante para um toque mais indulgente.',
    image: '/assets/acompanhamentos-2.svg',
    accent: 'rgba(219, 0, 7, 0.14)',
  },
  {
    id: 'fries-m',
    name: 'McFritas Média',
    price: 'R$ 18,90',
    note: 'Crocante por fora, macia por dentro e dourada na medida e tamanho certos.',
    image: '/assets/acompanhamentos-3.svg',
    accent: 'rgba(95, 18, 0, 0.12)',
  },
  {
    id: 'chicken-salad',
    name: ' Salada Crispy Chicken',
    price: 'R$ 14,90',
    note: 'Pedaços de frango crocante sobre cama de folhas frescas, cenoura ralada e tomate cereja, acompanhada de molho especial para um toque extra de sabor.',
    image: '/assets/acompanhamentos-4.svg',
    accent: 'rgba(255, 199, 44, 0.18)',
  },
  {
    id: 'nuggets-4',
    name: 'Chicken McNuggets 4 Unidades',
    price: 'R$ 13,90',
    note: 'Porcao perfeita para um complemento rapido e crocante.',
    image: '/assets/acompanhamentos-2.svg',
    accent: 'rgba(255, 199, 44, 0.16)',
  },
  {
    id: 'nuggets-6',
    name: 'Chicken McNuggets 6 Unidades',
    price: 'R$ 17,90',
    note: 'Mais unidades para dividir ou aproveitar sem pressa.',
    image: '/assets/acompanhamentos-3.svg',
    accent: 'rgba(219, 0, 7, 0.12)',
  },
  {
    id: 'nuggets-10',
    name: 'Chicken McNuggets 10 Unidades',
    price: 'R$ 23,90',
    note: 'Opcão generosa para quem quer mais mordidas crocantes.',
    image: '/assets/acompanhamentos-4.svg',
    accent: 'rgba(95, 18, 0, 0.1)',
  },
  {
    id: 'nuggets-15',
    name: 'Chicken McNuggets 15 Unidades',
    price: 'R$ 34,90',
    note: 'Opcão maxima para quem quer compartilhar e aproveitar ao máximo.',
    image: '/assets/acompanhamentos-1.svg',
    accent: 'rgba(255, 199, 44, 0.24)',
  },
  {
    id: 'fries-p',
    name: 'McFritas Pequena',
    price: 'R$ 11,90',
    note: 'Opção pra quem quer rapidez, crocância e praticidade.',
    image: '/assets/acompanhamentos-1.svg',
    accent: 'rgba(255, 199, 44, 0.2)',
  },
  {
    id: 'molho-barbecue',
    name: 'Molho Barbecue',
    price: 'R$ 8,90',
    note: 'Complemento defumado e adocicado para realçar o sabor de batatas e nuggets.',
    image: '/assets/acompanhamentos-2.svg',
    accent: 'rgba(219, 0, 7, 0.16)',
  },
  {
    id: 'cebola-crispy',
    name: 'Cebola Crispy',
    price: 'R$ 13,90',
    note: 'Textura leve e crocante com toque dourado irresistivel.',
    image: '/assets/acompanhamentos-4.svg',
    accent: 'rgba(255, 199, 44, 0.18)',
  },
  {
    id: 'molho-ranch',
    name: 'Molho Ranch',
    price: 'R$ 8,90',
    note: 'Complemento cremoso para elevar batatas, nuggets e aneis.',
    image: '/assets/acompanhamentos-3.svg',
    accent: 'rgba(95, 18, 0, 0.11)',
  },
  {
    id: 'salada-beef',
    name: 'Salada Crispy Beef',
    price: 'R$ 24,90',
    note: 'Pedaços de carne crocante sobre cama de folhas frescas, cenoura ralada e tomate cereja, acompanhada de molho especial para um toque extra de sabor.',
    image: '/assets/acompanhamentos-2.svg',
    accent: 'rgba(219, 0, 7, 0.14)',
  },
  {
    id: 'cheddar-dip',
    name: 'Piscininha Cheddar',
    price: 'R$ 8,90',
    note: 'Complemento cremoso de cheddar para elevar batatas e nuggets.',
    image: '/assets/acompanhamentos-3.svg',
    accent: 'rgba(255, 199, 44, 0.15)',
  },
]

const smartSuggestions: SmartSuggestion[] = [
  {
    combo: 'Big Mac + Batata + Refrigerante',
    note: 'O combo classico com equilibrio entre crocancia, intensidade e refrescancia.',
    image: '/assets/bigmac.png',
  },
  {
    combo: 'McChicken + Nuggets + Bebida',
    note: 'Uma combinacao leve e indulgente para quem quer variar sem perder sabor.',
    image: '/assets/bigmac.png',
  },
]

function App() {
  const [cartCount, setCartCount] = useState(5)
  const [addedItemId, setAddedItemId] = useState<string | null>(null)
  const [elevatedSideCardIds, setElevatedSideCardIds] = useState<string[]>([])
  const feedbackTimeoutRef = useRef<number | null>(null)
  const sidesCarouselRef = useRef<HTMLDivElement | null>(null)
  const isSidesCarouselPausedRef = useRef(false)

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

    const intervalId = window.setInterval(() => {
      if (isSidesCarouselPausedRef.current) {
        return
      }

      const firstCard = track.querySelector<HTMLElement>('.side-card')
      const styles = window.getComputedStyle(track)
      const gap = Number.parseFloat(styles.columnGap || styles.gap || '14') || 14
      const step = (firstCard?.offsetWidth ?? 240) + gap
      const maxScroll = track.scrollWidth - track.clientWidth

      if (track.scrollLeft >= maxScroll - step * 0.5) {
        track.scrollTo({ left: 0, behavior: 'auto' })
        return
      }

      track.scrollBy({
        left: step,
        behavior: 'smooth',
      })
    }, 2600)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [])

  useEffect(() => {
    const track = sidesCarouselRef.current

    if (!track) {
      return
    }

    let frameId = 0

    const updateElevatedCards = () => {
      frameId = 0

      const cards = Array.from(
        track.querySelectorAll<HTMLElement>('[data-side-card-id]'),
      )

      if (cards.length === 0) {
        return
      }

      const trackRect = track.getBoundingClientRect()
      const centerX = trackRect.left + trackRect.width / 2

      const nextIds = cards
        .map((card) => ({
          id: card.dataset.sideCardId ?? '',
          distance: Math.abs(
            card.getBoundingClientRect().left + card.getBoundingClientRect().width / 2 - centerX,
          ),
        }))
        .filter((card) => card.id)
        .sort((left, right) => left.distance - right.distance)
        .slice(0, 1)
        .map((card) => card.id)

      setElevatedSideCardIds((currentIds) => {
        if (
          currentIds.length === nextIds.length &&
          currentIds.every((id, index) => id === nextIds[index])
        ) {
          return currentIds
        }

        return nextIds
      })
    }

    const requestElevatedCardsUpdate = () => {
      if (frameId !== 0) {
        return
      }

      frameId = window.requestAnimationFrame(updateElevatedCards)
    }

    requestElevatedCardsUpdate()
    track.addEventListener('scroll', requestElevatedCardsUpdate, { passive: true })
    window.addEventListener('resize', requestElevatedCardsUpdate)

    return () => {
      track.removeEventListener('scroll', requestElevatedCardsUpdate)
      window.removeEventListener('resize', requestElevatedCardsUpdate)

      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId)
      }
    }
  }, [])

  const handleSidesCarousel = (direction: -1 | 1) => {
    const track = sidesCarouselRef.current

    if (!track) {
      return
    }

    const firstCard = track.querySelector<HTMLElement>('.side-card')
    const styles = window.getComputedStyle(track)
    const gap = Number.parseFloat(styles.columnGap || styles.gap || '14') || 14
    const step = (firstCard?.offsetWidth ?? track.clientWidth) + gap

    track.scrollBy({
      left: step * direction,
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
          <button className="cart" type="button" aria-label="Cart">
            <span className="cart-icon" aria-hidden="true">
              +
            </span>
            <span className="cart-badge">{cartCount}</span>
          </button>
          <button className="cta" type="button">
            Reservation
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
                icone instantaneo.
              </h1>
              <p>
                Camadas lendarias, presenca premium e um classico reconhecido na
                primeira olhada.
              </p>
              <div className="hero-actions">
                <a className="hero-primary" href="#hamburgueres">
                  Explorar cardapio
                </a>
              </div>
            </div>

            <Burger3D className="hero-projection" />
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
              <p className="burgers-kicker">Selecao premium</p>
              <h2 id="hamburgueres-heading">Hamburgueres</h2>
              <p className="burgers-subtitle">
                Classicos que definem o sabor
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
                  <p className="sides-kicker">Complete sua experiencia</p>
                  <h2 id="acompanhamentos-heading">Acompanhamentos</h2>
                  <p className="sides-description">
                    Escolhas pensadas para elevar cada pedido com mais crocancia,
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
                    {sideCards.map((side, index) => {
                      const isAdded = addedItemId === side.id
                      const cardStyle = {
                        '--side-accent': side.accent,
                        '--card-delay': `${0.12 * index}s`,
                      } as CSSProperties

                      const isElevated = elevatedSideCardIds.includes(side.id)

                      return (
                        <article
                          key={side.id}
                          data-side-card-id={side.id}
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
                                onClick={() => handleAddToOrder(side.id)}
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
                    aria-label="Mostrar proximos acompanhamentos"
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
                  Sugestoes inteligentes
                </span>
                <p>Combinacoes prontas para um pedido mais gostoso.</p>
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
      </main>
    </div>
  )
}

export default App

