import clsx from 'clsx';
import React, { FC, MouseEventHandler } from 'react';
import styled, { css } from 'styled-components';
import type { Omit } from 'framer-motion/types/types';

type IconProps = {
    /**
     * Additional class names for the root element
     */
    className?: string;
    /**
     * The FontAwesome or tobit icons to render. Multiple icons are stacked.
     * But that' s only possible with FontAwesome icons.
     */
    icons: string[];
    /**
     * Disables the icon so that it cannot be clicked anymore
     */
    isDisabled?: boolean;
    /**
     * Function to be executed when the icon is clicked
     */
    onClick?: MouseEventHandler<HTMLSpanElement>;
    /**
     * Size of the icon in pixel
     */
    size?: number;
    /**
     * Stops event propagation on click
     */
    shouldStopPropagation?: boolean;
};

type StyledIconWrapperProps = Omit<IconProps, 'icons'>;

type StyledIconProps = Omit<IconProps, 'icons'> & {
    fontSize: number;
    isStacked?: boolean;
};

const StyledIconWrapper = styled.span<StyledIconWrapperProps>`
    cursor: ${({ isDisabled, onClick }) =>
        typeof onClick === 'function' && !isDisabled ? 'pointer' : 'default'};
    display: inline-flex;
    height: ${({ size }) => `${size}px`};
    opacity: ${({ isDisabled }) => (isDisabled ? 0.5 : 1)};
    transition: opacity 0.3s ease;
    width: ${({ size }) => `${size}px`};
`;

const StyledIcon = styled.i<StyledIconProps>`
    color: ${({ theme }) => theme['headline']};
    display: ${({ isStacked }) => (isStacked ? undefined : 'inline-flex')};
    font-size: ${({ fontSize }) => `${fontSize}px`};

    ${({ fontSize, size }) =>
        fontSize !== size &&
        css`
            top: 50%;
            transform: translateY(-50%);
        `}
`;

const Icon: FC<IconProps> = ({
    className,
    icons,
    isDisabled,
    onClick,
    size = 15,
    shouldStopPropagation,
}) => {
    const handleClick: MouseEventHandler<HTMLElement | HTMLSpanElement> = (event) => {
        if (shouldStopPropagation) {
            event.stopPropagation();
        }

        if (typeof onClick === 'function') {
            onClick(event);
        }
    };

    let maxStackSizeFactor = 1;

    icons.forEach((icon) => {
        const stackSizeFactor = getStackSizeFactor(icon);

        if (stackSizeFactor && stackSizeFactor > maxStackSizeFactor) {
            maxStackSizeFactor = stackSizeFactor;
        }
    });

    const shouldUseStackedIcon = icons.length > 1;

    const wrapperClasses = clsx(
        'beta-chayns-icon',
        shouldUseStackedIcon ? 'fa-stack' : '',
        className
    );

    return (
        <StyledIconWrapper
            className={wrapperClasses}
            isDisabled={isDisabled}
            onClick={handleClick}
            size={size}
        >
            {icons.map((icon) => {
                const iconClasses = clsx(
                    icon,
                    shouldUseStackedIcon && !/fa-stack-[\d]x/.test(icon) ? 'fa-stack-1x' : '',
                    className
                );

                const stackSizeFactor = getStackSizeFactor(icon);

                return (
                    <StyledIcon
                        className={iconClasses}
                        fontSize={((stackSizeFactor || 1) / maxStackSizeFactor) * size}
                        isStacked={shouldUseStackedIcon}
                        key={icon}
                        size={size}
                    />
                );
            })}
        </StyledIconWrapper>
    );
};

Icon.displayName = 'Icon';

export default Icon;

const getStackSizeFactor = (icon: string) => {
    const sizeFactorString = icon.match(/fa-stack-([\d])x/)?.[1];

    return typeof sizeFactorString === 'string' ? parseInt(sizeFactorString, 10) : undefined;
};
