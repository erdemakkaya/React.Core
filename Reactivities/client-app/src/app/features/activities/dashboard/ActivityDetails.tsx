import React, { useContext, useEffect } from "react";
import {Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import LoadingComponent from "../../../layout/LoadingComponent";
import ActivityDetailedInfo from './details/ActivityDetailedInfo'
import ActivityDetailedHeader from './details/ActivityDetailedHeader'
import ActivityDetailedChat from './details/ActivityDetailedChat'
import ActivityDetailedSideBar from './details/ActivityDetailedSideBar'
import { RootStoreContext } from "../../../stores/rootStore";



interface DetailParams {
  id: string;
}

const ActivityDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match
}) => {
  const rootStore = useContext(RootStoreContext);
  const { activity, loadActivity, loadingInitial } = rootStore.activityStore;

  useEffect(() => {
    loadActivity(match.params.id);
  }, [loadActivity, match.params.id]);

  if (loadingInitial )
    return <LoadingComponent loading={loadingInitial}/>;
    if(!activity)
    return <h1>no activity</h1>

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailedHeader activity={activity} />
        <ActivityDetailedInfo activity={activity} />
        <ActivityDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailedSideBar attendees={activity.attendees} />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDetails);
