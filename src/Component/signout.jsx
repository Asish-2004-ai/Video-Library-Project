import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "../css/signout.css";

export function Signout() {
  const [cookies, setCookie, removeCookie] = useCookies(["admin-id"]);
  let navigate = useNavigate();

  function removeclick() {
    removeCookie("admin-id");
    navigate("/admin-login");
    window.location.reload();
  }

  function noclick() {
    window.location.reload();
  }

  return (
    <div className="signout-container">
      <button className="btn btn-danger" data-bs-target="#remove" data-bs-toggle="modal">
        Signout
      </button>
      <div className="modal fade" id="remove">
        <div className="modal-dialog modal-dialog-top">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Signout Confirmation</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body ">
              <p className="text-dark">Do you want to Signout?</p>
            </div>
            <div className="modal-footer ms-3">
              <button className="btn btn-primary me-3" onClick={removeclick}>
                Yes
              </button>
              <button className="btn btn-secondary" onClick={noclick}>
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
