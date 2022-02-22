/**
 * Application configuration
 */
import data from "./public/data/data.json";

// Toolbar

export const getData = async () => {
  let eventsData = [];
  let resourcesData = [];
  let dependencyData = [];
  for (let i = 0; i < data.length; i++) {
    let item = data[i];
    let resource_tmp = {
      id: item.workcenter,
      workcenter: item.workcenter,
    };
    resourcesData.push(resource_tmp);
    resource_tmp = null;
    for (let j = 0; j < data[i].lines.length; j++) {
      let tmp_event = {
        id: item.workcenter + item.lines[j].itemno,
        resourceId: item.workcenter,
        name: `${item.lines[j].prodordernoline} - ${item.lines[j].itemno} -${item.lines[j].quantityline}${item.lines[j].uomline}`,
        startDate: item.lines[j].startingdatetimeline,
        endDate: item.lines[j].endingdatetimeline,
        eventType: "Meeting",
        iconCls: "b-fa b-fa-exclamation-circle",
      };
      eventsData.push(tmp_event);
      tmp_event = null;
      if (
        item.lines[j].fromworkcenter &&
        item.lines[j].fromSide &&
        item.lines[j].fromitemno
      ) {
        dependencyData.push({
          id: item.workcenter + item.lines[j].itemno + item.lines[j].fromitemno,
          fromEvent: item.lines[j].fromworkcenter + item.lines[j].fromitemno,
          toEvent: item.workcenter + item.lines[j].itemno,
          fromSide: item.lines[j].fromSide,
        });
      }
    }
    item = null;
  }
  console.log("resourcesData=", resourcesData);
  console.log("eventsData=", eventsData);
  return {
    eventsData: eventsData,
    resourcesData: resourcesData,
    dependencyData: dependencyData,
  };
};
