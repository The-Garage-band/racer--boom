interface DocumentWithFullscreen extends HTMLDocument {
  fullScreenElement?: Element
  mozFullScreen?: Element
  webkitIsFullScreen?: Element
  msExitFullscreen?: () => void;
  mozCancelFullScreen?: () => void;
  webkitExitFullscreen?: () => void;
}

interface DocumentElementWithFullscreen extends HTMLElement {
  msRequestFullscreen?: () => void;
  mozRequestFullScreen?: () => void;
  webkitRequestFullscreen?: () => void;
}

export function isFullScreen(): boolean {
  const doc: DocumentWithFullscreen = document;
  return !!((doc.fullScreenElement && doc.fullScreenElement !== null)
      || doc.mozFullScreen
      || doc.webkitIsFullScreen);
}

export function requestFullScreen(element: DocumentElementWithFullscreen) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  }
}

export function exitFullScreen() {
  const doc: DocumentWithFullscreen = document;
  if (doc.exitFullscreen) {
    doc.exitFullscreen();
  } else if (doc.msExitFullscreen) {
    doc.msExitFullscreen();
  } else if (doc.mozCancelFullScreen) {
    doc.mozCancelFullScreen();
  } else if (doc.webkitExitFullscreen) {
    doc.webkitExitFullscreen();
  }
}

export function toggleFullScreen(): void {
  if (isFullScreen()) {
    exitFullScreen();
  } else {
    requestFullScreen(document.documentElement);
  }
}