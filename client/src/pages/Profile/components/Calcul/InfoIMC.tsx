import { Button, Modal, Table } from "react-bootstrap";
import infoimg from "./info-circle.svg";
import Image from "react-bootstrap/Image";
import { useState } from "react";

const InfoIMC = () => {
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
          <Modal.Title>Infomations sur IMC</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-dark">
            L’évaluation du poids santé s’effectue en utilisant l’indice de
            masse corporelle (IMC) et le tour de taille. L’IMC est un simple
            rapport mathématique entre le poids et la taille. Une fois établi,
            il permet d’évaluer le risque de développer certaines maladies à
            long terme.
          </p>
          <p className="text-dark">
            Quoique l’IMC soit un bon indicateur du poids santé d’un individu,
            il ne tient pas compte de la répartition des graisses corporelles
            chez celui-ci. De nombreuses études démontrent qu’il y a également
            un lien entre le surplus de graisses abdominales et certains
            problèmes de santé comme le diabète, l’hypertension et les maladies
            cardiovasculaires. C’est donc pourquoi le tour de taille est une
            mesure complémentaire à celle de l'IMC.
          </p>
          <Table bordered>
            <thead className="table-info">
              <tr>
                <th>IMC</th>
                <th>Classification</th>
                <th>Risque de maladie</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{"< "}18.5</td>
                <td>Poids insuffisant</td>
                <td>Accru</td>
              </tr>
              <tr>
                <td>18.5 à 25</td>
                <td>Poids santé</td>
                <td>Moindre</td>
              </tr>
              <tr>
                <td>25 à 30</td>
                <td>Léger excès de poids</td>
                <td>Accru</td>
              </tr>
              <tr>
                <td>30 à 35</td>
                <td>Obésité classe I</td>
                <td>Élevé</td>
              </tr>
              <tr>
                <td>35 à 40</td>
                <td>Obésité classe II</td>
                <td>Très élevé</td>
              </tr>
              <tr>
                <td>{"> "}40</td>
                <td>Obésité classe III</td>
                <td>Extrêmement élevé</td>
              </tr>
              <tr></tr>
            </tbody>
          </Table>
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

export default InfoIMC;
