
import "./modal.css";


const Modal = ({ active, setActive, children }) => {
  const modalClass = active ? "modal_token active" : "modal_token";
  const modalContentClass = active ? "modal_token__content active" : "modal_token__content";
  return (
    <div className={modalClass} onClick={() => setActive(false)}>
      <div
        className={modalContentClass}
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
