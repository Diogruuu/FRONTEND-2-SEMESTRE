import { BrowserRouter, Link, NavLink, Route, Routes } from "react-router-dom";
import { FavoritesProvider, useFavorites } from "./context/FavoritesContext.jsx";
import CatalogPage from "./pages/CatalogPage.jsx";
import FavoritesPage from "./pages/FavoritesPage.jsx";
import ShowDetailsPage from "./pages/ShowDetailsPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";

function SiteLayout() {
  const { favorites } = useFavorites();

  return (
    <div className="site-shell">
      <header className="site-header">
        <Link className="brand" to="/" aria-label="Fora do Ar — início">
          <span className="brand-mark" aria-hidden="true">F.</span>
          <span className="brand-name">fora do ar<span className="brand-dot">.</span></span>
        </Link>

        <nav className="main-nav" aria-label="Navegação principal">
          <NavLink end to="/">Explorar</NavLink>
          <NavLink to="/favoritos" className="favorites-nav">
            Minha lista <span className="nav-count">{favorites.length}</span>
          </NavLink>
          <NavLink to="/sobre">Sobre</NavLink>
        </nav>
      </header>

      <main className="page-content">
        <Routes>
          <Route path="/" element={<CatalogPage />} />
          <Route path="/favoritos" element={<FavoritesPage />} />
          <Route path="/serie/:id" element={<ShowDetailsPage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <footer className="site-footer">
        <Link className="footer-brand" to="/">fora do ar<span className="brand-dot">.</span></Link>
        <span>Uma pausa para escolher a próxima série.</span>
        <span>Dados de séries: <a href="https://www.tvmaze.com/api" target="_blank" rel="noreferrer">TVmaze</a></span>
      </footer>
    </div>
  );
}

function NotFoundPage() {
  return (
    <section className="message-page">
      <span className="eyebrow">ERRO 404</span>
      <h1>Essa página saiu do ar.</h1>
      <p>O endereço não existe. Volte para explorar as séries.</p>
      <Link className="button button-dark" to="/">Ir para o início <span aria-hidden="true">↗</span></Link>
    </section>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <FavoritesProvider>
        <SiteLayout />
      </FavoritesProvider>
    </BrowserRouter>
  );
}
