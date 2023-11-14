import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar";
import Banner from "./GameDetailsBanner";
import Header from "./GameDetailsBoxscore";
import Info from "./GameDetailsInfo";
import Radio from "./GameDetailsRadio";
import Teams from "./GameDetailsTeams";

const GameDetailsContainer = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [gamecenter, setGamecenter] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const modalStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: `translate(-50%, -50%)`,
    },
  };

  useEffect(() => {
    const fetchGamecenter = async () => {
      try {
        const response = await axios.get(
          `https://api-web.nhle.com/v1/gamecenter/${gameId}/boxscore`
        );
        setGamecenter(response.data);
      } catch (error) {
        console.error("Error fetching gamecenter:", error);
      }
    };

    fetchGamecenter();
  }, [gameId]);

  useEffect(() => {
    document.title = `${gamecenter?.awayTeam.abbrev} vs. ${gamecenter?.homeTeam.abbrev} | StickTap`;
  });

  function convertUTCToLocalTime(utcTime) {
    const date = new Date(utcTime);
    return date.toLocaleTimeString([], { hour: "numeric", minute: "numeric" });
  }

  return (
    <>
      <Navbar />
      <div className="dark:bg-gray-800 dark:text-white">
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 px-4 py-2 rounded"
        >
          Back
        </button>
        {gamecenter && (
          <div>
            <Banner game={gamecenter} />
            <Header
              game={gamecenter}
              convertUTCToLocalTime={convertUTCToLocalTime}
            />
            <Info
              game={gamecenter}
              convertUTCToLocalTime={convertUTCToLocalTime}
            />
            <button onClick={openModal} className="hover:underline">
              Where to Watch
            </button>
            <Modal
              isOpen={isModalOpen}
              onRequestClose={closeModal}
              style={modalStyles}
            >
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button onClick={closeModal}>
                  <FontAwesomeIcon icon={faX} />
                </button>
              </div>
              <Radio game={gamecenter} />
            </Modal>
            <Teams game={gamecenter} />
          </div>
        )}
      </div>
    </>
  );
};

export default GameDetailsContainer;
