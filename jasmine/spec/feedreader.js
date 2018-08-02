/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    describe('RSS Feeds', () => {
        /* This tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */

        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('URLs are defined', () => {
           for(let feed of allFeeds) {
            expect(feed.url).toBeDefined();
            expect(feed.url.length).not.toBe(0);
          }
         });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

         it('has a name for each feed', () => {
           for(let feed of allFeeds) {
             expect(feed.name).toBeDefined();
             expect(feed.name.length).not.toBe(0);
           }
         });
    });

    describe('The menu', () => {

      /* This test ensures the menu element is
       * hidden by default.
       */

       it('is hidden by default', () => {
         expect($('body').hasClass('menu-hidden')).toBe(true);
       });

       /* This test ensures the menu changes
        * visibility when the menu icon is clicked
        */

        it('changes visibility when clicked', () => {
          $('.menu-icon-link').click();
          expect($('body').hasClass('menu-hidden')).toBe(false);
          $('.menu-icon-link').click();
          expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    describe('Initial Entries', () => {
      /* This test  ensures when the loadFeed
       * function is called and completes its work, there is at least
       * a single .entry element within the .feed container.
       */

       beforeEach(done => loadFeed(0, done));
       it('has at least a single entry element in feed container', () => {
         expect($('.feed .entry').length > 0).toBe(true);
       });
    });

    describe('New Feed Selection', () => {
      /* This test ensures that when a new feed is loaded
       * by the loadFeed function that the content actually changes.
       */
       let feed = document.querySelector('.feed');
       let feed1 = [];
       let feed2 = [];
       beforeEach((done) => {
         loadFeed(0);
         Array.from(feed.children).forEach((entry) => {
           feed1.push(entry.innerText);
         });
         loadFeed(1,done);
       });
       it('actually changes as new content is loaded', () => {
         Array.from(feed.children).forEach((entry) => {
           feed2.push(entry.innerText);
         });
         expect(feed1===feed2).toBe(false);
       });
    });
}());
