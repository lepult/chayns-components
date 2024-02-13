import type { WithTheme } from '@chayns-components/core';
import styled from 'styled-components';
import { CodeHighlighterTheme } from '../../../types/codeHighlighter';

export const StyledCopyToClipboard = styled.div`
    display: flex;
    align-items: center;
`;

type StyledCopyToClipboardTextProps = WithTheme<{
    codeTheme: CodeHighlighterTheme;
}>;
export const StyledCopyToClipboardText = styled.span<StyledCopyToClipboardTextProps>`
    color: ${({ codeTheme }) => (codeTheme === CodeHighlighterTheme.Dark ? '#e5e5e5' : '#999999')};
    font-size: small;
    margin-left: 4px;
`;