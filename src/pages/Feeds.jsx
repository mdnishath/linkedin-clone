import React from "react";
import ProfileCard from "../components/ProfileCard";
import Container from "../components/Container";
import NewFeed from "../components/Feeds";
import FeedList from "../components/Feeds/FeedList";

const Feeds = () => {
  // Handle new post

  return (
    <div className="py-24">
      <Container>
        <div className="grid gap-4 lg:grid-cols-6">
          <div className="col-span-4">
            <NewFeed />
            <FeedList />
          </div>
          <div className="col-span-2">
            <ProfileCard />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Feeds;
