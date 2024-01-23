import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import Button from '../button/Button';
import {
    StyledSignature,
    StyledSignatureDeleteIconWrapper,
    StyledSignatureImage,
    StyledSignatureImageWrapper,
} from './Signature.styles';
import { putUserSignature } from '../../api/signature/put';
import { deleteUserSignature } from '../../api/signature/delete';
import { getUserSignature } from '../../api/signature/get';
import Icon from '../icon/Icon';

export interface SignatureRef {
    edit: VoidFunction;
    delete: VoidFunction;
}

export type SignatureProps = {
    /**
     * The text that should be displayed inside the button.
     */
    buttonText: string;
    /**
     * Whether the button is disabled.
     */
    isDisabled?: boolean;
    /**
     * Function to be executed when the signature is edited.
     */
    onEdit?: (signature: string) => void;
    /**
     * Function to be executed when the user deletes the signature.
     */
    onRemove?: () => void;
    /**
     * Function to be executed when the user subscribes.
     */
    onSubscribe?: () => void;
    /**
     * Function to be executed when the user unsubscribes.
     */
    onUnsubscribe?: () => void;
};

const Signature = forwardRef<SignatureRef, SignatureProps>(
    ({ onEdit, onRemove, onUnsubscribe, onSubscribe, buttonText, isDisabled }, ref) => {
        const [signatureUrl, setSignatureUrl] = useState<string | undefined>(undefined);
        const [hasSubscribed, setHasSubscribed] = useState(false);

        useEffect(() => {
            const loadUserSignature = async () => {
                await getUserSignature().then((signature) => {
                    setSignatureUrl(signature);
                });
            };

            void loadUserSignature();
        }, []);

        const handleCallDialog = useCallback(
            async (shouldSubscribe: boolean) => {
                // ToDo replace with new dialog if ready
                await chayns.dialog
                    .signature({
                        buttons: [
                            {
                                text: 'Speichern',
                                buttonType: 1,
                            },
                            {
                                text: 'Abbrechen',
                                buttonType: 0,
                            },
                        ],
                    })
                    .then(async (result) => {
                        if (result.buttonType === 1 && result.value) {
                            await putUserSignature(result.value).then((success) => {
                                if (success) {
                                    setSignatureUrl(result.value);

                                    if (shouldSubscribe) {
                                        setHasSubscribed(true);

                                        if (typeof onSubscribe === 'function') {
                                            onSubscribe();
                                        }
                                    } else if (typeof onEdit === 'function') {
                                        onEdit(result.value);
                                    }
                                }
                            });
                        }
                    });
            },
            [onEdit, onSubscribe]
        );

        const handleEdit = useCallback(() => {
            void handleCallDialog(false);
        }, [handleCallDialog]);

        const handleDelete = useCallback(async () => {
            await deleteUserSignature().then((success) => {
                if (success) {
                    setSignatureUrl(undefined);

                    if (typeof onRemove === 'function') {
                        onRemove();
                    }
                }
            });
        }, [onRemove]);

        const handleClick = useCallback(() => {
            if (signatureUrl) {
                setHasSubscribed(true);

                if (typeof onSubscribe === 'function') {
                    onSubscribe();
                }
            } else {
                void handleCallDialog(true);
            }
        }, [handleCallDialog, onSubscribe, signatureUrl]);

        const handleUnSubscribe = () => {
            setHasSubscribed(false);
            setSignatureUrl(undefined);

            if (typeof onUnsubscribe === 'function') {
                onUnsubscribe();
            }
        };

        useImperativeHandle(
            ref,
            () => ({
                edit: handleEdit,
                delete: handleDelete,
            }),
            [handleDelete, handleEdit]
        );

        return (
            <StyledSignature>
                {!hasSubscribed ? (
                    <Button isDisabled={isDisabled} onClick={handleClick}>
                        {buttonText}
                    </Button>
                ) : (
                    <StyledSignatureImageWrapper>
                        <StyledSignatureImage src={signatureUrl} />
                        <StyledSignatureDeleteIconWrapper>
                            <Icon icons={['ts-wrong']} size={20} onClick={handleUnSubscribe} />
                        </StyledSignatureDeleteIconWrapper>
                    </StyledSignatureImageWrapper>
                )}
            </StyledSignature>
        );
    }
);

Signature.displayName = 'Signature';

export default Signature;