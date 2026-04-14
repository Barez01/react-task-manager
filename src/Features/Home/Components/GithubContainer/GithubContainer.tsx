import githubLogo from "../../../../assets/images/github-logo.png";
import "./GithubContainer.css";

export default function GithubContainer(){
    return <a href="https://github.com/Barez01" target="_blank" className="div3">
            <h1>Follow me</h1>
            <p>
              If you find this project useful, <br />
              you can follow me
            </p>
            <div className="image-container">
              <img src={githubLogo} alt="" />
            </div>
          </a>;
}