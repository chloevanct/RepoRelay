import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
    components: {
        Button: {
            variants: {
                solid: {
                    fontSize: ['0.45rem', '0.5rem', '0.7rem', '0.9rem', '1.2rem'],
                    px: [1, 2, 3, 4, 5],
                }
            },
        },
        Text: {
            baseStyle: {
                fontSize: ['0.45rem', '0.5rem', '0.7rem', '0.9rem', '1.2rem']
            }
        },
    }
});

export default customTheme;
