import logo from "@/assets/images/logo.png";

const LogoBar = () => {
  return (
    <div
      className="fixed top-2 left-4 z-10 lg:flex hidden"
      style={{
        boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
        borderRadius: "0.5rem",
        overflow: "hidden",
        justifyContent: "center",
        height: "70px",
      }}
    >
      <div style={{ padding: "5px 10px 5px 10px" }}>
        <img height={60} src={logo} alt="Flow" />
      </div>
    </div>
  );
};

export default LogoBar;
