import ContactEmail from "../../components/ContactEmail";
import HrDivider from "../../components/HrDivider";
import Logo from "../../components/Logo";
import Copyrights from "./components/Copyrights";
import FooterNavLinks from "./components/FooterNavLinks";
import SocialLinks from "./components/SocialLinks";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className=" own-bg-negative own-text-secondary mt-auto p-5 gap-3 d-flex flex-row justify-content-between align-items-center responsive-footer">
      <div className="d-flex flex-row gap-3 mx-5">
        <div className="m-auto">
          <Logo />
        </div>
        <HrDivider dividerColor={"secondary"} />
        <div className="d-flex flex-column gap-1 align-items-start my-auto">
          <FooterNavLinks />
          <Copyrights />
        </div>
      </div>
      <div className="d-flex flex-column gap-2 align-items-start mx-5">
        <SocialLinks />
        <ContactEmail />
      </div>
    </footer>
  );
};

export default Footer;
