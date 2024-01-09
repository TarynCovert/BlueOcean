import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  IconButton,
} from '@material-tailwind/react';
import moment from 'moment';
import { setStory } from '../../app/slices/storySlice';

export default function StoryCard({
  story, likeUpdate,
  likedStories,
  setLikeUpdate,
  setLikedStories,
  loggedIn,
  setLoggedIn,
}) {
  const storyId = story.story_id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clickHandler = () => {
    dispatch(setStory(storyId));
    navigate(`/storyBoard/${storyId}`);
    window.scrollTo(0, 0);
  };

  const likeClickHandler = () => {
    if (loggedIn) {
      const data = {
        storyId: story.story_id,
        userId: loggedIn,
      };

      if (likedStories[story.story_id]) {
        axios
          .delete('api/deletelike', { data })
          .then((response) => {
            setLikedStories(response.data);
            setLikeUpdate((prev) => !prev);
          })
          .catch(() => {});
      } else {
        axios
          .post('api/postlike', data)
          .then((response) => {
            setLikedStories(response.data);
            setLikeUpdate((prev) => !prev);
          })
          .catch(() => {});
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <Card className="w-full flex-row p-2 mt-4 shadow-lg justify-between items-center justify-self-center bg-cover" style={{ width: '96%', backgroundImage: `url(${cardBG})`, clipPath: 'polygon(59% 2%, 68% 3%, 74% 0, 83% 2%, 90% 3%, 100% 0, 99% 16%, 100% 37%, 99% 53%, 98% 68%, 100% 100%, 83% 97%, 74% 97%, 63% 100%, 54% 96%, 44% 100%, 37% 98%, 28% 100%, 17% 100%, 7% 96%, 0 100%, 1% 71%, 0 43%, 1% 0, 4% 2%, 18% 0, 31% 3%, 48% 0)' }}>
      <CardHeader floated={false} style={{ margin: '2%' }}>
        <img
          className="h-96 object-contain m-0 relative"
          style={{ height: '200px' }}
          src={story.image_url}
          alt={story.title}
          loading="lazy"
        />
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
      </CardHeader>
      <CardBody className="flex flex-col p-2 self-start" style={{ width: '70%' }}>
        <div className="flex items-center justify-between">
          <Typography variant="h4" color="blue-gray" className="font-medium font-blue-gray font-croissant" style={{ maxWidth: '50vh' }}>
            {story.title}
          </Typography>
          <div className="flex items-center">
            <IconButton
              onClick={likeClickHandler}
              size="sm"
              style={{ color: likedStories[story.story_id] ? '#F9A03F' : 'white' }}
              variant="text"
              className="rounded-full ml-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </IconButton>
            <div className="text-blue-gray">
              {story.like_count}
            </div>
          </div>
        </div>
        <Typography
          style={{
            fontFamily: 'serif',
            fontSize: '18px',
          }}
          color="gray"
          className="font-serif pt-1"
        >
          {moment(story.date_created).format('MMM Do, YYYY')}
        </Typography>
        <Typography color="gray" className="font-serif" style={{ marginRight: '40px', marginBottom: story.summary.length > 500 ? '55px' : '25px' }}>
          {story.summary.length > 500 ? `${story.summary.slice(0, story.summary.lastIndexOf(' ', 480))} ...` : story.summary}
        </Typography>
        <CardFooter className="p-2 self-end absolute" style={{ bottom: '2vh' }}>
          <Button
            size="md"
            onClick={clickHandler}
            fullWidth
            style={{ backgroundImage: `url(${buttonBG})`, backgroundSize: 'auto' }}
            className="font-croissant shadow-gray hover-shadow-sm hover:shadow-black"
          >
            Read Story
          </Button>
        </CardFooter>
      </CardBody>
    </Card>
  );
}

const buttonBG = 'https://res.cloudinary.com/dnr41r1lq/image/upload/v1695320647/button_mljj6c.png';
const cardBG = 'https://res.cloudinary.com/dnr41r1lq/image/upload/v1695235263/paper2_kag1pb.jpg';
