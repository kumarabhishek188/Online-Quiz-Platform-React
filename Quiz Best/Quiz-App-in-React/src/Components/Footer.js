import FavoriteIcon from "@mui/icons-material/Favorite";
import GitHubIcon from "@mui/icons-material/GitHub";
import { MDBCol, MDBFooter } from "mdb-react-ui-kit";

export const Footer = () => {
  return (
    <div className="footer fixed-bottom">
      <MDBFooter bgColor="dark" className="text-left text-white text-lg-left">
        <MDBCol className="d-flex justify-content-between p-3 flex-wrap">
          <span>
            Made With <FavoriteIcon style={{ color: "red" }} /> By Abhishek Kumar
          </span>
          <a href="https://github.com/kumarabhishek188">
            <GitHubIcon style={{ color: "white" }} />
          </a>
        </MDBCol>
      </MDBFooter>
    </div>
  );
};
