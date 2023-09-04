import './styles.css';
import { Link } from 'react-router-dom';
import cssSvg from '../Images/tech-stack/css.svg';
import htmlSVG from '../Images/tech-stack/html.svg';
import tsSvg from '../Images/tech-stack/ts.svg';
import jsSvg from '../Images/tech-stack/js.svg';
import reactSvg from '../Images/tech-stack/react.svg';
import githubSvg from '../Images/tech-stack/githuub.svg';
import bitbucketSvg from '../Images/tech-stack/bitbucket.svg';
import jestSvg from '../Images/tech-stack/jest.svg';
import firebaseSvg from '../Images/tech-stack/firebase.svg';
import reduxPng from '../Images/tech-stack/redux.png';
import gitSvg from '../Images/tech-stack/git.svg';
import vscPng from '../Images/tech-stack/vscode-alt 1.png';
import discordSvg from '../Images/tech-stack/discord.svg';
import jiraPng from '../Images/tech-stack/jira 1.png';
import readminePng from '../Images/tech-stack/redmine.png';
import { MasterHeader } from '../Components/MasterHeader/MasterHeader';

export const TechStack = () => {
  return (
    <div className="tech-stack">
      <MasterHeader value="Tech stack" />

      <p>
        Poniżej znajdziesz tech stack oraz narzędzia jakie nauczysz sie podczas
        kursu
      </p>

      <ul className="tech-stack-list tech-stack-flex">
        <li>
          <img src={cssSvg} alt="Css" />
          CSS
        </li>
        <li>
          <img src={htmlSVG} alt="Html" />
          HTML
        </li>
        <li>
          <img src={tsSvg} alt="Typescript" />
          TypeScript
        </li>
        <li>
          <img src={jsSvg} alt="Javascript" />
          JavaScript
        </li>
        <li>
          <img src={reactSvg} alt="React" />
          React
        </li>
        <li>
          <img src={githubSvg} alt="Github" />
          GitHub
        </li>
        <li>
          <img src={bitbucketSvg} alt="Bitbucket" />
          Bitbucket
        </li>
        <li>
          <img src={jestSvg} alt="Jest" />
          Jest
        </li>
        <li>
          <img src={firebaseSvg} alt="Firebase" />
          Firebase
        </li>
        <li>
          <img src={reduxPng} alt="Redux" />
          Redux
        </li>
        <li>
          <img src={gitSvg} alt="Git" />
          Git
        </li>
        <li>
          <img src={vscPng} alt="Vscode" />
          VSCode
        </li>
        <li>
          <img src={discordSvg} alt="Discord" />
          Discord
        </li>
        <li>
          <img src={jiraPng} alt="Jira" />
          Jira
        </li>
        <li>
          <img src={readminePng} alt="Readmine" />
          Readmine
        </li>
      </ul>
    </div>
  );
};
