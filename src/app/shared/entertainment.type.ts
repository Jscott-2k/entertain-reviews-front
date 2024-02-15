export type EntertainmentType = 'game' | 'movie' | 'tv' ;

export function isEntertainment(str: string): str is EntertainmentType {
    return ['game', 'movie', 'tv'].includes(str);
} 