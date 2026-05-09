import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDBkOWJjNWEzZGE1NTZmMWEwM2M4MWZlNzliOGM4ZiIsIm5iZiI6MTc3MjAyNTM3MC40ODEsInN1YiI6IjY5OWVmNjFhYjllYjNiZmU4NTA0ZDQxZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FnXLJFLCcKNUFcs6NE_VDJeJdmk2-OKt_tMERXMZoIM'
  }
});


export default instance;
