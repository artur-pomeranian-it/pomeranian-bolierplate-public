import { formatTime } from '../../Utils';

export function HighScoreTable({ values }) {
  return values && values.length > 0 ? (
    <table className="memo__high-score-table">
      <thead>
        <tr>
          <th>No of Elements</th>
          <th>Score</th>
          <th>Time</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        {values.map(({ el, score, time, points }) => (
          <tr key={el}>
            <td>{el}</td>
            <td>{score || '-'}</td>
            <td>{time ? formatTime(time) : '-'}</td>
            <td>{points || '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : null;
}
