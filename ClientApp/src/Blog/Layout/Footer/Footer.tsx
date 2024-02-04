import Copyrights from "./components/Copyrights";
import FooterNavLinks from "./components/FooterNavLinks";
import SocialLinks from "./components/SocialLinks";

const Footer: React.FC = () => {
  return (
    <footer className="own-bg-negative own-text-secondary mt-auto p-4 gap-3 d-flex flex-column align-items-center">
      <FooterNavLinks />
      <SocialLinks />
      <Copyrights />
    </footer>
  );
};

export default Footer;
