import { capitalize } from "../../utils/helper";
import "./Modal.css";

type ModalProps = {
  closeModal: () => void;
  handleConfirm: () => void;
  message: string;
};

export const Modal = (props: ModalProps) => {
  const { closeModal, handleConfirm, message } = props;
  return (
    <>
      {
        <div className="modal">
          <div onClick={closeModal} className="overlay"></div>
          <div className="modal-content">
            <h2>{capitalize(message)}</h2>
            <p>{`Are you sure you want to ${message.toLowerCase()}?`}</p>
            <div className="btn-group">
              <button
                className="btn-modal ok"
                onClick={() => {
                  handleConfirm();
                  closeModal();
                }}
              >
                OK
              </button>
              <button className="btn-modal" onClick={closeModal}>
                CANCEL
              </button>
            </div>
          </div>
        </div>
      }
    </>
  );
};
