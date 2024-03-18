import { Button, Modal } from "react-bootstrap";
import infoimg from "./info-circle.svg";
import Image from "react-bootstrap/Image";
import { useState } from "react";

const InfoCalorie = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        onClick={handleShow}
        className="text-center justify-content-center"
        style={{
          backgroundColor: "transparent",
          borderRadius: "100%",
          borderColor: "transparent",
          height: "fit-content",
          width: "fit-content",
          padding: "0px",
          margin: "0px",
        }}
      >
        <Image src={infoimg} height="20" width="20" />
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        dialogClassName="modal-50w"
      >
        <Modal.Header closeButton>
          <Modal.Title>Infomations sur les calories</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-dark">
          <p className="text-dark">
            Le calcul des calories peut être utilisé pour estimer le nombre de
            calories qu'une personne doit consommer chaque jour. Ce calcul peut
            également fournir quelques directives simples pour prendre ou perdre
            du poids
          </p>
          <p className="text-dark">
            For men: BMR = 13.397W + 4.799H - 5.677A + 88.362
          </p>
          <p className="text-dark">
            For women: BMR =9.247W + 3.098H - 4.330A + 447.593
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default InfoCalorie;
