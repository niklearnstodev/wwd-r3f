import "../App.css";
import cat from "../cat.jpeg";

export default function Sidebar(props) {
  const info = props.geometry;
  const image = info.image ? `./${info.image}` : cat;
  return (
    <div className="info-container">
      <div className="info-container__heading info-container__item">
        {info.title}
      </div>
      <div className="info-container__description info-container__item">
        {info.description}
      </div>
      <div className="info-container__link info-container__item">
        <a href={info.project_link} aria-label="link to exhibit">
          Visit the exhibit
        </a>
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