import { useEffect,useState } from "react";
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";
import { Container,Typography,Button } from "@mui/material";

function CountryDetail(){
    const {name}=useParams();
    const navigate = useNavigate();
    const [country,setCountry]=useState(null);
    useEffect(()=>{
        
       axios.get(`https://restcountries.com/v3.1/name/${name}`)
        .then((res)=>setCountry(res.data[0]))
        .catch((err)=>console.log(err));
        
    },[name]);
    if (!country) return <Typography>Loading...</Typography>;
    return(
        <Container>
            <Button variant="contained" onClick={()=>navigate(-1)}>
              Back
            </Button>
            <img src={country?.flags?.png} width="200"/>
            <Typography variant="h4">{country.name.common}</Typography>
            <Typography>
                Capital:{country.capital?.[0]}
            </Typography>
            <Typography>Region:{country.region}</Typography>
            <Typography>Population:{country.population}</Typography>
            <Typography>Languages:{Object.values(country.languages || {}).join(",")}
            </Typography>
            <Typography>Currencies:{Object.keys(country.currencies || {}).join(",")}
            </Typography>
        </Container>
    );
}
export default  CountryDetail;