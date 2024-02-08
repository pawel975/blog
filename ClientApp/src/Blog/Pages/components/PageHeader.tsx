interface PageHeaderInterface {
  pageTitle: string;
}

const PageHeader: React.FC<PageHeaderInterface> = ({ pageTitle }) => {
  return (
    <header className="blog-header">
      <h1>{pageTitle}</h1>
      <hr />
    </header>
  );
};

export default PageHeader;
