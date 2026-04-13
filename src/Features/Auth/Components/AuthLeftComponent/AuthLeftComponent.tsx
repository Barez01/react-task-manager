import { CheckIcon } from "../../../../Constants/Icons/check_icon";
import "./AuthLeftComponent.css";

export default function AuthLeftComponent() {
  return (
    <div className="left-component">
      <h2>
        Save your daily notes <br />
        with Notefy app
      </h2>
      <p>
        The most trust worthy collaborator to save your <br /> daily notes, and
        make memroies.
      </p>
      <div className="motos">
        <SingleMoto moto="Safe & Secure" />
        <SingleMoto moto="Fast & Reliable" />
        <SingleMoto moto="Comprehensive Data" />
      </div>
    </div>
  );
}

function SingleMoto({ moto }: { moto: string }) {
  return (
    <div className="moto-1">
      {CheckIcon({ color: "#fff" })}
      <h6>{moto}</h6>
    </div>
  );
}
