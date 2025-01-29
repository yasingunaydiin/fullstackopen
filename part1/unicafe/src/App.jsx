import { useState } from 'react';

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <div>
      <p>
        {text}: {value}
      </p>
    </div>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  return (
    <table>
      <tbody>
        <tr>
          <td>
            {total > 0 ? (
              <>
                <StatisticLine text='good' value={good} />
                <StatisticLine text='neutral' value={neutral} />
                <StatisticLine text='bad' value={bad} />
                <StatisticLine text='all' value={total} />
                <StatisticLine
                  text='average'
                  value={((good * 1 + neutral * 0 + bad * -1) / total).toFixed(
                    2
                  )}
                />
                <StatisticLine
                  text='positive'
                  value={`${((good / total) * 100).toFixed(2)} %`}
                />
              </>
            ) : (
              <p>No feedback given</p>
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text='good' />
      <Button onClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button onClick={() => setBad(bad + 1)} text='bad' />

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
