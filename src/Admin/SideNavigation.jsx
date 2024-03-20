import React from 'react';
import { Link } from 'react-router-dom';
import SidebarItems from './SidebarItems';
//import the sidebar items json files 
import mainItems from './SidebarTrunk/mainSidebarItems.json';
import bakeryItems from './SidebarTrunk/bakerySidebarItems.json';
import gimanhalaItems from './SidebarTrunk/gimanhalaSidebarItems.json';
//import all react font awesome icons




function SideNavigation(props) {
    const type = props.sidebarType;


  if(type == 'main'){
    return(
      <div>
        {mainItems.map((item, index) => <SidebarItems key={index} item ={item} />)}
      </div>
    )
  }
  else if(type == 'bakery'){
    return(
      <div>
        {bakeryItems.map((item, index) => <SidebarItems key={index} item ={item} />)}
      </div>
    )
  }
  else if(type == 'gimanhala'){
    return(
      <div>
        {gimanhalaItems.map((item, index) => <SidebarItems key={index} item ={item} />)}
      </div>
    )
  }
}

export default SideNavigation