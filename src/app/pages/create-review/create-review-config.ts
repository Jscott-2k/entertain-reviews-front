

// Interface for a slider mapping
export interface SliderMapping {
    [key: string]: string;
}

// Separate arrays for scores and weights
export const scoreControlNames: string[] = [
    'GraphicsSlider', 'GameplaySlider', 'StorySlider', 'MusicSlider', 'SFXSlider', 'UIUXSlider'
];

export const weightControlNames: string[] = [
    'GraphicsImportanceSlider', 'GameplayImportanceSlider', 'StoryImportanceSlider',
    'MusicImportanceSlider', 'SFXImportanceSlider', 'UIUXImportanceSlider'
];

// Create a mapping for scores
export const scoreLabelMapping: SliderMapping = {
    'GraphicsSlider': 'Graphics Score',
    'GameplaySlider': 'Gameplay Score',
    'StorySlider': 'Story Score',
    'MusicSlider': 'Music Score',
    'SFXSlider': 'SFX Score',
    'UIUXSlider': 'UI/UX Score',
};

// Create a mapping for weights
export const weightLabelMapping: SliderMapping = {
    'GraphicsImportanceSlider': 'Graphics Importance (weight)',
    'GameplayImportanceSlider': 'Gameplay Importance (weight)',
    'StoryImportanceSlider': 'Story Importance (weight)',
    'MusicImportanceSlider': 'Music Importance (weight)',
    'SFXImportanceSlider': 'SFX Importance (weight)',
    'UIUXImportanceSlider': 'UI/UX Importance (weight)',
};