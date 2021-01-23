import React from "react";

function Header(props){
  return(
    <div className='header'>
      gov10
      <div style={{color: 'grey', paddingTop: '10px'}}>
        {props.title}
      </div>
    </div>
    )
}

export default Header;