import React, { useState, useEffect } from "react";
import { Box, Grid } from "@chakra-ui/react";
// Custom components
import Banner from "views/admin/profile/components/Banner";
// Assets
import banner from "assets/img/auth/banner.png";
import avatar from "assets/img/avatars/avatar4.png";
import {
  resetUserDetail,
  getUserDetail,
} from "../../store/userConfigure/userAction";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import AppLoader from "../../components/AppLoader";

export default function ViewUser() {
  const dispatch = useDispatch();
  const params = useParams();
  // const navigate = useNavigate();

  const { userDetails, loader } = useSelector((state) => {
    return {
      userDetails: state.configUserReducer.userDetails,
      loader: state.configUserReducer.loader,
    };
  });

  useEffect(() => {
    if (params.userId) {
      dispatch(getUserDetail(params.userId));
    }

    return () => {
      dispatch(resetUserDetail());
    };
  }, [params.userId]);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Grid gap={{ base: "20px", xl: "20px" }}>
        {!loader && (
          <Banner
            gridArea="1 / 1 / 2 / 2"
            banner={banner}
            avatar={avatar}
            name={userDetails.name}
            job={userDetails.email}
            //   posts="17"
            //   followers="9.7k"
            //   following="274"
          />
        )}
        {loader && <AppLoader/>}
      </Grid>
    </Box>
  );
}
