import { useState } from "react";
import Header from "./Header";
import CurrentTab from "./CurrentTab";
import Login from "./Login";
import Register from "./Register";

const Landing = () => {
  const [currenTab, setCurrentTab] = useState("login");

  return (
    <>
      <Header />
      <main className=" m-auto sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <section className="max-w-7xl mx-auto">
          <CurrentTab currenTab={currenTab} setCurrentTab={setCurrentTab} />
          {currenTab === "login" ? <Login /> : <Register />}
        </section>
      </main>
    </>
  );
};

export default Landing;
