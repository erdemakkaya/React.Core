import React, { useContext } from "react";
import { Item, Button, Segment, Icon, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { IActivity } from "../../../models/activtites";
import { format } from "date-fns";
import { RootStoreContext } from "../../../stores/rootStore";
import { ActivityListItemAttendees } from "./ActivityListItemAttendees";

const ActivitiyListItem: React.FC<{ activity: IActivity }> = ({ activity }) => {
  const host=activity.attendees.filter(x=>x.isHost)[0];
  const rootStore = useContext(RootStoreContext);
  const { deleteActivity, submitting, target } = rootStore.activityStore;
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src="/assets/user.png" />
            <Item.Content>
              <Item.Header as={Link} to={`activities/${activity.id}`}>{activity.title}</Item.Header>
  <Item.Description>Hosted By {host.displayName}</Item.Description>
              {activity.isHost && (
                <Item.Description>
                  <Label
                    basic
                    color="orange"
                    content="You are hosting this activty"
                  />
                </Item.Description>
              )}
               {activity.isGoing &&activity.isHost&& (
                <Item.Description>
                  <Label
                    basic
                    color="green"
                    content="You are going to this activty"
                  />
                </Item.Description>
              )}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <Icon name="clock" /> {format(activity.date, "h:mm a")}
        <Icon name="marker" /> {activity.venue}, {activity.city}
      </Segment>
      <Segment secondary>
        <ActivityListItemAttendees attendees={activity.attendees} />
      </Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button
          as={Link}
          to={`/activities/${activity.id}`}
          floated="right"
          content="View"
          color="blue"
        />
        <Button
          name={activity.id}
          loading={target === activity.id && submitting}
          onClick={(e) => deleteActivity(e, activity.id)}
          floated="right"
          content="Delete"
          color="red"
        />
      </Segment>
    </Segment.Group>
  );
};
export default ActivitiyListItem;
