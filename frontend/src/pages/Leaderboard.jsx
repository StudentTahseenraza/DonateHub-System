import Leaderboard from '../components/Leaderboard';

const LeaderboardPage = () => {
  return (
    <div className="container mt-5 bg-dark py-5 rounded-3">
      <h2 className="text-center mb-5 text-white fw-bold">Top Donors</h2>
      <div className="row justify-content-center">
        <div className="col-lg-10 col-md-12">
          <Leaderboard />
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;