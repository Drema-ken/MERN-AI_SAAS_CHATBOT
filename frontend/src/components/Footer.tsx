const Footer = () => {
  return (
    <footer>
      <div
        style={{
          width: "100%",
          padding: 20,
          minHeight: "20vh",
          maxHeight: "30vh",
          marginTop: 50,
        }}
      >
        <p style={{ fontSize: "30px", textAlign: "center" }}>
          Built with love by <span className="nav-link">Drema</span> 🙌
        </p>
      </div>
    </footer>
  );
};

export default Footer;
