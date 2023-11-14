const GameDetailsRadio = ({ game }) => {
  return (
    <div>
      <h3>Broadcasts:</h3>
      <ul>
        {game.tvBroadcasts.map((broadcast) => (
          <li key={broadcast.id}>
            {broadcast.network} ({broadcast.countryCode})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameDetailsRadio;
