import {
    BB_LC_MENTION_ID_REGEX,
    BB_LC_MENTION_REGEX,
    HTML_LC_MENTION_REGEX,
} from '../constants/regex';

const replaceWithLcMentionHTML = (lcMention: string, text: string) => {
    let attributes = '';

    const idMatches = lcMention.match(BB_LC_MENTION_ID_REGEX);

    const match = idMatches?.[1];

    if (match) {
        attributes += `id="${match}"`;
    }

    return `<lc_mention contenteditable="false" ${attributes}>${text}</lc_mention>`;
};

export const convertBBCodesToHTML = (text: string) => {
    let result = text;

    result = result.replace(BB_LC_MENTION_REGEX, replaceWithLcMentionHTML);

    return result;
};

export const convertHTMLToBBCodes = (text: string) => {
    let result = text;

    result = result.replace(HTML_LC_MENTION_REGEX, '[lc_mention id="$1"]$2[/lc_mention]');

    return result;
};

export const convertQuotes = (text: string) => {
    const regexForQuotes =
        /(?<=[\s<>]|^)("(?=\w)|(?<=\w)")(?=[\s<>]|$)|(?<=[^\w\s\u{1F000}-\u{1F9FF}])(?![^<]*>)("(?![^<]*>[^<]*<\/lc_mention>)(?=\w)|(?<=[^\w\s\u{1F000}-\u{1F9FF}])(?![^<]*>)("(?![^<]*>[^<]*<\/lc_mention>)(?=\^)|(?<=[^\w\s\u{1F000}-\u{1F9FF}])(?![^<]*>)("(?![^<]*>[^<]*<\/lc_mention>)(?<=[^\w\s\u{1F000}-\u{1F9FF}]))))/gu;

    const regexForQuoteStart = /„(\s|$)/g;

    const formattedQuotes = text.replace(regexForQuotes, (match) => {
        if (match.startsWith(' ') || text.startsWith(match)) {
            return match.startsWith(' ')
                ? ` ${String.fromCharCode(8222)}`
                : String.fromCharCode(8222);
        }
        return String.fromCharCode(8220);
    });

    return formattedQuotes.replace(regexForQuoteStart, '"');
};
