import React,{useEffect,useRef} from 'react';
import {Navbar} from "./components/Navbar.jsx"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {useSelector} from 'react-redux';
import "./App.css"
import { ScrollSnap } from './components/ScrollSnap.jsx';
import { Menu } from './components/Menu.jsx';
import Div100vh from 'react-div-100vh'

export const App = (props) => {

  var Cookie = require('js-cookie');
  let auth = useSelector(state=>state.fireBaseReducer.auth);
  
  const returnPage = () =>{
    if(auth.isEmpty ==true){
      if(Cookie.get("LoggedIn")=='true'){

      }
      else{
        return <ScrollSnap></ScrollSnap>
      }
    }
    else{
      if(Cookie.get("LoggedIn")!='true'){
        Cookie.set('LoggedIn','true');
      }
      return (<div style={{height:"100vh",backgroundColor:"white",color:"black",paddingTop:"10vh"}}>
      <h1>Game Page</h1>
    </div>)
    }
  }

  useEffect(() => {

    
    
    

  }, [])

  return (
<html>

  <head>
    <link rel="stylesheet" href="https://use.typekit.net/bfk1sru.css"/>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.2.6/gsap.js" integrity="sha256-mfgvzVjyIcoXo0ElsT8uFIuDWYkvKCQ6wrkm6If7iug=" crossorigin="anonymous"></script>
  </head>
  <body id='App' className="App">
  <Navbar></Navbar>
    <Menu></Menu>

    <Router>
    <Switch>
      <Route exact path="/">
        <Div100vh>
          {returnPage()}
        </Div100vh>
      </Route>
      {/*<Route path="/home">
        <div style={{backgroundColor:"white",color:"black",marginTop:"10vh"}}>
          Game Page
        </div>
  </Route>*/}
      <Route render={() =>
      <Div100vh>
              <div style={{backgroundColor:"white",position:"fixed",width:"100%",height:"100vh",zIndex:"1000"}}>
                <h1>404: page not found</h1>
                </div>
      </Div100vh>}>
        </Route>
    </Switch>
  </Router>
  </body>

</html>
  );
}

