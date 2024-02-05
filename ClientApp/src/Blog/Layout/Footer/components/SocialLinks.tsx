import { ReactNode } from "react";
import { Container } from "reactstrap";
import { FaGithub as GithubIcon } from "react-icons/fa";
import { FaLinkedin as LinkedInIcon } from "react-icons/fa";
import { TbWorldWww as PortfolioIcon } from "react-icons/tb";

interface SocialLinkInterface {
  id: number;
  icon: ReactNode;
  link: string;
  altText: string;
}

const SocialLinksTemplates: SocialLinkInterface[] = [
  {
    id: 1,
    icon: <GithubIcon />,
    link: "https://github.com/pawel975",
    altText: "Github",
  },
  {
    id: 2,
    icon: <LinkedInIcon />,
    link: "https://www.linkedin.com/in/pawe%C5%82-kurek-7aab5424b/",
    altText: "LinkedIn",
  },
  {
    id: 3,
    icon: <PortfolioIcon />,
    link: "https://www.pawelkurek-portfolio.pl/",
    altText: "Portfolio",
  },
];

const SocialLinks: React.FC = () => {
  return (
    <Container className="d-flex flex-row gap-3 fs-700">
      {SocialLinksTemplates.map((linkTemplate) => (
        <a
          key={linkTemplate.id}
          className="own-text-secondary"
          target="_blank"
          rel="noreferrer"
          href={linkTemplate.link}
        >
          {linkTemplate.icon ? linkTemplate.icon : <span className="fs-300">{linkTemplate.altText}</span>}
        </a>
      ))}
    </Container>
  );
};

export default SocialLinks;
