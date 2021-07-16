import "../App.css";
import cat from "../cat.jpeg";

export default function Sidebar(props) {
  const info = props.geometry;
  const image = info.image ? `./${info.image}` : cat;
  return (
    <div className="info-container">
      <div className="info-container__heading info-container__item">
        <a
          href={info.project_link}
          aria-label="link to exhibit"
          target="_blank"
        >
          {info.title}
        </a>
      </div>
      <div className="info-container__subheading info-container__item">
        <a href={info.artist_link} aria-label="link to artist" target="_blank">
          {info.artist}
        </a>
      </div>
      <div className="info-container__description info-container__item">
        {info.description}
      </div>
      <div className="info-container__image info-container__item">
        <img
          className="info-container__img"
          src={image}
          alt={`Placeholder - ${info.title}`}
        />
      </div>
    </div>
  );
}
