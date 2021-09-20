import clsx from 'clsx';
import React, { FC } from 'react';
import styled, { css } from 'styled-components';

type ButtonProps = {
    /**
     * The label of the button
     */
    children: JSX.Element;
    /**
     * Additional class names for the button element
     */
    className?: string;
    /**
     * An icon that is displayed on the left hand side of the button text
     */
    icon?: string;
    /**
     * Disables the button so that it cannot be clicked anymore
     */
    isDisabled?: boolean;
    /**
     * Displays the button in the secondary style
     */
    isSecondary?: boolean;
    /**
     * Function to be executed when the button is clicked
     */
    onClick: () => void;
    /**
     * Stops event propagation on click
     */
    shouldStopPropagation?: boolean;
};

const StyledButton = styled.button<ButtonProps>`
    background-color: ${(props) => props.theme['408']};
    border-radius: 3px;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
    border: none;
    color: white;
    cursor: pointer;
    display: inline-block;
    line-height: 1.15;
    min-height: 30px;
    padding: 7px 12px;
    user-select: none;

    ${(props) =>
        props.isSecondary &&
        css`
            background-color: ${(props) => props.theme['202']};
            box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
            color: ${(props) => props.theme['text']};
        `}
`;

const Button: FC<ButtonProps> = ({
    children,
    className,
    icon,
    isDisabled,
    isSecondary,
    onClick,
    shouldStopPropagation,
}) => {
    const handleClick = (event: React.MouseEvent) => {
        if (shouldStopPropagation) {
            event.stopPropagation();
        }

        onClick();
    };

    const buttonClasses = clsx('button ellipsis', className);

    return (
        <StyledButton
            className={buttonClasses}
            disabled={isDisabled}
            isSecondary={isSecondary}
            onClick={handleClick}
        >
            {children}
        </StyledButton>
    );
};

Button.displayName = 'Button';

export default Button;