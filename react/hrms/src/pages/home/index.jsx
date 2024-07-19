import Header from "../header";
import HumanSection from "../human";
import ResourceSection from "../resource";
import ManagementSection from "../management";
import SystemSection from "../system";
import Login from "../login";
// import ButtonAppBar from "../navbarHome";
const Home = () => {
    return (
      <div>
        {/* <ButtonAppBar/> */}
        <Header />
        <div id="content">
          <HumanSection />
          <ResourceSection />
          <ManagementSection />
          <SystemSection />
        </div>
        <div id="login-container">
          <Login />
        </div>
      </div>
    );
  };
export default Home


