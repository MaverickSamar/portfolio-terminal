import Themes from '../../themes.json';

export const theme = async(args:string[],
    callback: (value: string) => string): Promise<string> => {

        if(args.length === 0)
        {
            return `Usage: theme[arg]
            Args:
                -ls: list all themes
                -set: set a theme
                -random: set a random theme
            
            Example:
                theme ls # to list all themes
                theme set AlienBlood # to set a theme`;
        }

        switch(args[0])
        {
            case 'ls':
                let result = Themes.map((theme) =>
                    theme.name.toLowerCase()).join(', ');
                return result;

            case 'set':
                const selectedTheme = args[1];
                console.log(selectedTheme);

                return "Will be fixed by today evening, visit again";

            case 'random':
                const randomTheme = Themes[Math.floor(Math.random()* Themes.length)];

                return callback(randomTheme.name.toLowerCase());
        }
        return '';
    };