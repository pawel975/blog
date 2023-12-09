import "./NotFoundPage.css";

interface NotFoundPageInterface {
  homePage?: string;
}

const NotFoundPage: React.FC<NotFoundPageInterface> = ({ homePage = "/" }) => {
  return (
    <section className="not-found-page">
      <header>
        <h1>Page not found</h1>
      </header>
      <p>
        Go to{" "}
        <a className="text-dark" href={homePage}>
          home page
        </a>
      </p>
    </section>
  );
};

export default NotFoundPage;
