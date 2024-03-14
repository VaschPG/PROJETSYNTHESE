import Button from "react-bootstrap/Button";

const LoadingButton = () => {
  return (
    <Button disabled={true} style={{ fontSize: "18px" }}>
      Loading...
    </Button>
  );
};

export default LoadingButton;
