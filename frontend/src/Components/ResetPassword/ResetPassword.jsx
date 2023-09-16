import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { resetPassword } from "../../Actions/User";
import "./ResetPassword.css";
import toast from "react-hot-toast";
const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const dispatch = useDispatch();
    const params = useParams();
    const { error, loading, message } = useSelector((state) => state.like);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(resetPassword(params.token, newPassword));
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch({ type: "clearErrors" });
        }
        if (message) {
            toast.success(message);
            dispatch({ type: "clearMessage" });
        }
    }, [ error, dispatch, message]);

    return (
        <div className="resetPassword">
            <form className="resetPasswordForm" onSubmit={submitHandler}>
                <Typography variant="h3" style={{ padding: "2vmax" }}>
                    Social Aap
                </Typography>

                <input
                    type="password"
                    placeholder="New Password"
                    required
                    className="updatePasswordInputs"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />

                <Link to="/">
                    <Typography>Login</Typography>
                </Link>
                <Typography>Or</Typography>

                <Link to="/forgot/password">
                    <Typography>Request Another Token!</Typography>
                </Link>

                <Button disabled={loading} type="submit">
                    Reset Password
                </Button>
            </form>
        </div>
    );
};

export default ResetPassword;
