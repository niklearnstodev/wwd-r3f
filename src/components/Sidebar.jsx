import "../App.css";
import cat from "../cat.jpeg";

export default function Sidebar(props) {
  const info = props.geometry;
  return (
    <div className="info-container">
      <div className="info-container__heading">{info.title}</div>
      <div>{info.description}</div>
      <div className="info-container__link">
        <a href={info.project_link} aria-label="link to exhibit">
          Visit the exhibit
        </a>
      </div>
      <img src={cat} alt="cat" />
    </div>
  );
}
