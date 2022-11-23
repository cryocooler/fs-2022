import React from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";


type RatingProps = {
  rating: number;

};


const HealthRatingSingle = ({ rating }: RatingProps) => {


  switch (rating) {
    case 1:
        return(
            <div>
                <FavoriteIcon style={{color:"yellow"}}/>
            </div>
        );
    case 2: 
    return (
        <div>
            <FavoriteIcon style = {{color: "red"}}/>
        </div>
    );
    case 3:
        return (
            <div>
                <FavoriteIcon style = {{color: "green"}} />
            </div>
        );
    default: {
        return <FavoriteIcon style = {{color: "green"}} />;
    }
  }
};

export default HealthRatingSingle;
