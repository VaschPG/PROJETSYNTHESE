import { Button, Modal } from "react-bootstrap";
import infoimg from "./info-circle.svg";
import Image from "react-bootstrap/Image";
import { useState } from "react";

const InfoIdeal = () => {
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
      <Modal show={show} onHide={handleClose} centered dialogClassName="modal-50w">
        <Modal.Header closeButton>
          <Modal.Title>Infomations sur IMC</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-dark">
          <p className="text-dark">
            Le calculateur de poids idéal calcule les plages de poids idéal en fonction de la taille, du sexe et de l'âge. L’idée de trouver le poids
            idéal à l’aide d’une formule est recherchée depuis longtemps par de nombreux experts.
          </p>
          <p className="text-dark">
            Notez que le poids corporel idéal n’est pas une mesure parfaite. Il ne prend pas en compte les pourcentages de graisse corporelle et de
            muscle dans le corps d'une personne. Cela signifie qu'il est possible que des athlètes en bonne santé et en bonne forme physique soient
            considérés comme en surpoids en fonction de leur poids corporel idéal. C'est pourquoi le poids corporel idéal doit être considéré dans la
            perspective qu'il s'agit d'une mesure imparfaite et n'est pas nécessairement une indication de la santé, ni d'un poids vers lequel une
            personne devrait nécessairement s'efforcer d'atteindre ; il est possible d'être au-dessus ou au-dessous de votre « poids idéal » et d'être
            en parfaite santé.
          </p>
          <p className="text-dark">Male: 56.2 kg + 1.41 kg per inch over 5 feet Female: 53.1 kg + 1.36 kg per inch over 5 feet</p>
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

export default InfoIdeal;
