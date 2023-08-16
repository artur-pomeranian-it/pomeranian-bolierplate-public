import { Button } from '../../Components';

export default function HighScoreToggle({ isVisible, setIsVisible }) {
  return (
    <Button
      value={isVisible ? 'Hide High Score' : 'Show High Score'}
      variant={isVisible ? 'secondary' : 'primary'}
      onClick={() => setIsVisible((current) => !current)}
    />
  );
}
