const providerSearchLinks = {
  "JioHotstar": (title) => `https://www.jiohotstar.com/search?search_query=${encodeURIComponent(title)}`,
  "Amazon Prime Video": (title) => `https://www.primevideo.com/detail/0MMEPVB7HNQ8N3JDLM7IXX95XE/ref=${encodeURIComponent(title)}`,
  "Amazon Prime Video with Ads": (title) => `https://www.primevideo.com/detail/0MMEPVB7HNQ8N3JDLM7IXX95XE/ref=${encodeURIComponent(title)}`,
  "Amazon Video": (title) => `https://www.primevideo.com/detail/0MMEPVB7HNQ8N3JDLM7IXX95XE/ref=${encodeURIComponent(title)}`,
  "Netflix": (title) => `https://www.netflix.com/search?q=${encodeURIComponent(title)}`,
  "Sony LIV": (title) => `https://www.sonyliv.com/search/${encodeURIComponent(title)}`,
  "Zee5": (title) => `https://www.zee5.com/search?q=${encodeURIComponent(title)}`,
  "VI movies and tv": (title) => `https://www.myvi.in/consumer/search?${encodeURIComponent(title)}`,
  "Apple TV Store": (title) => `https://tv.apple.com/in/search?term=${encodeURIComponent(title)}`,
  "Google Play Movies": (title) => `https://play.google.com/store/search?q=${encodeURIComponent(title)}&c=movies`,
  "Crunchyroll": (title) => `https://www.crunchyroll.com/search?q=${encodeURIComponent(title)}`,  
  "Crunchyroll Amazon Channel": (title) => `https://www.amazon.com/s?k=${encodeURIComponent(title)}&i=instant-video`,
  "Anime Times Amazon Channel": (title) =>  `https://www.justwatch.com/in/tv-show/${encodeURIComponent(title)}`,
  "Animax Amazon Channel": (title) => `https://www.animax-asia.com/`,
  "Lionsgate Play": (title) => `https://lionsgateplay.com/en/search?q=${encodeURIComponent(title)}`,
  "Lionsgate Play Apple TV Channel": (title) => `https://tv.apple.com/in/search?term=${encodeURIComponent(title)}`,
  "Lionsgate Play Amazon Channel":(title) => `https://www.primevideo.com/search/ref=atv_nb_sug?ie=UTF8&phrase=${encodeURIComponent(title)}`,
  "MGM Plus Amazon Channel": (title)=> `https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Dinstant-video&field-keywords=${encodeURIComponent(title)}`,
  "Hungama Play": (title)=> `https://www.hungama.com/search/${encodeURIComponent(title)}`,

  "Mubi": (title) => `https://mubi.com/search/${encodeURIComponent(title)}`,
  "YouTube": (title) => `https://www.youtube.com/results?search_query=${encodeURIComponent(title)}`,
  "Aha": (title) => `https://www.aha.video/search?q=${encodeURIComponent(title)}`,
  "Sun NXT": (title) => `https://www.sunnxt.com/search?q=${encodeURIComponent(title)}`,
  
 };
export default providerSearchLinks;
