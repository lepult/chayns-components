import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Truncation } from '../src';

const BASE_HTML_TEXT =
    '<p id="isPasted">Der legendärste Abend: Homecoming at next! Studenten und Ausreißer, Urlauber und Daheimgebliebene, Partymäuse und Partymuffel – sie alle zieht es am Tag vor Heiligabend in die Heimat an einen zuvor ausgemachten Ort, um all die guten Freunde und alte Bekannte wiederzutreffen.</p><p>Was damals vor vielen Jahren auf der StattAlm auf dem Campus in Ahaus begann, führen wir bei uns im next fort!&nbsp;</p><p>Alle Infos und Tickets zum Event in Kürze.&nbsp;</p>';
export default {
    title: 'Truncation/Truncation',
    component: Truncation,
    args: {
        collapsedHeight: 100,
        children: BASE_HTML_TEXT,
    },
} as ComponentMeta<typeof Truncation>;

const Template: ComponentStory<typeof Truncation> = ({ children, ...args }) => (
    <Truncation {...args}>
        <div
            dangerouslySetInnerHTML={{
                __html: children,
            }}
        />
    </Truncation>
);

export const General = Template.bind({});

export const LargeText = Template.bind({});
LargeText.args = { children: BASE_HTML_TEXT.repeat(5) };
export const SmallText = Template.bind({});
SmallText.args = {
    children: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>',
};