---
title: Publishing meetings as podcasts
weight: 40
---

# FAQ 

## Publishing recorded meetings as podcasts on AsyncAPI
This document covers FAQs on publishing recorded AsyncAPI meetings as podcasts. It is intended to guide any AsyncAPI member who has the rights/access to stream and record meetings; on how to publish the recorded meetings as podcasts. For more information on streaming and recording meetings, check the [Meetings-Organization](https://www.asyncapi.com/docs/community/060-meetings-and-communication/MEETINGS_ORGANIZATION) document.

### Why do we need this feature?

- Some people prefer to listen to the video/livestream as an audio (podcast) instead of watching the video.

- The goal is to upload our AsyncAPI video/live streams on `Spotify For Podcasters`, ultimately allowing the listener to play the episodes on Spotify. Almost every YouTube video can be converted into a podcast.


### Who can upload the videos?

- Anyone with write access to the `asyncapi/community` repository’s `master` branch.

### What is needed?

- The YouTube video ID.


<Remember>

**What is YouTube video ID?**

The video ID is an 11-character alphanumeric string that uniquely identifies a YouTube video.

ID is usually the last part of the URL after `v=` or separated by a forward slash (`/`):

- https://www.youtube.com/watch?v=VIDEO_ID
- https://www.youtu.be/VIDEO_ID
- https://www.youtube.com/shorts/VIDEO_ID
- https://www.youtube.com/embed/VIDEO_ID

You may also find URLs with a video in a playlist: `https://www.youtube.com/watch?v=VIDEO_ID&list=PLAYLIST_ID`

Here, video ID is located between `?v=` and `&list=` URL parameters.

**This workflow accepts only the YouTube *video ID*, not a full URL or playlist. You need to extract the `VIDEO_ID` and provide it as an input.**
</Remember>


### Step-by-step procedure

1. Open the [Upload Episode from YouTube To Spotify for Podcasters actions workflow](https://github.com/asyncapi/community/actions/workflows/youtube-to-spotify-for-podcasters.yml) in the community repository
2. Click on the `Run Workflow` button.
3. Provide the YouTube ID in the box.
4. Click on `Run workflow` button. 
5. Wait for the workflow to finish (It may take some time to upload the video).

(Optional) You can modify the description and other information for the uploaded podcast directly in Spotify:
1. Go to https://creators.spotify.com/.
2. Login using AsyncAPI account.
3. Go to the 'Episodes' section to see your latest upload.
4. Perform edits and save them.
