import React, {Fragment, useContext, useEffect } from "react";
import NavBar from "../features/navbar/NavBar";
import { Container } from "semantic-ui-react";
import  ActivityDashboard  from "../features/activities/dashboard/ActivityDashboard";
import {observer} from 'mobx-react-lite';
import { Route,withRouter, RouteComponentProps, Switch } from "react-router-dom";
import HomePage from "../features/Home/HomePage"
import ActivityForm from "../features/activities/form/ActivityForm";
import ActivityDetails from "../features/activities/dashboard/ActivityDetails";
import NotFound from "../layout/NotFound";
import {ToastContainer} from "react-toastify";
import LoginForm from "../features/user/LoginForm";
import { RootStoreContext } from "../stores/rootStore";
import LoadingComponent from "./LoadingComponent";
import ModalContainer from "../common/modals/ModalContainer";





const App:React.FC<RouteComponentProps> = ({location}) => {
  const rootStore=useContext(RootStoreContext);
  const{setAppLoaded,token,appLoaded}=rootStore.commonStore;
  const{getUser}=rootStore.userStore;

  useEffect(() => {
    if(token){
      getUser().finally(()=>setAppLoaded())
    }else{
setAppLoaded();
    }   
  }, [getUser,setAppLoaded,token])

if(!appLoaded) return <LoadingComponent loading={!appLoaded}/>
  return (
    <Fragment>
      <ModalContainer/>
      <ToastContainer position='bottom-right'/>
        <Route  exact path='/' component={HomePage} />
        <Route  exact path={'/(.+)'} render={()=>(
          <Fragment>
  <NavBar />
  <Container style={{ marginTop: "7em" }}>
    <Switch>
    <Route exact path='/activities' component={ActivityDashboard} />
    <Route path='/activities/:id' component={ActivityDetails} />
    <Route key={location.key} path={['/createActivity','/manage/:id']} component={ActivityForm} />
    <Route exact path='/login' component={LoginForm} />
     <Route component={NotFound}/>     
     </Switch>
  </Container>
  </Fragment>
        )} />

    
    </Fragment>
  );
};
export default withRouter(observer(App));
