import Button from "react-bootstrap/Button";
import { Spinner } from "react-bootstrap";

const LoadingButton = () => {
  return (
    <Button disabled={true} style={{ fontSize: "18px" }}>
      <Spinner animation="border" role="status" style={{ width: "1em", height: "1em", color: "gray" }}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Button>
  );
};

export default LoadingButton;
