import "./Footer.css";

const authors = [
  { name: "g0sie", href: "https://github.com/g0sie" },
  { name: "ogglapff", href: "https://www.instagram.com/ogglapff/" },
];

const Footer = () => {
  return (
    <div className="footer text-primary">
      <div className="authors">
        {authors.map((author) => (
          <a
            key={`author-${author.name}`}
            href={author.href}
            className="authors__author hover:text-primary-hover"
            target="_blank"
            rel="noreferrer noopener"
          >
            <p>@{author.name}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Footer;
