import { addAdditionalUserInfo } from '../../../utils/ambassadors';
import type { Ambassador } from '../../../types/pages/community/Community';

describe('addAdditionalUserInfo', () => {
  describe('GitHub URL handling', () => {
    it('should create githubUrl when github field exists', () => {
      const ambassador: Ambassador = {
        name: 'Test User',
        img: '',
        bio: 'Test bio',
        title: 'Developer',
        github: 'testuser',
        twitter: '',
        linkedin: '',
        company: 'Test Company',
        contributions: []
      };

      const result = addAdditionalUserInfo(ambassador);

      expect(result.githubUrl).toBe('https://www.github.com/testuser');
    });

    it('should not create githubUrl when github field is empty string', () => {
      const ambassador: Ambassador = {
        name: 'Test User',
        img: '',
        bio: 'Test bio',
        title: 'Developer',
        github: '',
        twitter: '',
        linkedin: '',
        company: 'Test Company',
        contributions: []
      };

      const result = addAdditionalUserInfo(ambassador);

      expect(result.githubUrl).toBeUndefined();
    });

    it('should not create githubUrl when github field is undefined', () => {
      const ambassador: Ambassador = {
        name: 'Test User',
        img: '',
        bio: 'Test bio',
        title: 'Developer',
        github: undefined as any,
        twitter: '',
        linkedin: '',
        company: 'Test Company',
        contributions: []
      };

      const result = addAdditionalUserInfo(ambassador);

      expect(result.githubUrl).toBeUndefined();
    });
  });

  describe('Twitter URL handling', () => {
    it('should create twitterUrl when twitter field exists', () => {
      const ambassador: Ambassador = {
        name: 'Test User',
        img: '',
        bio: 'Test bio',
        title: 'Developer',
        github: 'testuser',
        twitter: 'testuser123',
        linkedin: '',
        company: 'Test Company',
        contributions: []
      };

      const result = addAdditionalUserInfo(ambassador);

      expect(result.twitterUrl).toBe('https://www.twitter.com/testuser123');
    });

    it('should not create twitterUrl when twitter field is empty string', () => {
      const ambassador: Ambassador = {
        name: 'Test User',
        img: '',
        bio: 'Test bio',
        title: 'Developer',
        github: 'testuser',
        twitter: '',
        linkedin: '',
        company: 'Test Company',
        contributions: []
      };

      const result = addAdditionalUserInfo(ambassador);

      expect(result.twitterUrl).toBeUndefined();
    });

    it('should not create twitterUrl when twitter field is undefined', () => {
      const ambassador: Ambassador = {
        name: 'Test User',
        img: '',
        bio: 'Test bio',
        title: 'Developer',
        github: 'testuser',
        twitter: undefined as any,
        linkedin: '',
        company: 'Test Company',
        contributions: []
      };

      const result = addAdditionalUserInfo(ambassador);

      expect(result.twitterUrl).toBeUndefined();
    });
  });

  describe('LinkedIn URL handling', () => {
    it('should create linkedinUrl when linkedin field exists', () => {
      const ambassador: Ambassador = {
        name: 'Test User',
        img: '',
        bio: 'Test bio',
        title: 'Developer',
        github: 'testuser',
        twitter: '',
        linkedin: 'testuser-profile',
        company: 'Test Company',
        contributions: []
      };

      const result = addAdditionalUserInfo(ambassador);

      expect(result.linkedinUrl).toBe('https://www.linkedin.com/in/testuser-profile');
    });

    it('should not create linkedinUrl when linkedin field is empty string', () => {
      const ambassador: Ambassador = {
        name: 'Test User',
        img: '',
        bio: 'Test bio',
        title: 'Developer',
        github: 'testuser',
        twitter: '',
        linkedin: '',
        company: 'Test Company',
        contributions: []
      };

      const result = addAdditionalUserInfo(ambassador);

      expect(result.linkedinUrl).toBeUndefined();
    });

    it('should not create linkedinUrl when linkedin field is undefined', () => {
      const ambassador: Ambassador = {
        name: 'Test User',
        img: '',
        bio: 'Test bio',
        title: 'Developer',
        github: 'testuser',
        twitter: '',
        linkedin: undefined as any,
        company: 'Test Company',
        contributions: []
      };

      const result = addAdditionalUserInfo(ambassador);

      expect(result.linkedinUrl).toBeUndefined();
    });
  });

  describe('Image URL handling', () => {
    it('should create img URL when githubUrl exists', () => {
      const ambassador: Ambassador = {
        name: 'Test User',
        img: '',
        bio: 'Test bio',
        title: 'Developer',
        github: 'testuser',
        twitter: '',
        linkedin: '',
        company: 'Test Company',
        contributions: []
      };

      const result = addAdditionalUserInfo(ambassador);

      expect(result.img).toBe('https://www.github.com/testuser.png');
    });

    it('should not overwrite img when github field is empty', () => {
      const ambassador: Ambassador = {
        name: 'Test User',
        img: '',
        bio: 'Test bio',
        title: 'Developer',
        github: '',
        twitter: '',
        linkedin: '',
        company: 'Test Company',
        contributions: []
      };

      const result = addAdditionalUserInfo(ambassador);

      expect(result.img).toBe('');
    });

    it('should not set img when githubUrl is undefined', () => {
      const ambassador: Ambassador = {
        name: 'Test User',
        img: 'fallback-image.png',
        bio: 'Test bio',
        title: 'Developer',
        github: undefined as any,
        twitter: '',
        linkedin: '',
        company: 'Test Company',
        contributions: []
      };

      const result = addAdditionalUserInfo(ambassador);

      expect(result.img).toBe('fallback-image.png');
    });
  });

  describe('Complete scenarios', () => {
    it('should handle ambassador with all social links', () => {
      const ambassador: Ambassador = {
        name: 'Full Profile User',
        img: '',
        bio: 'Test bio',
        title: 'Developer',
        github: 'fulluser',
        twitter: 'fulluser_tw',
        linkedin: 'fulluser-li',
        company: 'Test Company',
        contributions: []
      };

      const result = addAdditionalUserInfo(ambassador);

      expect(result.githubUrl).toBe('https://www.github.com/fulluser');
      expect(result.twitterUrl).toBe('https://www.twitter.com/fulluser_tw');
      expect(result.linkedinUrl).toBe('https://www.linkedin.com/in/fulluser-li');
      expect(result.img).toBe('https://www.github.com/fulluser.png');
    });

    it('should handle ambassador with minimal social links', () => {
      const ambassador: Ambassador = {
        name: 'Minimal User',
        img: '',
        bio: 'Test bio',
        title: 'Developer',
        github: 'minimaluser',
        twitter: '',
        linkedin: '',
        company: 'Test Company',
        contributions: []
      };

      const result = addAdditionalUserInfo(ambassador);

      expect(result.githubUrl).toBe('https://www.github.com/minimaluser');
      expect(result.twitterUrl).toBeUndefined();
      expect(result.linkedinUrl).toBeUndefined();
      expect(result.img).toBe('https://www.github.com/minimaluser.png');
    });

    it('should handle ambassador with no social links', () => {
      const ambassador: Ambassador = {
        name: 'No Social User',
        img: '',
        bio: 'Test bio',
        title: 'Developer',
        github: '',
        twitter: '',
        linkedin: '',
        company: 'Test Company',
        contributions: []
      };

      const result = addAdditionalUserInfo(ambassador);

      expect(result.githubUrl).toBeUndefined();
      expect(result.twitterUrl).toBeUndefined();
      expect(result.linkedinUrl).toBeUndefined();
      expect(result.img).toBe('');
    });
  });
});
