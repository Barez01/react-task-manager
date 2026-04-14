import "./Loader.css";

export default function Loader({ large }: { large: boolean }) {
  return <div className={large ? "loader" : "loader-small"}></div>;
}
