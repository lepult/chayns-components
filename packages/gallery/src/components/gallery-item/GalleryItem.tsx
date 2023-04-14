import { Icon } from '@chayns-components/core';
import React, { FC, useCallback } from 'react';
import type { UploadedFile } from '../../types/files';
import {
    StyledGalleryItem,
    StyledGalleryItemDeleteButton,
    StyledGalleryItemImage,
    StyledGalleryItemMoreItemsIndicator,
    StyledGalleryItemPlayIcon,
    StyledGalleryItemVideo,
    StyledGalleryItemVideoWrapper,
} from './GalleryItem.styles';

export type GalleryItemProps = {
    /**
     *  Images and videos which should be displayed
     */
    uploadedFile: UploadedFile;
    /**
     *  Whether images and videos can be edited
     */
    isEditMode: boolean;
    ratio: number;
    handleDeleteFile: (key: number | string) => void;
    remainingItemsLength?: number;
};

const GalleryItem: FC<GalleryItemProps> = ({
    uploadedFile,
    handleDeleteFile,
    isEditMode,
    ratio,
    remainingItemsLength,
}) => {
    const fileKey = 'thumbnailUrl' in uploadedFile ? uploadedFile.id : uploadedFile.key;

    /**
     * This function opens a selected file
     */
    const openSelectedFile = useCallback((file: UploadedFile) => {
        if ('thumbnailUrl' in file) {
            // @ts-expect-error: Type is correct here
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
            void chayns.openVideo(file.url);

            return;
        }

        // @ts-expect-error: Type is correct here
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        void chayns.openImage([`${file.base}/${file.key}`], 0);
    }, []);

    return (
        <StyledGalleryItem>
            {isEditMode && (
                <StyledGalleryItemDeleteButton onClick={() => handleDeleteFile(fileKey)}>
                    <Icon size={20} icons={['ts-wrong']} />
                </StyledGalleryItemDeleteButton>
            )}
            {'thumbnailUrl' in uploadedFile ? (
                <StyledGalleryItemVideoWrapper onClick={() => openSelectedFile(uploadedFile)}>
                    <StyledGalleryItemPlayIcon>
                        <Icon size={30} icons={['fa fa-play']} />
                    </StyledGalleryItemPlayIcon>
                    <StyledGalleryItemVideo ratio={ratio}>
                        <source src={uploadedFile.url} type="video/mp4" />
                    </StyledGalleryItemVideo>
                </StyledGalleryItemVideoWrapper>
            ) : (
                <StyledGalleryItemImage
                    ratio={ratio}
                    onClick={() => openSelectedFile(uploadedFile)}
                    draggable={false}
                    src={`${uploadedFile.base}/${uploadedFile.key}`}
                />
            )}
            {remainingItemsLength && (
                <StyledGalleryItemMoreItemsIndicator>
                    <p>{`+ ${remainingItemsLength - 3}`}</p>
                </StyledGalleryItemMoreItemsIndicator>
            )}
        </StyledGalleryItem>
    );
};

GalleryItem.displayName = 'GalleryItem';

export default GalleryItem;
