import React,{useEffect,useState} from 'react';
import {Navbar} from "./components/Navbar.jsx"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {GamePage} from "./components/GamePage.jsx"
import "./App.css"
import { ScrollSnap } from './components/ScrollSnap.jsx';
import { Menu } from './components/Menu.jsx';
import Div100vh from 'react-div-100vh'
import { useFirebase } from 'react-redux-firebase';

export const App = (props) => {

  let [forceStateChange,SetStateChange] = useState(1);
  var Cookie = require('js-cookie');
  const firebase = useFirebase();

  const returnPage = () =>{
    if(Cookie.get("LoggedIn")=='true'){
      return (<GamePage firebase={firebase} forceStateChange={forceStateChange} SetStateChange={SetStateChange}>

      </GamePage>
      )
    }
    else{
      return (
        <ScrollSnap forceStateChange={forceStateChange} SetStateChange={SetStateChange}></ScrollSnap>
      )
    }
  }

  firebase.auth().onAuthStateChanged((user)=>{
    if(user){
      if(Cookie.get("LoggedIn")!='true'){
        console.log("Ran event listener")
          Cookie.set("LoggedIn","true");
      }
    }
    else{
      if(Cookie.get("LoggedIn")=='true'){
        Cookie.set("LoggedIn","false");
    }
    }
  })

  useEffect(() => {
      console.log("s")
      console.log("Ran");
  }, [])

  return (
<html>

  <head>
    <link rel="stylesheet" href="https://use.typekit.net/bfk1sru.css"/>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.2.6/gsap.js" integrity="sha256-mfgvzVjyIcoXo0ElsT8uFIuDWYkvKCQ6wrkm6If7iug=" crossOrigin="anonymous"></script>
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

