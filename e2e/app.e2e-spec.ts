import { CampusAppPage } from './app.po';

describe('campus-app App', () => {
  let page: CampusAppPage;

  beforeEach(() => {
    page = new CampusAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
