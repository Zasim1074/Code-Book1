import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "../../Providers/Modals/Modal";
import "./index.scss";
import logo from "./logo.png";
import { RightComponent } from "./Right Component";
import { modalConstants, ModalContext } from "../../Providers/ModalProvider";
import { signOut } from "firebase/auth";
import { auth } from "../Auth/firebase";

export const HomeScreen = () => {
  const modalFeatures = useContext(ModalContext);
  const navigate = useNavigate();

  const openCreatePlaygroundModal = () => {
    modalFeatures.openModal(modalConstants.CREATE_PLAYGROUND);
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      await signOut(auth); 
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="home-container">
      <div className="left-container">
        <div className="sign-out">
          <button onClick={handleLogout}>Sign Out</button>
        </div>
        <div className="items-container">
          <img id="img-logo" src={logo} alt="Logo" />
          <h1>Code Book</h1>
          <h2>Code.Compile.Debug</h2>
          <button onClick={openCreatePlaygroundModal}>
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "30px" }}
            >
              add
            </span>
            <span>Create Project</span>
          </button>
        </div>
      </div>

      <RightComponent />
      <Modal />
    </div>
  );
};
