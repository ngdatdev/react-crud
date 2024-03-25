import { Alert } from "react-bootstrap";

export const NotFound = () => {
    return (
        <>
        {" "}
        <div style={{paddingTop: '50px'}}>

        </div>
        <Alert variant="danger">
          <Alert.Heading>404 Not Found</Alert.Heading>
          <hr />
          <p className="mb-0">
          The resource you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </Alert>
      </>
    )
}