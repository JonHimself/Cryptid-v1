import React, { useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import { dark, light } from "./actions/darkTheme";
import { Layout, Typography, Space, Switch as DarkMode } from "antd";
import {
  Navbar,
  Exchanges,
  Homepage,
  Cryptocurrencies,
  News,
  CryptoDetails,
  Ticker,
  Login,
  Signup,
} from "./components";
import "./App.css";

const App = ({ darkTheme, dark, light }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [checked, setChecked] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleTheme = () => {
    setChecked(!checked);
    darkTheme === false ? dark() : light();
  };

  return (
    <div className={`app ${darkTheme ? "dark" : " "}`}>
      <div className={`navbar ${darkTheme ? "dark" : " "}`}>
        <Navbar />
      </div>
      <div className="main">
        <Layout className={darkTheme ? "dark" : " "}>
          <div className="topOptions">
            <DarkMode
              checked={darkTheme ? true : false}
              onClick={handleTheme}
              checkedChildren="🌘"
              unCheckedChildren="🌕"
              style={{ width: 40, backgroundColor: "rgb(88,65,216)" }}
            />
            <Login
              showModal={showModal}
              handleOk={handleOk}
              handleCancel={handleCancel}
              isModalVisible={isModalVisible}
            />
          </div>
          <div className="routes">
            <Switch>
              <Route path="/signup">
                <Signup />
              </Route>
              <Route exact path="/">
                <Homepage />
              </Route>
              <Route exact path="/exchanges">
                <Exchanges />
              </Route>
              <Route exact path="/cryptocurrencies">
                <Cryptocurrencies />
              </Route>
              <Route exact path="/crypto/:coinId">
                <CryptoDetails />
              </Route>
              <Route exact path="/news">
                <News />
              </Route>
              <Route exact path="/ticker">
                <Ticker />
              </Route>
            </Switch>
          </div>
        </Layout>
        <div className={`footer ${darkTheme ? "dark" : " "}`}>
          <Typography.Title
            level={5}
            style={{ color: "rgb(88,65,216)", textAlign: "center" }}
          >
            Cryptid <br />
            All rights reserved
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/exchanges">Exchanges</Link>
            <Link to="/news">News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { darkTheme: state.darkTheme.darkTheme };
};

export default connect(mapStateToProps, { dark, light })(App);
