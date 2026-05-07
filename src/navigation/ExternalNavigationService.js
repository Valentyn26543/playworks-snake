import { githubReadmeUrl } from '../app/AppConfig.js';

export class ExternalNavigationService {
  goToReadme() {
    window.location.href = githubReadmeUrl;
  }
}
