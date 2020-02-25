import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { IActivity } from "../models/activtites";
import NavBar from "../features/navbar/NavBar";
import { Container, List } from "semantic-ui-react";
import { ActivityDashboard } from "../features/activities/dashboard/ActivityDashboard";

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity|null>(null
  );
  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0]);
  };
  const[editMode,setEditMode]=useState(false);

  const handleOpenCrateForm=()=>{
    setSelectedActivity(null);
    setEditMode(true);
  }
  useEffect(() => {
    axios
      .get<IActivity[]>("http://localhost:5000/api/activities")
      .then(response => {
        setActivities(response.data);
      });
  }, []);
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
        />
      </Container>
    </Fragment>
  );
};
export default App;