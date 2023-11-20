import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return (
    <button
      className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
      onClick={handleBack}
    >
      Back
    </button>
  );
};

export default BackButton;
