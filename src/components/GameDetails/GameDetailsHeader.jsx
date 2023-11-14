const Header = ({ game }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">
        {game.awayTeam.name.default} vs {game.homeTeam.name.default}
      </h2>
    </div>
  );
};

export default Header;
