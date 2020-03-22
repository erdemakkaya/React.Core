import React, { useState, useEffect, Fragment, SyntheticEvent,useContext } from "react";
import { IActivity } from "../models/activtites";
import NavBar from "../features/navbar/NavBar";
import { Container } from "semantic-ui-react";
import  ActivityDashboard  from "../features/activities/dashboard/ActivityDashboard";
import  agent  from "../api/agent";
import LoadingComponent from "./LoadingComponent"
import ActivityStore from "../stores/activityStore";
import {observer} from 'mobx-react-lite';

const App = () => {
 const activityStore = useContext(ActivityStore);
  const [activities, setActivities] = useState<IActivity[]>([]);
 

  const[submitting,setSubtmitting]=useState(false);
  const[target,setTarget]=useState('');
  const handleDeleteActivity=(event:SyntheticEvent<HTMLButtonElement>,id:string)=>{
    setSubtmitting(true);
    setTarget(event.currentTarget.name);
    agent.Activities.delete(id).then(()=>{
      setActivities([...activities.filter(a=>a.id!==id)])
    }).then(()=>setSubtmitting(false));
  }
  useEffect(() => {
    activityStore.loadActivities();
    console.log(activityStore.activities);
  }, [activityStore]);
  if(activityStore.loadingInitial) return <LoadingComponent loading={activityStore.loadingInitial}/>
  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
          target={target}
        />
      </Container>
    </Fragment>
  );
};
export default observer(App);
