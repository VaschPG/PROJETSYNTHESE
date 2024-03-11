import { Spinner } from "react-bootstrap";


const LoadingPage = () => {
    return(
    <>
    <div className="d-flex align-items-center justify-content-center vh-100">
    <Spinner animation="border" role="status" style={{width:"5em", height:"5em"}}>
      <span className="visually-hidden">Loading...</span>
    </Spinner>
    </div>
    </>
    )
  };


export default LoadingPage;