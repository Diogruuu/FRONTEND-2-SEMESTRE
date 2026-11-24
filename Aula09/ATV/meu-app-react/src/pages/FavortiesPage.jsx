import { Link } from "react-router-dom";
import ShowCard from "../components/ShowCard.jsx";
import { useFavorites } from "../context/FavoritesContext.jsx";

export default function FavoritesPage() {
    const { favorites } = useFavorites();

    return (
        <section className="listing-page">
            <div className="page-intro">
                <span className="eyebrow"><span className="eyebrow-dot" /> A SUA CURADORIA</span>
                <h1>Minha lista<span className="heading-period">.</span></h1>
                <p>As histórias que você quer guardar por perto.</p>
            </div>

            {favorites.length === 0 ? (
                <div className="empty-state favorites-empty">
                    <span className="empty-icon">♡</span>
                    <h3>Sua lista ainda está vazia.</h3>
                    <p>Quando encontrar uma série que gosta, salve no coração.</p>
                    <Link className="button button-dark" to="/">Explorar séries <span aria-hidden="true">↗</span></Link>
                </div>
            ) : (
                <>
                    <div className="results-heading">
                        <p><strong>{favorites.length}</strong> série{favorites.length === 1 ? "" : "s"} salva{favorites.length === 1 ? "" : "s"}</p>
                        <Link to="/">Adicionar mais <span aria-hidden="true">↗</span></Link>
                    </div>
                    <div className="show-grid">
                        {favorites.map((show, index) => <ShowCard key={show.id} show={show} index={index} />)}
                    </div>
                </>
            )}
        </section>
    );
}
