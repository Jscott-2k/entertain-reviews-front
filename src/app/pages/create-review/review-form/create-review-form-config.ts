export namespace CreateReviewFormConfig {
    // Interface for a slider mapping
    export interface SliderMapping {
        [key: string]: string;
    }

    // Separate arrays for scores and weights
    export const scoreControlNames: string[] = [
        'GraphicsSlider',
        'GameplaySlider',
        'StorySlider',
        'MusicSlider',
        'SFXSlider',
        'UIUXSlider'
    ];

    export const weightControlNames: string[] = [
        'GraphicsImportanceSlider',
        'GameplayImportanceSlider',
        'StoryImportanceSlider',
        'MusicImportanceSlider',
        'SFXImportanceSlider',
        'UIUXImportanceSlider'
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
    // Create a mapping for scores
    export const scoreAspectMapping: SliderMapping = {
        'GraphicsSlider': 'Graphics',
        'GameplaySlider': 'Gameplay',
        'StorySlider': 'Story',
        'MusicSlider': 'Music',
        'SFXSlider': 'SFX',
        'UIUXSlider': 'UI/UX',
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

    // Function to create score-to-weight mapping
    function createScoreToWeightMapping(): SliderMapping {
        const map: SliderMapping = {};
        if (scoreControlNames.length !== weightControlNames.length) {
            console.error('Score and weight control names arrays should have the same length.');
        } else {
            for (let i = 0; i < scoreControlNames.length; i++) {
                const scoreControlName = scoreControlNames[i];
                const weightControlName = weightControlNames[i];
                map[scoreControlName] = weightControlName;
            }
        }
        return map;
    }

    // Exported constants
    export const scoreToWeightMapping: SliderMapping = createScoreToWeightMapping();
    export const writtenReviewWordCountRequired = 100;
    export const proConCharacterLimit = 255;
}