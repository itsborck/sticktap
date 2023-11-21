import { useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa6";

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return (
    <button
      className="hover:text-gray-400 text-white font-bold py-2 px-4 rounded flex items-center gap-2"
      onClick={handleBack}
    >
      <FaChevronLeft/> Back
    </button>
  );
};

export default BackButton;
