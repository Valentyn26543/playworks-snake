export class ExternalNavigationService {
  open(url) {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
