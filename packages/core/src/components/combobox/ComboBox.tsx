import React, { FC, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Icon from '../icon/Icon';
import ComboBoxItem from './combobox-item/ComboBoxItem';
import {
    StyledComboBox,
    StyledComboBoxHeader,
    StyledComboBoxIconWrapper,
    StyledComboBoxPlaceholder,
    StyledMotionComboBoxBody,
} from './ComboBox.styles';
import { calculateContentWidth } from './utils';

export interface IComboBoxItem {
    text: string;
    value: string | number;
}

export type ComboBoxProps = {
    /**
     * The list of the items that should be displayed.
     */
    list: IComboBoxItem[];
    /**
     * Function that should be executed when an item is selected.
     */
    onSelect?: (comboboxItem: IComboBoxItem) => void;
    /**
     * A text that should be displayed when no item is selected.
     */
    placeholder: string;
    /**
     * An item that should be preselected.
     */
    selectedItem?: IComboBoxItem;
};

const ComboBox: FC<ComboBoxProps> = ({ placeholder, list, onSelect, selectedItem }) => {
    const [item, setItem] = useState<IComboBoxItem>();
    const [isAnimation, setIsAnimation] = useState(false);
    const [minWidth, setMinWidth] = useState(0);

    const ref = useRef<HTMLDivElement>(null);

    const handleClick = useCallback(
        (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsAnimation(false);
            }
        },
        [ref]
    );

    useEffect(() => {
        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [handleClick, ref]);

    /**
     * This function sets the selected item
     */
    const handleSetSelectedItem = useCallback(
        (itemToSelect: IComboBoxItem) => {
            setItem(itemToSelect);
            setIsAnimation(false);

            if (onSelect) {
                onSelect(itemToSelect);
            }
        },
        [onSelect]
    );

    /**
     * This function calculates the greatest width
     */
    useEffect(() => {
        const textArray = list.map(({ text }) => text);

        textArray.push(placeholder);

        setMinWidth(calculateContentWidth(textArray) + 45);
    }, [list, placeholder]);

    /**
     * This function sets the external selected item
     */
    useEffect(() => {
        if (selectedItem) {
            handleSetSelectedItem(selectedItem);
        }
    }, [handleSetSelectedItem, selectedItem]);

    /**
     * Function that renders the combobox items
     */
    const content = useMemo(() => {
        const items: ReactNode[] = [];

        list.forEach(({ text, value }) => {
            items.push(
                <ComboBoxItem
                    key={value}
                    value={value}
                    text={text}
                    onSelect={handleSetSelectedItem}
                />
            );
        });

        return items;
    }, [handleSetSelectedItem, list]);

    /**
     * This function opens the content of the combobox
     */
    const handleHeaderClick = () => {
        setIsAnimation((prevState) => !prevState);
    };

    return useMemo(
        () => (
            <StyledComboBox ref={ref}>
                <StyledComboBoxHeader
                    minWidth={minWidth}
                    onClick={handleHeaderClick}
                    isOpen={isAnimation}
                >
                    <StyledComboBoxPlaceholder>
                        {item?.text ?? placeholder}
                    </StyledComboBoxPlaceholder>
                    <StyledComboBoxIconWrapper>
                        <Icon icons={['fa fa-chevron-down']} />
                    </StyledComboBoxIconWrapper>
                </StyledComboBoxHeader>
                <StyledMotionComboBoxBody
                    initial={{ height: 0, opacity: 0 }}
                    animate={
                        isAnimation
                            ? { height: 'fit-content', opacity: 1 }
                            : { height: 0, opacity: 0 }
                    }
                    transition={{
                        duration: 0.2,
                    }}
                >
                    {content}
                </StyledMotionComboBoxBody>
            </StyledComboBox>
        ),
        [content, isAnimation, item?.text, minWidth, placeholder]
    );
};

ComboBox.displayName = 'ComboBox';

export default ComboBox;
