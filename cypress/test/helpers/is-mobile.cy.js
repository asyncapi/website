import { isMobileDevice } from '../../../components/helpers/is-mobile';

// some user agents for testing
const androidUA = 'Mozilla/5.0 (Linux; Android 10; SM-A205U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.210 Mobile Safari/537.36';
const iphoneUA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_4_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1';
const kindleUA = 'Mozilla/5.0 (Linux; U; Android 4.0.3; en-us; KFTT Build/IML74K) AppleWebKit/535.19 (KHTML, like Gecko) Silk/3.4 Mobile Safari/535.19 Silk-Accelerated=true';
const ipadUA = 'Mozilla/5.0 (iPad; CPU OS 14_4_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1';
const desktopUA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36';

// Define a helper function to mock the navigator object
function mockNavigator(userAgent) {
    Object.defineProperty(window, 'navigator', {
        value: { userAgent },
        writable: true,
    });
}

describe('isMobileDevice function', () => {
    // Test for android user agent
    it('should return true for android user agent', () => {
        // Mock the navigator with android user agent
        mockNavigator(androidUA);
        expect(isMobileDevice()).to.be.true;
    });

    // Test for iphone user agent
    it('should return true for iphone user agent', () => {
        // Mock the navigator with iphone user agent
        mockNavigator(iphoneUA);
        expect(isMobileDevice()).to.be.true;
    });

    // Test for kindle user agent
    it('should return true for kindle user agent', () => {
        // Mock the navigator with kindle user agent
        mockNavigator(kindleUA);
        expect(isMobileDevice()).to.be.true;
    });

    // Test for ipad user agent
    it('should return true for ipad user agent', () => {
        // Mock the navigator with ipad user agent
        mockNavigator(ipadUA);
        expect(isMobileDevice()).to.be.true;
    });

    // Test for desktop user agent
    it('should return false for desktop user agent', () => {
        // Mock the navigator with desktop user agent
        mockNavigator(desktopUA);
        expect(isMobileDevice()).to.be.true;
    });
});