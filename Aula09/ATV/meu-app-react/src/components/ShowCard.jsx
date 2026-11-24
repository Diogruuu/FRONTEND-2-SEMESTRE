import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext.jsx";

function yearFromDate(date) {
    return date ? date.slice(0, 4) : "Ano não informado";
}

export default function ShowCard({ show, index = 0 }) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const saved = isFavorite(show.id);
    const image = show.image?.medium || show.image?.original;

    return (
        <article className="show-card" style={{ "--card-index": index }}>
            <Link className="poster-link" to={`/serie/${show.id}`} aria-label={`Ver detalhes de ${show.name}`}>
                {image ? (
                    <img className="show-poster" src={image} alt={`Pôster da série ${show.name}`} loading="lazy" />
                ) : (
                    <div className="poster-placeholder"><span>F.</span><small>SEM PÔSTER</small></div>
                )}
                <span className="poster-open" aria-hidden="true">↗</span>
            </Link>

            <div className="show-card-body">
                <div className="show-card-title-row">
                    <div>
                        <p className="show-year">{yearFromDate(show.premiered)}</p>
                        <h3><Link to={`/serie/${show.id}`}>{show.name}</Link></h3>
                    </div>
                    <button
                        className={`save-button ${saved ? "is-saved" : ""}`}
                        type="button"
                        onClick={() => toggleFavorite(show)}
                        aria-label={saved ? `Remover ${show.name} dos favoritos` : `Salvar ${show.name} nos favoritos`}
                        aria-pressed={saved}
                    >
                        {saved ? "♥" : "♡"}
                    </button>
                </div>
                <div className="show-card-meta">
                    <span>{show.genres?.[0] || "Série"}</span>
                    {show.rating?.average && <span className="rating"><span aria-hidden="true">★</span> {show.rating.average.toFixed(1)}</span>}
                </div>
            </div>
        </article>
    );
}
