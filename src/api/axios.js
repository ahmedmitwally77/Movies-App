import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    "Content-Type": "application/json",
    "Authorization": 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOGYwYjA3YmJiOGVhYmJhN2JkYWIwYWY3NjZkYzRkNCIsIm5iZiI6MTcyODIxODc1MS43OTY1MSwic3ViIjoiNjVlYzc0NWEzMDgxMzEwMTgzNGQyODQxIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.VbzcySwlO4Gq0d7ZTh3e2mSkoACLIgC32OXatut07Cc'
  },
  withCredentials: false,
});

export default axiosInstance;
