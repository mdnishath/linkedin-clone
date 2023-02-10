import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";
import { db } from "../firebase";
import { ref, set, push, onValue } from "firebase/database";

// Signup handeling
const signUp = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: "images/profile.png",
      cover: "images/cover.png",
    });
    return auth.currentUser;
  } catch (err) {
    // console.error(err);
    return err;
  }
};

// Login handeling
const login = async (email, password) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    return response;
  } catch (err) {
    return err;
  }
};
//Set data to firebase
const setData = async (obj, location) => {
  console.log(obj);
  const dataRef = ref(db, `${location}`);
  try {
    await set(push(dataRef), obj);
  } catch (error) {
    return error;
  }
};
//Get Data
const getProfile = (user) => {
  const [obj, setObj] = useState({});
  const [loading, setLoading] = useState(false);
  // console.log(user);

  useEffect(() => {
    setLoading(true);
    const profileRef = ref(db, "users/");
    onValue(profileRef, (snapshot) => {
      snapshot.forEach((item) => {
        // console.log(user.uid);
        if (user.uid === item.val().id) {
          setObj({ ...item.val(), key: item.key });
        }
      });
      setLoading(false);
    });
  }, []);

  return { obj, loading };
};
// getSingle user post
const getSingleUserPosts = (user) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  // console.log(user);

  useEffect(() => {
    setLoading(true);
    const profileRef = ref(db, "feeds/");
    onValue(profileRef, (snapshot) => {
      const arr = [];
      snapshot.forEach((item) => {
        // console.log(user.uid);
        if (user.uid === item.val().uid) {
          arr.push({ ...item.val(), key: item.key });
        }
      });
      setPosts(arr);
      setLoading(false);
    });
  }, []);

  return { posts, loading };
};

// getSingle user post
const getAllExperience = (user) => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(false);
  // console.log(user);

  useEffect(() => {
    setLoading(true);
    const profileRef = ref(db, "experience/");
    onValue(profileRef, (snapshot) => {
      const arr = [];
      snapshot.forEach((item) => {
        // console.log(user.uid);
        if (user.uid === item.val().uid) {
          arr.push({ ...item.val(), key: item.key });
        }
      });
      setExperiences(arr);
      setLoading(false);
    });
  }, []);

  return { experiences, loading };
};
// getSingle user post
const getrequest = (user) => {
  const [obj, setObj] = useState([]);
  const [loading, setLoading] = useState(false);
  // console.log(user);

  useEffect(() => {
    setLoading(true);
    const profileRef = ref(db, "fqrList/");
    onValue(profileRef, (snapshot) => {
      const arr = [];
      snapshot.forEach((item) => {
        // console.log(user.uid);
        if (
          user.uid + item.val().id === item.val().requestID ||
          item.val().id + user.uid
        ) {
          arr.push({ ...item.val(), key: item.key });
        }
      });
      setObj(arr);
      setLoading(false);
    });
  }, []);

  return { obj, loading };
};
//Get Data
const getAllProfile = (user) => {
  const [obj, setObj] = useState([]);
  const [loading, setLoading] = useState(false);
  // console.log(user);

  useEffect(() => {
    setLoading(true);
    const profileRef = ref(db, "users/");
    onValue(profileRef, (snapshot) => {
      const arr = [];
      snapshot.forEach((item) => {
        // console.log(user.uid);

        arr.push({ ...item.val(), key: item.key });
      });
      setObj(arr);
      setLoading(false);
    });
  }, []);

  return { obj, loading };
};
//Get Feeds
const getFeeds = (user) => {
  const [feeds, setFeeds] = useState([]);
  const [feedLoading, setFeedLoading] = useState(false);
  // console.log(user);

  useEffect(() => {
    setFeedLoading(true);
    const profileRef = ref(db, "feeds/");
    onValue(profileRef, (snapshot) => {
      const arr = [];
      snapshot.forEach((item) => {
        // console.log(user.uid);
        arr.push({ ...item.val(), key: item.key });
      });
      setFeeds(arr);
      setFeedLoading(false);
    });
  }, []);

  return { feeds, feedLoading };
};
// Get Projects
const getProjects = (user) => {
  // console.log(user);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  // console.log(user);

  useEffect(() => {
    setLoading(true);
    const projectsRef = ref(db, "projects/");
    onValue(projectsRef, (snapshot) => {
      const arr = [];
      snapshot.forEach((item) => {
        // console.log(item.val());
        if (user.uid === item.val().uid) {
          arr.push({ ...item.val(), key: item.key });
        }
      });
      setProjects(arr);
      setLoading(false);
    });
  }, []);

  return { projects, loading };
};

// Logout auth
const logout = () => {
  signOut(auth);
};

export {
  signUp,
  login,
  logout,
  setData,
  getProfile,
  getProjects,
  getFeeds,
  getAllProfile,
  getSingleUserPosts,
  getAllExperience,
  getrequest,
};
