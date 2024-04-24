import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as Fa6Icons from 'react-icons/fa6';
import * as RiIcons from 'react-icons/pi';
import * as PiIcons from 'react-icons/ri';
import * as MdIcons from 'react-icons/md';
import * as BiIcons from 'react-icons/bi';

function SidebarItems({ item }) {
    const [submenuOpen, setSubmenuOpen] = useState(false);
    let IconComponent = null;

    if (FaIcons[item.icon]) {
        IconComponent = FaIcons[item.icon];
    }
    else if(RiIcons[item.icon]){
        IconComponent = RiIcons[item.icon];
    }
    else if(PiIcons[item.icon]){
        IconComponent = PiIcons[item.icon];
    }
    else if(MdIcons[item.icon]){
        IconComponent = MdIcons[item.icon];
    }
    else if(BiIcons[item.icon]){
        IconComponent = BiIcons[item.icon];
    }
    else if(Fa6Icons[item.icon]){
        IconComponent = Fa6Icons[item.icon];
    }

    const menuHandle = () => {
        setSubmenuOpen(!submenuOpen);
    };
    if(item.childrens){
        return (
            <div className="">
                <div className="mainMenuItem flex cursor-pointer" onClick={menuHandle}>
                    <div className="menuitem">
                        {IconComponent && <IconComponent className="subMenuIcon" />}
                        {item.title}
                    </div>
                    <div className="mr-[5px] mt-[15px] text-white ml-auto  " onClick={menuHandle}>
                        <FaIcons.FaAngleDown className={submenuOpen ? 'transform rotate-180' : 'transform rotate-0'} />
                    </div>
                </div>
    
                {submenuOpen && item.childrens && (
                    <div className="pl-6">
                        {item.childrens.map((subitem, index) => (
                            <SidebarItems key={index} item={subitem} />
                        ))}
                    </div>
                )}
            </div>
        );
    }
    else {
        return (
            <Link to={item.path || "#"} className=''>
                <div className={item.type === 'directLink' ? 'mainMenuItem menuitem' : 'submenuitem'}>
                    {IconComponent && <IconComponent className='subMenuIcon' />}
                    {item.title}
                </div>
            </Link>
        );
    }
    
}

export default SidebarItems;
