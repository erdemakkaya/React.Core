import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ActivityList  from "./ActivityList";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../layout/LoadingComponent";
import { RootStoreContext } from "../../../stores/rootStore";


 const ActivityDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadActivities,loadingInitial} = rootStore.activityStore;
  useEffect(() => {
    loadActivities();
  }, [loadActivities]);
  if(loadingInitial) return <LoadingComponent loading={loadingInitial}/>
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList/>
      </Grid.Column>
      <Grid.Column width={6}>
       <h2>Activity Filters</h2>
      </Grid.Column>
    </Grid>
  );
};
export default observer(ActivityDashboard);