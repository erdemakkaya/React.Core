import React, {useEffect, Fragment,useContext } from "react";
import NavBar from "../features/navbar/NavBar";
import { Container } from "semantic-ui-react";
import  ActivityDashboard  from "../features/activities/dashboard/ActivityDashboard";
import LoadingComponent from "./LoadingComponent"
import ActivityStore from "../stores/activityStore";
import {observer} from 'mobx-react-lite';
import { Route } from "react-router-dom";
import HomePage from "../features/Home/HomePage"

const App = () => {
 const activityStore = useContext(ActivityStore);
  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);
  if(activityStore.loadingInitial) return <LoadingComponent loading={activityStore.loadingInitial}/>
  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <Route path='/' component={HomePage} />
      </Container>
    </Fragment>
  );
};
export default observer(App);
