import { Button, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchUsers } from "../../Actions/User";
import User from "../User/User";
import "./Search.css";

const Search = () => {
  const [name, setName] = React.useState("");

  const { user, loading } = useSelector((state) => state.searchUser); // change this line
  console.log(user);
  
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(searchUsers(name));
  };
  console.log(name);
  return (
    <div className="search">
      <form className="searchForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social Aap
        </Typography>

        <input
          type="text"
          value={name}
          placeholder="Name"
          required
          onChange={(e) => setName(e.target.value)}
        />

        <Button disabled={loading} type="submit">
          Search
        </Button>

        <div className="searchResults">
          {user &&
            user.map((i) => (
              <User
                key={i._id}
                userId={i._id}
                name={i.name}
                avatar={i.avatar.url}
              />
            ))}
        </div>
      </form>
    </div>
  );
};

export default Search;
