import './App.css'
import { Burger3D } from '@/components/ui/burger-3d'

type NavIconKey = 'burger' | 'fries' | 'drink' | 'icecream'

const navLinks: { label: string; icon: NavIconKey }[] = [
  { label: 'Hamburguers', icon: 'burger' },
  { label: 'Acompanhamentos', icon: 'fries' },
  { label: 'Bebidas', icon: 'drink' },
  { label: 'Sobremesas', icon: 'icecream' },
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

function App() {
  return (
    <div className="landing">
      <header className="navbar">
        <div className="brand">
          <img className="brand-logo" src="/assets/logo.png" alt="McDonald's" />
        </div>
        <nav className="nav-links" aria-label="Primary">
          {navLinks.map((link) => (
            <a key={link.label} href="#">
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
            <span className="cart-badge">5</span>
          </button>
          <button className="cta" type="button">
            Reservation
          </button>
        </div>
      </header>

      <main className="hero">
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
              <button className="hero-primary" type="button">
                Explorar cardápio
              </button>
            </div>
          </div>

          <Burger3D className="hero-projection" />
        </div>
      </main>
    </div>
  )
}

export default App
