import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

type StyledRadioButtonProps = WithTheme<{ $isDisabled: boolean }>;

export const StyledRadioButton = styled.span<StyledRadioButtonProps>`
    display: flex;
    flex-direction: column;

    user-select: none;
    width: fit-content;
    position: relative;
    cursor: ${({ $isDisabled }: StyledRadioButtonProps) =>
        $isDisabled ? 'default !important' : 'pointer'};
    opacity: ${({ $isDisabled }: StyledRadioButtonProps) => ($isDisabled ? 0.5 : 1)};
`;

export const StyledRadioButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    gap: 5px;
`;

type StyledRadioButtonCheckBoxProps = WithTheme<unknown>;

export const StyledRadioButtonCheckBox = styled.input<StyledRadioButtonCheckBoxProps>`
    opacity: 0;
    height: 15px;
    width: 15px;
`;

type StyledRadioButtonPseudoCheckBoxProps = WithTheme<{ $isChecked: boolean }>;

export const StyledRadioButtonPseudoCheckBox = styled.div<StyledRadioButtonPseudoCheckBoxProps>`
    background-color: ${({ theme, $isChecked }: StyledRadioButtonPseudoCheckBoxProps) =>
        $isChecked ? theme['secondary-408'] : theme['secondary-403']};
    opacity: 1;
    border: 1px solid
        rgba(${({ theme }: StyledRadioButtonPseudoCheckBoxProps) => theme['409-rgb']}, 0.5);
    width: 15px;
    height: 15px;
    position: absolute;
    border-radius: 100%;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer !important;
`;

type StyledRadioButtonCheckBoxMarkProps = WithTheme<{
    $isHovered: boolean;
    $isSelected: boolean;
}>;

export const StyledRadioButtonCheckBoxMark = styled.span<StyledRadioButtonCheckBoxMarkProps>`
    cursor: pointer;
    background-color: transparent;
    position: absolute;
    top: 1px;
    left: 3.925px;
    display: inline-block;
    transform: rotate(35deg);
    height: 9px;
    width: 5px;
    border-bottom: 2px solid white;
    border-right: 2px solid white;
    border-top: transparent;
    border-left: transparent;
    z-index: 2;

    ${({ $isHovered, $isSelected }) => {
        if ($isSelected) {
            return css`
                opacity: 1;
            `;
        }

        if ($isHovered) {
            return css`
                opacity: 0.5;
            `;
        }

        return css`
            opacity: 0;
        `;
    }}
`;

type StyledRadioButtonLabelProps = WithTheme<unknown>;

export const StyledRadioButtonLabel = styled.p<StyledRadioButtonLabelProps>`
    color: ${({ theme }: StyledRadioButtonLabelProps) => theme.text};
`;

export const StyledMotionRadioButtonChildren = styled(motion.div)`
    margin-left: 18px;
`;
