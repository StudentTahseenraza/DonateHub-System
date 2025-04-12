const StatsCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex items-center">
      <div className="flex-shrink-0">
        <img src={icon} alt={title} className="h-8 w-8" />
      </div>
      <div className="ml-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-gray-600">{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;