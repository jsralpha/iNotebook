import React from "react";

function Alert(props) {
    const capitalize = (word)=>{
        if(word === "danger"){
            word = "Error"
        }
        const lower = word.toLowerCase();
        return word.charAt(0).toUpperCase() + lower.slice(1);
    }

  return (
    <div>
      <div style={{height:"50px"}} >
        {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fase show fixed-top`} role = "alert" >
            <strong>{capitalize(props.alert.type)}</strong>: {props.alert.message}
            </div>}
      </div>
    </div>
  );
}

export default Alert;
