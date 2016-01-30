import fitVids from './fitvids';

// Basic FitVids Test
fitVids(".container");
// Custom selector and No-Double-Wrapping Prevention Test
fitVids(".container", {
  customSelector: "iframe[src^='http://socialcam.com']"
});
