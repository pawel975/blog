import "./NotFoundPage.css";

const NotFoundPage: React.FC = () => {
  return (
    <section className="not-found-page">
      <header>
        <h1>Page not found</h1>
      </header>
      <p>
        Go to{" "}
        <a className="text-dark" href="/">
          home page
        </a>
      </p>
    </section>
  );
};

export default NotFoundPage;
