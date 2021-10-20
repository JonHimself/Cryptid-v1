import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { signIn, signOut } from '../actions/userStateAction'; 
import { Form, Input, Button, Checkbox, Modal, Spin, Alert, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';

const Login = ({darkTheme, signIn, signOut, handleOk, handleCancel, showModal, isModalVisible }) => {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [loggedOut, setLoggedOut] = useState(false)
  const [user, setUser] = useState('')
  const [username, setUsername] = useState('')


  useEffect(() => {
    const loggedInUser = localStorage.getItem("userInfo");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
      setUsername(foundUser.username)
      setLoggedIn(true)
    }
  }, [loggedIn]);

  const openNotificationIn = (name) => {
    notification.open({
      message: `Welcome! ${name}`,
      description:
        'Thanks for choosing Cryptid! 😻',
      className: darkTheme ? 'dark' : '',
    });
  };

  const openNotificationOut = (user) => {
    notification.open({
      message: `Goodbye ${user}!`,
      description:
        `We're gonna miss you! 😿`,
      className: darkTheme ? 'dark' : '',
    });
  };

    const onFinish = async (values) => {
        const {email, password} = values
        try {
          const config = {
            headers: {
              "Content-type": "application/json"
            }
          };
          setLoading(true)

          const { data } = await axios.post('http://localhost:8000/api/users/login', {
            "email": email, "password": password
          }, config)

          const name = data.username
          setUser(name)
          localStorage.setItem('userInfo', JSON.stringify(data))
          setLoggedIn(true)
          setLoading(false)
          signIn()
          openNotificationIn(name)

        } catch (err) {
            setError(err.response.data.message)
        }
      }

      const onClose = (e) => {
        setLoading(false)
      };

      const logOut = () => {
        localStorage.removeItem("userInfo");
        setLoggedIn(false)
        setLoggedOut(true)
        signOut()
        setUsername('')
        setUser('')
        openNotificationOut(username)
      }


    return (
        <>
        {!loggedIn ? <Button type="primary" onClick={() => {showModal(); setLoggedOut(false)}} style={{width: '80px', backgroundColor: "rgb(88,65,216)", border: 'none'}}>
          Log in
        </Button> : <Button type="primary" onClick={() => logOut()} style={{width: '80px', backgroundColor: "rgb(88,65,216)", border: 'none'}}>Log Out</Button>}
        {!loggedIn && !loggedOut ?
        <Modal className={darkTheme ? 'dark' : ''} title="Log In" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} cancelButtonProps={{style: {display: 'none'}}} okButtonProps={{style: {display: 'none'}}}>
          <Form name="normal_login" className="login-form" initialValues={{remember: true,}} onFinish={onFinish}>
          <Form.Item name="email" rules={[{type: 'email', message: 'Your e-mail is invalid'},{required: true, message: 'Please input your email!',},]}>
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email" />
          </Form.Item>
          {error && <Alert message={error} type='warning' closable onClose={onClose}/>}
          {loading && !error ? <Spin /> : null}
          <Form.Item name="password" rules={[{required: true, message: 'Please input your Password!'},]}
          >
            <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password"/>
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>
            
          <Form.Item>
            <Button onClick={loggedIn ? handleOk(): showModal} type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or <Link onClick={handleOk} to="/signup">register now!</Link>
          </Form.Item>
          
        </Form>
    </Modal>
    : null}
        </>
    )
}

const mapStateToProps = (state) => {
  return {isSignedIn: state.user.isSignedIn, darkTheme: state.darkTheme.darkTheme}
}

export default connect(mapStateToProps, {signIn, signOut})(Login)
