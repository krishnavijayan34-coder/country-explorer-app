import { Button, Card,CardContent,CardMedia,Typography} from "@mui/material";
import { useNavigate } from "react-router-dom";
import React from "react";
function CountryCard({country,favourites,toggleFav}){
    const navigate =useNavigate();
    return(
        <Card sx={{cursor:"pointer"}}>
            <div onClick={()=>navigate(`/country/${country.name.common}`)}>
            <CardMedia component="img" height="160" image={country.flags.png}
            alt={country.name.common}/>
            <CardContent>
                <Typography variant="h6">{country.name.common}</Typography>
                <Typography variant="body2">Region:{country?.region}</Typography>
                <Typography variant="body2">Population:{country?.population?.toLocaleString()}
                </Typography>
            </CardContent>
            </div>
            <Button onClick={(e)=>{
                e.stopPropagation();
                toggleFav(country.name.common);
            }}>
                {favourites.includes(country.name.common)? "★ Favourite" : "☆ Add"}
            </Button>
        </Card>
        
       
    );

}
export default React.memo(CountryCard);