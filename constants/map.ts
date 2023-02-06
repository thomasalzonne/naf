export const COLOR_BLUE = '#0000ff'
export const COLOR_PINK = '#F17BB0'

export const CLUSTER_ICON = (color) => {
  return window.btoa(`
        <svg fill="${color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
          <circle cx="120" cy="120" opacity=".6" r="70" />
          <circle cx="120" cy="120" opacity=".3" r="90" />
          <circle cx="120" cy="120" opacity=".2" r="110" />
          <circle cx="120" cy="120" opacity=".1" r="130" />
        </svg>`)
}
