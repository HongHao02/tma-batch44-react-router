import { Dialog } from "@mui/material";
import { useNavigate, useRouteError } from "react-router-dom";

function ErrorImagePage() {
  const navigate = useNavigate();
  const error: any = useRouteError();
  console.log("error ", error);
  function onDismiss() {
    navigate('/gallery');
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        flexDirection: "column",
      }}
    >
      <h1>Oops!</h1>
      <p>Image error.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
export default ErrorImagePage;
