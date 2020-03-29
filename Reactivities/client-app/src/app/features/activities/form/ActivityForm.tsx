import React, { useState, FormEvent,useContext,useEffect } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IActivity } from "../../../models/activtites";
import {v4 as uuid} from 'uuid'
import { observer } from "mobx-react-lite";
import ActivityStore from "../../../stores/activityStore"
import { RouteComponentProps } from "react-router-dom";

interface DetailParams{
  id:string;
}
 const ActivityForm: React.FC<RouteComponentProps<DetailParams>> =({match,history})=>  {
  const activityStore = useContext(ActivityStore);
  const {createActivity,editActivity,submitting,activity:initialFormState,loadActivity,clearActivity} = activityStore;



  const [activity, setActivity] = useState<IActivity>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: ""
  });
  useEffect(() => {
    if(match.params.id && activity.id.length === 0){
    loadActivity(match.params.id)
    .then(()=>initialFormState&&setActivity(initialFormState));
    }
    return()=>{
      clearActivity();
    }
  }, [loadActivity,clearActivity,match.params.id,initialFormState,activity.id.length])
  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget; //event target içindeki const ve  value ye ulaştık bu şekilde kod sadeliği elde etmiş olduk
    setActivity({ ...activity, [name]: value }); //name alanı ile textboxdaki name değerini alarak dinamik bir set mekanizması kurduk ve tüm txtboxlara name vererek kullanabiliriz
  };
  const handleSubmit = () => {
   if(activity.id.length===0){
     let newActivity={
       ...activity,
       id:uuid()
     }
     createActivity(newActivity).then(()=>history.push(`/activities/${newActivity.id}`));
   }
   else{
     editActivity(activity).then(()=>history.push(`/activities/${activity.id}`));
   }
  };
  return (
    <Segment clearing>
      <Form>
        <Form.Input
          onChange={handleInputChange}
          name="title"
          placeholder="Title"
          value={activity.title}
        />
        <Form.Input
          onChange={handleInputChange}
          name="category"
          placeholder="Category"
          value={activity.category}
        />
        <Form.TextArea
          onChange={handleInputChange}
          name="description"
          rows={2}
          placeholder="Description"
          value={activity.description}
        />
        <Form.Input
          onChange={handleInputChange}
          name="date"
          type="datetime-local"
          placeholder="Date"
          value={activity.date}
        />
        <Form.Input
          onChange={handleInputChange}
          name="city"
          placeholder="City"
          value={activity.city}
        />
        <Form.Input onChange={handleInputChange}
          name="venue" placeholder="Venue" value={activity.venue} />
        <Button loading={submitting}
          onClick={handleSubmit}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button
          onClick={()=>history.push('/activities')}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};
export default observer(ActivityForm);
