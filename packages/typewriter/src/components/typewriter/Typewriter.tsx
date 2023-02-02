import React, { FC, ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import { renderToString } from 'react-dom/server';
import {
    StyledTypewriter,
    StyledTypewriterPseudoText,
    StyledTypewriterText,
} from './Typewriter.styles';
import { getSubTextFromHTML } from './utils';

export type TypewriterProps = {
    /**
     * The text to type
     */
    children: ReactElement | string;
};

const Typewriter: FC<TypewriterProps> = ({ children }) => {
    const [shownCharCount, setShownCharCount] = useState(0);
    const [shouldStopAnimation, setShouldStopAnimation] = useState(false);

    const textContent = React.isValidElement(children) ? renderToString(children) : children;

    const isAnimatingText = shownCharCount !== textContent.length;

    const handleClick = useCallback(() => {
        setShouldStopAnimation(true);
    }, []);

    useEffect(() => {
        let interval: number | undefined;

        if (shouldStopAnimation) {
            setShownCharCount(textContent.length);
        } else {
            setShownCharCount(0);

            interval = window.setInterval(() => {
                setShownCharCount((prevState) => {
                    const nextState = prevState + 1;

                    if (nextState === textContent.length) {
                        window.clearInterval(interval);
                    }

                    return nextState;
                });
            }, 35);
        }

        return () => {
            window.clearInterval(interval);
        };
    }, [shouldStopAnimation, textContent.length]);

    const shownText = useMemo(
        () => getSubTextFromHTML(textContent, shownCharCount),
        [shownCharCount, textContent]
    );

    return (
        <StyledTypewriter onClick={handleClick}>
            <StyledTypewriterText
                dangerouslySetInnerHTML={{ __html: shownText }}
                isAnimatingText={isAnimatingText}
            />
            {isAnimatingText && <StyledTypewriterPseudoText>{children}</StyledTypewriterPseudoText>}
        </StyledTypewriter>
    );
};

Typewriter.displayName = 'Typewriter';

export default Typewriter;
