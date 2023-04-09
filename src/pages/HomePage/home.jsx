import * as React from "react";
import "../../Components/PostCompoents/posts.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./../../App.css";
import NavBar from "../../Components/NavBar/navBar";
import Post from "../../Components/PostCompoents/post";
import axios from "axios";
import CreatePost from "../../Components/PostCompoents/createPost";
import jwt from "jwt-decode";
import ScrollButton from "../../Components/scrollFloatingButton";
import { Grid } from "@mui/material";
import Footer from "../../Components/footer";

export default function Home() {
  const [postData, setPostData] = React.useState([]);

  const [UserData, setUserData] = React.useState([]);

  const [getAllPosts, setgetAllPosts] = React.useState(false);
  const handlegetAllPosts = () => setgetAllPosts((show) => !show);

  const [getUserData, setgetUserData] = React.useState(false);
  const handlegetUserData = () => setgetUserData((show) => !show);

  const [UserId, setUserId] = React.useState([]);

  React.useEffect(() => {
    async function getPosts() {
      const { data } = await axios.get(
        "https://blogservice-tvsr.onrender.com/post"
      );
      console.log(data);

      setPostData(data);
    }

    getPosts();
    return () => {
      console.log("effect clean get posts");
    };
  }, [getAllPosts, getUserData]);

  React.useEffect(() => {
    let token = localStorage.getItem("token");
    const decodeToken = jwt(token);
    setUserId(decodeToken._id);

    async function getUserByToken() {
      const { data } = await axios.get(
        "https://blogservice-tvsr.onrender.com/user/myAccount",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(data.user);

      setUserData(data.user);
    }

    return () => {
      getUserByToken();
      console.log("effect clean get User By Token");
    };
  }, [getUserData]);

  return (
    <>
      <div className="bg-light pb-0">
        <div className="navBg">
          <NavBar
            profileImage={UserData.profileImg}
            userName={UserData.userName}
            handlegetUserData={handlegetUserData}
          />
        </div>
        <Grid
          container
          justifyContent="center"
          className="home-Bg mt-5 pt-5 pb-5"
        >
          <Grid item lg={4} md={7} sm={8} xs={10}>
            <div className=" mb-1 mt-4  d-flex justify-content-center">
              {/* <img
                src="https://readme-typing-svg.demolab.com?font=Alkatra&size=30&pause=700&color=F7F7F7&center=true&multiline=true&repeat=false&width=435&lines=Welcome+to+the+Blogging+Site;++++"
                alt="Typing SVG"
              /> */}

              <img
                src="https://readme-typing-svg.demolab.com?font=Dancing+Script&size=31&pause=700&color=F7F7F7&center=true&vCenter=true&multiline=true&repeat=false&width=435&lines=Welcome+to+the+Blogging+Site"
                alt="Typing SVG"
              />
            </div>

            <CreatePost
              profileImg={UserData.profileImg}
              userName={UserData.userName}
              handlegetAllPosts={handlegetAllPosts}
            />
          </Grid>
        </Grid>

        <Grid
          container
          justifyContent="center"
          className="home-Bg mt-5"
          spacing={3}
        >
          {postData.length === 0 ? (
            <Grid item lg={4} md={7} sm={8} xs={12}>
              <div className="my-5 mx-auto px-auto ">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/blog-5addf.appspot.com/o/images%2Fc6b872fe-93c5-4d84-b867-d72aa4ba75ce-noPosts1.svg?alt=media&token=0fad5161-cd1b-4f77-832b-3bf28338dd77"
                  className="w-50 d-flex mx-auto "
                ></img>
                <h3 className="text-muted text-center mb-5 pb-5">
                  No posts yet!
                </h3>
              </div>
            </Grid>
          ) : (
            postData.map((data) => (
              <Grid item lg={3.01} md={7} sm={5} xs={11.5} key={data._id}>
                <Post
                  userName={data.userId.userName}
                  profileImg={data.userId.profileImg}
                  Title={data.Title}
                  postImg={data.postImg}
                  content={data.content}
                  createdDate={data.createdDate}
                  postOwnerId={data.userId._id}
                  postId={data._id}
                  handlegetAllPosts={handlegetAllPosts}
                  UserId={UserId}
                />
              </Grid>
            ))
          )}
        </Grid>
        <ScrollButton></ScrollButton>
        <Footer></Footer>
      </div>
    </>
  );
}
