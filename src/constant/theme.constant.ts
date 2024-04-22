export const THEME_ENUM = {
    DIR_RTL: 'rtl',
    DIR_LTR: 'ltr',
    MODE_LIGHT: 'light',
    MODE_DARK: 'dark',
    LAYOUT_TYPE_CLASSIC: 'classic',
    LAYOUT_TYPE_MODERN: 'modern',
    LAYOUT_TYPE_SIMPLE: 'simple',
    LAYOUT_TYPE_STACKED_SIDE: 'stackedSide',
    LAYOUT_TYPE_DECKED: 'decked',
    LAYOUT_TYPE_BLANK: 'blank',
    SIDE_NAV_WIDTH: 290,
    SIDE_NAV_COLLAPSED_WIDTH: 80,
    SPLITTED_SIDE_NAV_MINI_WIDTH: 80,
    SPLITTED_SIDE_NAV_SECONDARY_WIDTH: 250,
    LOGO_X_GUTTER : 'px-6',
    HEADER_HEIGHT_CLASS : 'h-16',
    PAGE_CONTAINER_GUTTER_X : 'px-4 sm:px-6 md:px-8',
    PAGE_CONTAINER_GUTTER_Y : 'py-4 sm:py-6 md:px-8',
    NAV_MODE_LIGHT:'light',
    NAV_MODE_DARK:'dark',
    NAV_MODE_THEMED:'themed',
    NAV_MODE_TRANSPARENT:'transparent',
    SIDE_NAV_CONTENT_GUTTER: 'px-4'
} as const

export enum THEME_COLOR  {
    SLATE = 'slate',
    GRAY = 'gray', 
    NAVY = 'navy', 
    RED  = 'red', 
    ORANGE  ='orange',
    AMBER = 'amber', 
    YELLOW = 'yellow',
    LIME ='lime',
    GREEN  ='green',
    TEAL ='teal',
    CYAN = 'cyan',
    BLUE ='blue', 
    INDIGO ='indigo', 
    PURPLE  ='purple ',
    PINK  ='pink',
    BRAND = 'brand'
}

export enum SIZES {
    XS = 'xs',
    SM = 'sm',
    MD = 'md',
    LG = 'lg',
}

export const CONTROL_SIZES = {
    [SIZES.XS]: 7,
    [SIZES.SM]: 9,
    [SIZES.MD]: 11,
    [SIZES.LG]: 14,
}

export const LAYOUT = {
    HORIZONTAL: 'horizontal',
    VERTICAL: 'vertical',
    INLINE: 'inline',
}

export const DIRECTIONS = {
    TOP: 'top',
    RIGHT: 'right',
    BOTTOM: 'bottom',
    LEFT: 'left',
}

export const SELECTION_MODES = {
    YEAR: 'year',
    MONTH: 'month',
    DAY: 'day',
}

export const PICKER_VIEWS = {
    YEAR: 'year',
    MONTH: 'month',
    DATE: 'date',
}

export const STATUS = {
    DANGER: 'danger',
    SUCCESS: 'success',
    WARNING: 'warning',
}

export const STEPS_STATUS = {
    COMPLETE: 'complete',
    PENDING: 'pending',
    IN_PROGRESS: 'in-progress',
    ERROR: 'error',
}

export const PLACEMENT = {
    TOP_START: 'top-start',
    TOP_CENTER: 'top-center',
    TOP_END: 'top-end',
    BOTTOM_START: 'bottom-start',
    BOTTOM_CENTER: 'bottom-center',
    BOTTOM_END: 'bottom-end',
    MIDDLE_START_TOP: 'middle-start-top',
    MIDDLE_START_BOTTOM: 'middle-start-bottom',
    MIDDLE_END_TOP: 'middle-end-top',
    MIDDLE_END_BOTTOM: 'middle-end-bottom',
}

export const DROPDOWN_ITEM_TYPE: Record<
    string,
    'default' | 'header' | 'divider' | 'custom'
> = {
    DEFAULT: 'default',
    HEADER: 'header',
    DIVIDER: 'divider',
    CUSTOM: 'custom',
}

export const DAY_DURATION = 86400000
