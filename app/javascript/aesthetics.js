/** 
 * COLOR PALETTE - red tones
 * 1. whitesmoke
 * 2. burgundy - #660033, #cc0044, #990033
 * 3. pink - #cc00cc
 * 4. violet/gray - #666699
 * 5. salmon - #ff9999
 */

/**
 * THEMES
 * nocturne - default
 * con fuoco - burgundy/dark red 
 * flambe - salmon/orange/pink
 * adagio - light blue/chill
 * mezzo forte - black/space gray
 * ad Parnassum - white/quartz
 */

const COLORS = {
  white: 'whitesmoke',
  skyBlue: '#008eff',
  burgundy: '#660033',
  lightBurgundy: '#993366',
  crimson: '#990033',
  midLightBurgundy: '#800040',
  darkPurple: '#14141f',
  lightPurple: '#3d3d5c',
  midDarkPurple: '#1f1f2e',
  midLightPurple: '#33334d',
  violetGray: '#666699',
}

export const THEME = {
  'nocturne': {
    color1: COLORS.darkPurple,
    color2: COLORS.lightPurple,
    color3: COLORS.midDarkPurple,
    color4: COLORS.midLightPurple,
    button: COLORS.skyBlue,
    text: COLORS.white
  },
  'con fuoco': {
    color1: COLORS.burgundy,
    color2: COLORS.crimson,
    color3: COLORS.midLightBurgundy,
    color4: COLORS.lightBurgundy,
    button: null,
    text: null,
  }
}