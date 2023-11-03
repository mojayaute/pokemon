import React from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { changeUserData } from "../redux/userSlice";
import { UserState } from "../interfaces/types";
import Header from "../components/Header";

function Profile() {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: keyof UserState,
  ) => {
    const updatedUserData = {
      ...user,
      [field]: event.target.value || "",
    };

    dispatch(changeUserData(updatedUserData));
  };

  return (
    <>
      <Header />
      <div className="container pt-5">
        <div className="row mb-3">
          <div className="col-md-6">
            <h3>User Profile</h3>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="form-group p-3">
              <label>Full name</label>
              <input
                type="text"
                value={user.full_name || ""}
                className="form-control"
                onChange={(e) => handleChange(e, "full_name")}
                placeholder="Full name"
              />
            </div>
            <div className="form-group p-3">
              <label>Username</label>
              <input
                type="text"
                value={user.username || ""}
                className="form-control"
                onChange={(e) => handleChange(e, "username")}
                placeholder="Username"
              />
            </div>
            <div className="form-group p-3">
              <label>Email</label>
              <input
                type="email"
                value={user.email}
                className="form-control"
                onChange={(e) => handleChange(e, "email")}
                placeholder="Email"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
