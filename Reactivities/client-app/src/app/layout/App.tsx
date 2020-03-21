import React, { useState, useEffect, Fragment, SyntheticEvent } from "react";
import { IActivity } from "../models/activtites";
import NavBar from "../features/navbar/NavBar";
import { Container } from "semantic-ui-react";
import { ActivityDashboard } from "../features/activities/dashboard/ActivityDashboard";
import  agent  from "../api/agent";
import LoadingComponent from "./LoadingComponent"


const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity|null>(null
  );
  const handleSelectActivity = (id:string ) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0]);
    setEditMode(false);
  };
  const[editMode,setEditMode]=useState(false);
  const[loading,setLoading]=useState(true);
  const[submitting,setSubtmitting]=useState(false);
  const[target,setTarget]=useState('');


  const handleOpenCrateForm=()=>{
    setSelectedActivity(null);
    setEditMode(true);
  }
  const handleCreateActivity=(activity:IActivity)=>{
    setSubtmitting(true);
    agent.Activities.create(activity).then(()=>{
      setActivities([...activities,activity])
      setSelectedActivity(activity);
    setEditMode(false);
    }).then(()=>setSubtmitting(false));
  }
  const handleEditActivity=(activtiy:IActivity)=>{
    setSubtmitting(true);
    agent.Activities.update(activtiy).then(()=>{
      setActivities([...activities,activtiy])
      setSelectedActivity(activtiy);
    setEditMode(false);
    })
  }
  const handleDeleteActivity=(event:SyntheticEvent<HTMLButtonElement>,id:string)=>{
    setSubtmitting(true);
    setTarget(event.currentTarget.name);
    agent.Activities.delete(id).then(()=>{
      setActivities([...activities.filter(a=>a.id!==id)])
    }).then(()=>setSubtmitting(false));
  }
  useEffect(() => {
      agent.Activities.list()
      .then(response => {
        let activities:IActivity[]=[];
        response.forEach((activity)=>{
          activity.date=activity.date.split('.')[0];
          activities.push(activity);
        })
        setActivities(activities);
      }).then(()=>setLoading(false));
  }, []);
  if(loading) return <LoadingComponent loading={loading}/>
  return (
    <Fragment>
      <NavBar openCreateForm={handleOpenCrateForm} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          selectedActivity={selectedActivity!}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
          target={target}
        />
      </Container>
    </Fragment>
  );
};
export default App;
