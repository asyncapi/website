import { mount } from '@cypress/react'
import YouTubeCard from '../../../components/newsroom/YouTubeCard'

const video = {
    "image_url": "https://i.ytimg.com/vi/EvC2PZXEM0M/hqdefault.jpg",
    "title": "Community Meeting, Tuesday June 27th 2023",
    "description": "https://github.com/asyncapi/community/issues/762.",
    "videoId": "EvC2PZXEM0M"
}

describe('Youtube Card Component', () => {
    it('renders without errors', () => {
        mount(<YouTubeCard video={ video } />);
        cy.get('[data-testid="YoutubeCard-main"]').contains(video.title);
        cy.get('[data-testid="YoutubeCard-main"]').contains(video.description);
    });
});