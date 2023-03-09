import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Card from "../components/Card";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Search = () => {
  const [videos, setVideos] = useState([]);
  const query = useLocation().search;

  useEffect(() => {
    const fetchVideos = () => {

        fetch('http://localhost:8080/videos/search/'+query,{
            method : 'GET',
            credentials : 'include'
        }).then(res => res.json())
        .then(result => {
            console.log(result);
            setVideos(result.videos);
        }).catch(err => console.log(err));
    };
    fetchVideos();
  }, [query]);

  return <Container>
    {videos.map(video=>(
      <Card key={video._id} video={video}/>
    ))}
  </Container>;
};

export default Search;