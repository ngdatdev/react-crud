import { Alert } from "react-bootstrap";
import { useAuth } from "../context/contextUser";

const PrivateRoute = (props) => {
  const { userAuth } = useAuth();

  if (userAuth && !userAuth.isAuth) {
    return (
      <>
        {" "}
        <div style={{paddingTop: '50px'}}>

        </div>
        <Alert variant="danger">
          <Alert.Heading>Not authorization</Alert.Heading>
          <p>
           You need login to access this page
          </p>
          <hr />
          <p className="mb-0">
            Whenever you need to, be sure to use margin utilities to keep things
            nice and tidy.
          </p>
        </Alert>
      </>
    );
  } else {
    return <>{props.children}</>;
  }
};

export default PrivateRoute;
