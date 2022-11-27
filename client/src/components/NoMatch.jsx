import React from "react";
import Button from '@mui/material/Button';
export const NoMatch =()=>{
    return(
        <div>
            <p> Sorry! No more matches left. You can reset the list by clicking the below button.</p>
            <div>
            <Button color={"primary"} variant="contained">Reset</Button>
            </div>
        </div>
    )
}
