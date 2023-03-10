import { Box, Button, Card, CardActions, CardContent, CardHeader, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useCookies } from "react-cookie";
import axios from "axios";
import Header from "../../components/Header"

function LogIn() {

    const cardStyle = {
      display: "block",
      transitionDuration: "0.3s",
      height: "450px",
      width: "400px",
      variant: "outlined",
    };

    const [userID, setUserID] = useState('');
    const [password, setPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

    const [cookie, setCookie] = useCookies(['token']);

    const clickLogIn = async () => {
      
      // 入力エラー
      if (userID === '') {
        setErrorMessage('UserID is empty')
        return

      } else if (password === '') {
        setErrorMessage('password is empty')
        return
      }

      // ログイン処理
      const res = await axios.post('login', {
          user_id: userID,
          password: password
      })
      const obj = JSON.parse(JSON.stringify(res));
      console.log(obj.data)

      // エラー処理
      if (obj.data.Result === 'Failed') {
        setErrorMessage(obj.data.Message)
        return
      }

      // 成功時トークン保存とリダイレクト
      setCookie('token', obj.data.Message)
      console.log(cookie)
      navigate('/home')
    }
    return (
    
      <div style={{height: "100vh"}}>

        <div className="wrapper">
          <Header/>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          padding={5}
        >
          
          <Card style={cardStyle} >
            <CardHeader title="LogIn" 
            style={{color: "#00A83C", textAlign: "center",justifyContent:"center" }}/>
            <CardContent>
              <div>
                <TextField
                  fullWidth
                  id="userID"
                  type="userID"
                  label="UserID"
                  placeholder="UserID"
                  margin="normal"
                  onChange={((e)=>{setUserID(e.target.value)})}
                />
                <TextField
                  fullWidth
                  id="password"
                  type="password"
                  label="Password"
                  placeholder="Password"
                  margin="normal"
                  onChange={((e)=>{setPassword(e.target.value)})}
                />
              </div>
            </CardContent>

            
            <CardActions>
                <div className="loginButton" >
                  <div style={{ color: "#FF3131",
                      display:"flex",  margin: "0 19em 0 1em", 
                      whiteSpace: "nowrap"}}>
            
           
            <div className="ErrorTextbutton" style={{flexWrap:"nowrap"}}>
                  <Button
                    variant="contained"
                    sx={{m: "0 7em 10em 20em",
                    // textAlign: "center",justifyContent:"center"
                  }}
                    style={{backgroundColor: "#00A83C"}}
                    onClick={clickLogIn}
                  >
                    Login
                  </Button>
                  <div style={{color: "#FF3131", whiteSpace: "nowrap", margin:"-11em 12em 4em 0em"}}>
                         {errorMessage}
                  </div>
                </div>
                </div>
                </div>
                
            </CardActions >
            
    
              
          </Card>
        </Box>
      </div>
      </div>
    );

}

export default LogIn