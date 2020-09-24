module.exports = function resolveAbsoluteImport(importName) {
    const values = {
        Accordion: 'react-chayns-accordion/component/Accordion.js',
        AccordionIntro: 'react-chayns-accordion/component/AccordionIntro.js',
        AmountControl: 'react-chayns-amountcontrol/component/AmountControl.js',
        AnimationWrapper: 'react-chayns-animation_wrapper/component/AnimationWrapper.js',
        Badge: 'react-chayns-badge/component/Badge.js',
        Bubble: 'react-chayns-bubble/component/Bubble.js',
        Button: 'react-chayns-button/component/Button.js',
        ChooseButton: 'react-chayns-button/component/ChooseButton.js',
        Calendar: 'react-chayns-calendar/component/Calendar.js',
        Checkbox: 'react-chayns-checkbox/component/Checkbox.js',
        HueSlider: 'react-chayns-color_picker/component/hueSlider/HueSlider.js',
        TransparencySlider: 'react-chayns-color_picker/component/transparencySlider/TransparencySlider.js',
        ColorInput: 'react-chayns-color_picker/component/colorInput/ColorInput.js',
        ColorArea: 'react-chayns-color_picker/component/colorArea/ColorArea.js',
        ColorPicker: 'react-chayns-color_picker/component/ColorPicker.js',
        ColorScheme: 'react-chayns-color_scheme/component/ColorScheme.js',
        ComboBox: 'react-chayns-combobox/component/ComboBox.js',
        ContextMenu: 'react-chayns-contextmenu/component/ContextMenu.js',
        DateInfo: 'react-chayns-dateinfo/component/DateInfo.js',
        EmojiInput: 'react-chayns-emoji_input/component/EmojiInput.js',
        ExpandableContent: 'react-chayns-expandable_content/component/ExpandableContent.js',
        FilterButton: 'react-chayns-filterbutton/component/FilterButton.js',
        FormattedInput: 'react-chayns-formatted_input/component/FormattedInput.js',
        Formatter: 'react-chayns-formatted_input/utils/Formatter.js',
        Gallery: 'react-chayns-gallery/component/Gallery.js',
        GridCalendar: 'react-chayns-gridcalendar/component/GridCalendar.js',
        Icon: 'react-chayns-icon/component/Icon.js',
        Image: 'react-chayns-gallery/component/Image.js',
        ImageContainer: 'react-chayns-gallery/component/ImageContainer.js',
        ImageAccordion: 'react-chayns-image_accordion/component/ImageAccordion.js',
        ImageAccordionGroup: 'react-chayns-image_accordion/component/ImageAccordionGroup.js',
        Input: 'react-chayns-input/component/Input.js',
        IntegerFormatter: 'react-chayns-formatted_input/utils/IntegerFormatter.js',
        List: 'react-chayns-list/component/List.js',
        ListItem: 'react-chayns-list/component/ListItem.js',
        ModeSwitch: 'react-chayns-modeswitch/component/ModeSwitch.js',
        Mode: 'react-chayns-modeswitch/component/Mode.js',
        DecimalFormatter: 'react-chayns-formatted_input/utils/DecimalFormatter.js',
        OrientationHelper: 'utils/OrientationHelper.js',
        OpeningTimes: 'react-chayns-openingtimes/component/OpeningTimes.js',
        PersonFinder: 'react-chayns-personfinder/component/PersonFinder.js',
        SimpleWrapperContext: 'react-chayns-personfinder/component/data/simpleWrapper/SimpleWrapperContext.js',
        PositionInput: 'react-chayns-position_input/component/PositionInput.js',
        PriceFormatter: 'react-chayns-formatted_input/utils/PriceFormatter.js',
        ProgressBar: 'react-chayns-progress_bar/component/ProgressBar.js',
        RadioButton: 'react-chayns-radiobutton/component/RadioButton.js',
        ReceiverInput: 'react-chayns-receiverinput/component/ReceiverInput.js',
        RfidInput: 'react-chayns-rfid_input/component/RfidInput.js',
        ScrollView: 'react-chayns-scrollview/component/ScrollView.js',
        SearchBox: 'react-chayns-searchbox/component/SearchBox.js',
        ResultSelection: 'react-chayns-searchbox/component/result-selection/ResultSelection.js',
        SelectButton: 'react-chayns-selectbutton/component/SelectButton.js',
        SelectList: 'react-chayns-selectlist/component/SelectList.js',
        SelectListItem: 'react-chayns-selectlist/component/SelectItem.js',
        SetupWizard: 'react-chayns-setupwizard/component/SetupWizard.js',
        SetupWizardItem: 'react-chayns-setupwizard/component/SetupItem.js',
        withSetupWizardContext: 'react-chayns-setupwizard/component/withSetupWizardContext.js',
        SharingBar: 'react-chayns-sharingbar/component/SharingBar.js',
        SmallWaitCursor: 'react-chayns-smallwaitcursor/component/SmallWaitCursor.js',
        TagInput: 'react-chayns-tag_input/component/TagInput.js',
        TextArea: 'react-chayns-textarea/component/TextArea.js',
        TextString: 'react-chayns-textstring/component/TextString.js',
        Tooltip: 'react-chayns-tooltip/component/Tooltip.js',
        FileInput: 'react-chayns-file_input/component/FileInput.js',
        Slider: 'react-chayns-slider/component/Slider.js',
        SliderButton: 'react-chayns-sliderbutton/component/SliderButton.js',
        imageUpload: 'utils/imageUpload.js',
        createLinks: 'utils/createLinks.js',
        removeHtml: 'utils/removeHtml.js',
        equalize: 'utils/equalizer.js',
        isTobitEmployee: 'utils/tobitEmployee.js',
        FORMAT_INTEGER: 'react-chayns-formatted_input/utils/instances/formatInteger.js',
        FORMAT_DECIMAL: 'react-chayns-formatted_input/utils/instances/formatDecimal.js',
        FORMAT_PRICE: 'react-chayns-formatted_input/utils/instances/formatPrice.js',
    };

    if (!values[importName]) {
        // eslint-disable-next-line max-len
        throw new Error(`Unable to resolve ${importName} from chayns-components. Please check the spelling. If it's not wrong please create an issue (https://github.com/TobitSoftware/chayns-components/issues).`);
    }

    return `chayns-components/lib/${values[importName]}`;
};
