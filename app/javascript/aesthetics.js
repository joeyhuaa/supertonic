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
  burgundy: '#660033',
  pink: '#cc00cc',
  violetGray: '#666699',
  salmon: '#ff9999',
  crimson: '#990033',
  darkPurple: '#14141f',
  lightPurple: '#3d3d5c',
  midDarkPurple: '#1f1f2e',
  midLightPurple: '#33334d',
  skyBlue: '#008eff',
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
    color1: COLORS.crimson,
    color2: COLORS.burgundy,
    color3: COLORS.salmon,
    color4: COLORS.pink,
    button: null,
    text: null,
  },
  'ad Parnassum': {

  },
  'mezzo forte': {
    
  }
}