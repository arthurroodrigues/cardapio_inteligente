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

const navLinks: NavLink[] = [
  { label: 'Hamburguers', icon: 'burger', href: '#hamburgueres' },
  { label: 'Acompanhamentos', icon: 'fries', href: '#' },
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
    name: 'Quarterão',
    price: 'R$ 31,90',
    note: 'Carne marcante, queijo derretido e presença de sobra.',
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
    note: 'Perfil robusto com crocância e final defumado.',
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

function App() {
  const [cartCount, setCartCount] = useState(5)
  const [addedBurgerId, setAddedBurgerId] = useState<string | null>(null)
  const feedbackTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (feedbackTimeoutRef.current !== null) {
        window.clearTimeout(feedbackTimeoutRef.current)
      }
    }
  }, [])

  const handleAddToOrder = (burgerId: string) => {
    setCartCount((currentCount) => currentCount + 1)
    setAddedBurgerId(burgerId)

    if (feedbackTimeoutRef.current !== null) {
      window.clearTimeout(feedbackTimeoutRef.current)
    }

    feedbackTimeoutRef.current = window.setTimeout(() => {
      setAddedBurgerId((currentId) =>
        currentId === burgerId ? null : currentId,
      )
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
              ▢
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
              <p className="burgers-kicker">Seleção premium</p>
              <h2 id="hamburgueres-heading">Hambúrgueres</h2>
              <p className="burgers-subtitle">
                Clássicos que definem o sabor
              </p>
            </div>

            <div className="burgers-grid">
              {burgerCards.map((burger, index) => {
                const isAdded = addedBurgerId === burger.id
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
                      <span className="burger-card-badge">Mais popular 🔥</span>
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
      </main>
    </div>
  )
}

export default App
