import { useNavigate } from "react-router-dom";
import { ArrowIcon } from "../../../../Constants/Icons/arrow_icon";
import "./ContinueButton.css";

export default function ContinueButton({
  loading,
  onClick,
}: {
  loading: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button className="continue-button" onClick={onClick}>
      <h2>{loading ? "Loading..." : "Continue"}</h2>
      {loading ? (
        <div className="loader"></div>
      ) : (
        ArrowIcon({ color: "#fff", size: 32 })
      )}
    </button>
  );
}

export function OtherButton({ route }: { route: string }) {
  const navigate = useNavigate();
  return (
    <button className="other-button" onClick={() => navigate(route)}>
      <h2>Create Account</h2>
      {ArrowIcon({ color: "#000", size: 32 })}
    </button>
  );
}
