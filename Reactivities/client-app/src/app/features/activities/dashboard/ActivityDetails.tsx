import React, { useContext, useEffect } from "react";
import {Grid } from "semantic-ui-react";
import ActivityStore from "../../../stores/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import LoadingComponent from "../../../layout/LoadingComponent";
import ActivityDetailedInfo from './details/ActivityDetailedInfo'
import ActivityDetailedHeader from './details/ActivityDetailedHeader'
import ActivityDetailedChat from './details/ActivityDetailedChat'
import ActivityDetailedSideBar from './details/ActivityDetailedSideBar'



interface DetailParams {
  id: string;
}

const ActivityDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match
}) => {
  const activityStore = useContext(ActivityStore);
  const { activity, loadActivity, loadingInitial } = activityStore;

  useEffect(() => {
    loadActivity(match.params.id);
  }, [loadActivity, match.params.id]);

  if (loadingInitial || !activity)
    return <LoadingComponent loading={loadingInitial}/>;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailedHeader activity={activity} />
        <ActivityDetailedInfo activity={activity} />
        <ActivityDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailedSideBar />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDetails);
