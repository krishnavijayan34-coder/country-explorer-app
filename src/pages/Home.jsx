import {useEffect,useState,useCallback ,useContext} from "react";
import axios from "axios";
import{Box, TextField, MenuItem, Grid, Container, Typography,CircularProgress} from "@mui/material"
import CountryCard from "../components/CountryCard";
import { ApiContext } from "../api/ApiContext";

function Home(){
    const [countries,setCountries]=useState([]);
    const [search,setSearch]=useState("");
    const [region,setRegion]=useState("");
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState("");
    const [favourites,Setfavourites]=useState(
        JSON.parse(localStorage.getItem("fav")) || []
    );
    const BASE_URL = useContext(ApiContext);
    useEffect(()=>{
        fetchCountries();
    },[]);
    
    const fetchCountries=async()=>{
        try{
        const response =await axios.get(`${BASE_URL}/all?fields=name,flags,population,region`);
        setCountries(response.data);
        }catch(err){
            setError("Failed to load countries ")
        } finally {
            setLoading(false);
        }
    };

    const toggleFav =useCallback((name)=>{
        let updated =favourites.includes(name)? favourites.filter((c)=>c!==name):[...favourites,name];
        Setfavourites(updated);
        localStorage.setItem("fav",JSON.stringify(updated));
    },[favourites]);
    
    const filteredCountries=countries.filter((country)=>{
        const matchSearch=country.name.common
        .toLowerCase().includes(search.toLowerCase());
        const matchRegion =region===""||country.region===region;
        return matchSearch && matchRegion;
    });
    if (loading) return <CircularProgress sx={{m:5}}/>;
    if (error) return <Typography>{error}</Typography> ;
        return(
            <Container>
                <Typography variant="h4" sx={{my:3}}>Country Explorer</Typography>
                <Box display="flex" gap={2} mb={3}>
                    <TextField label="Search Country" value={search} onChange={(e)=>
                        setSearch(e.target.value)} fullWidth/>
                    <TextField select label="Region" value={region}
                    onChange={(e)=>setRegion(e.target.value)} fullWidth>
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="Asia">Asia</MenuItem>
                        <MenuItem value="Europe">Europe</MenuItem>
                        <MenuItem value="Americas">Americas</MenuItem>
                        <MenuItem value="Africa">Africa</MenuItem>
                        </TextField>
                    
                </Box>
                <Grid container spacing={2}>
                    {filteredCountries.map((country)=>(
                        <Grid  xs={12} sm={6} md={4} key={country?.name?.common}>
                            <CountryCard country={country} favourites={favourites} toggleFav={toggleFav}/>
                            </Grid>
                    ))}

                </Grid>

            </Container>
        );
    }
    export default Home;